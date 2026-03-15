import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, RotateCcw, Send, Wifi, WifiOff, Server, Database, 
  MessageSquare, Users, Clock, CheckCircle2, XCircle, Loader2, 
  X, HelpCircle, Info, ArrowRight, Lightbulb, Zap, BookOpen, 
  Code, Activity, Terminal, Layers, Share2, Globe, Shield, 
  Maximize2, ChevronRight, Check
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type Message = {
  id: string;
  content: string;
  sender: 'You' | 'Alice';
  timestamp: number;
  status: 'pending' | 'sent' | 'delivered' | 'read';
  isOffline?: boolean;
};

type LabMode = 'websocket' | 'offline-queue' | 'architecture';

interface WhatsAppSystemDesignLabProps {
  onClose?: () => void;
  onOpenPlayground?: (code: string) => void;
}

const CodeBlock = ({ code, language = 'javascript' }: { code: string; language?: string }) => (
  <div className="rounded-lg bg-[#0d1117] p-4 font-mono text-xs leading-relaxed overflow-hidden relative group">
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <Badge variant="outline" className="text-[10px] bg-slate-800 border-slate-700 text-slate-400">
        {language}
      </Badge>
    </div>
    <pre className="text-slate-300">
      {code.split('\n').map((line, i) => (
        <div key={i} className="flex gap-4">
          <span className="text-slate-600 w-4 text-right select-none">{i + 1}</span>
          <span>{line}</span>
        </div>
      ))}
    </pre>
  </div>
);

const WhatsAppSystemDesignLab: React.FC<WhatsAppSystemDesignLabProps> = ({ onClose, onOpenPlayground }) => {
  const [activeMode, setActiveMode] = useState<LabMode>('websocket');
  const [isConnected, setIsConnected] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [offlineQueue, setOfflineQueue] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);
  const [events, setEvents] = useState<{ id: string; type: string; payload: string; timestamp: number }[]>([]);
  const [checklist, setChecklist] = useState({
    sendRealtime: false,
    simulateOffline: false,
    queueMessage: false,
    syncQueue: false,
    exploreArch: false
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const eventLogRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom(messagesEndRef);
  }, [messages]);

  useEffect(() => {
    scrollToBottom(eventLogRef);
  }, [events]);

  const addEvent = (type: string, payload: string) => {
    setEvents(prev => [...prev.slice(-19), {
      id: Math.random().toString(36).substr(2, 9),
      type,
      payload,
      timestamp: Date.now()
    }]);
  };

  // Simulate Alice responding
  useEffect(() => {
    if (isConnected && messages.length > 0 && messages[messages.length - 1].sender === 'You') {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.status === 'delivered' || lastMsg.status === 'read') {
        const timeout = setTimeout(() => {
          const aliceMsg: Message = {
            id: `alice-${Date.now()}`,
            content: "Got it! Real-time messaging is smooth.",
            sender: 'Alice',
            timestamp: Date.now(),
            status: 'delivered'
          };
          setMessages(prev => [...prev, aliceMsg]);
          addEvent('WS_RECV', JSON.stringify({ from: 'Alice', msg: aliceMsg.content }));
        }, 2000);
        return () => clearTimeout(timeout);
      }
    }
  }, [isConnected, messages]);

  const sendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content: messageInput,
      sender: 'You',
      timestamp: Date.now(),
      status: isConnected ? 'sent' : 'pending',
      isOffline: !isConnected,
    };

    if (isConnected) {
      setMessages(prev => [...prev, newMessage]);
      addEvent('WS_SEND', JSON.stringify({ type: 'CHAT_MSG', content: messageInput }));
      setChecklist(prev => ({ ...prev, sendRealtime: true }));
      
      // Simulate lifecycle
      setTimeout(() => {
        setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, status: 'delivered' } : m));
        addEvent('WS_ACK', JSON.stringify({ msgId: newMessage.id, status: 'delivered' }));
      }, 800);

      setTimeout(() => {
        setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, status: 'read' } : m));
        addEvent('WS_ACK', JSON.stringify({ msgId: newMessage.id, status: 'read' }));
      }, 1500);
    } else {
      setOfflineQueue(prev => [...prev, newMessage]);
      addEvent('LOCAL_QUEUE', `Queued: ${messageInput}`);
      setChecklist(prev => ({ ...prev, queueMessage: true }));
    }

    setMessageInput('');
  };

  const toggleConnection = () => {
    const newState = !isConnected;
    setIsConnected(newState);
    addEvent('WS_STATUS', newState ? 'CONNECTED' : 'DISCONNECTED');
    if (!newState) setChecklist(prev => ({ ...prev, simulateOffline: true }));
    
    if (newState && offlineQueue.length > 0) {
      addEvent('WS_SYNC', `Syncing ${offlineQueue.length} messages...`);
      setTimeout(() => {
        setMessages(prev => [...prev, ...offlineQueue.map(m => ({ ...m, status: 'sent' as const }))]);
        setOfflineQueue([]);
        setChecklist(prev => ({ ...prev, syncQueue: true }));
        addEvent('WS_SYNC_COMPLETE', 'All messages flushed to server');
      }, 1500);
    }
  };

  const resetLab = () => {
    setMessages([]);
    setOfflineQueue([]);
    setMessageInput('');
    setIsConnected(true);
    setEvents([]);
    setChecklist({
      sendRealtime: false,
      simulateOffline: false,
      queueMessage: false,
      syncQueue: false,
      exploreArch: false
    });
  };

  const codeSnippets = {
    websocket: `// WebSocket Client Implementation
const socket = new WebSocket('wss://api.whatsapp.com/v1');

socket.onopen = () => {
  console.log('Connected to gateway');
  syncOfflineQueue();
};

socket.onmessage = (event) => {
  const { type, payload } = JSON.parse(event.data);
  if (type === 'MESSAGE') {
    handleIncomingMessage(payload);
    sendAck(payload.id, 'DELIVERED');
  }
};

const sendMessage = (content) => {
  const msg = { id: uuid(), content, timestamp: Date.now() };
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(msg));
  } else {
    queueLocally(msg);
  }
};`,
    'offline-queue': `// Persistent Queue Manager
const db = new IndexedDB('whatsapp_store');

const queueLocally = async (message) => {
  await db.add('pending_messages', {
    ...message,
    status: 'PENDING'
  });
  notifyUI('Message queued offline');
};

const syncOfflineQueue = async () => {
  const pending = await db.getAll('pending_messages');
  for (const msg of pending) {
    try {
      await socket.send(JSON.stringify(msg));
      await db.delete('pending_messages', msg.id);
    } catch (e) {
      break; // Stop sync if connection drops
    }
  }
};`,
    architecture: `// Microservices Overview
// 1. WebSocket Gateway: Handles long-lived connections
// 2. Presence Service: Manages online/offline status
// 3. Message Service: Handles persistence and delivery
// 4. Media Service: CDN-backed blob storage
// 5. API Gateway: Auth, Profile, and Settings REST APIs`
  };

  const architectureNodes = [
    { id: 'client', name: 'Browser Client', icon: MessageSquare, color: 'from-cyan-500 to-blue-500', x: 50, y: 50 },
    { id: 'gateway', name: 'WS Gateway', icon: Server, color: 'from-blue-600 to-indigo-600', x: 250, y: 50 },
    { id: 'presence', name: 'Presence Service', icon: Users, color: 'from-pink-500 to-rose-500', x: 450, y: 50 },
    { id: 'msg-service', name: 'Message Service', icon: Database, color: 'from-emerald-500 to-teal-500', x: 250, y: 150 },
    { id: 'db', name: 'Cassandra Cluster', icon: Database, color: 'from-slate-700 to-slate-900', x: 450, y: 150 },
  ];

  const nodeDetails = {
    client: {
      title: 'Browser Client',
      desc: 'Handles real-time UI, local message queuing (IndexedDB), and WebSocket lifecycle.',
      tech: ['React', 'Framer Motion', 'IndexedDB']
    },
    gateway: {
      title: 'WebSocket Gateway',
      desc: 'Maintains persistent connections. Acts as a router between clients and backend services.',
      tech: ['Go', 'Node.js', 'Redis']
    },
    presence: {
      title: 'Presence Service',
      desc: 'Tracks online/offline status and "last seen" using heartbeat mechanisms.',
      tech: ['Redis', 'Pub/Sub']
    },
    'msg-service': {
      title: 'Message Service',
      desc: 'Handles message persistence, deduplication, and ordering guarantees.',
      tech: ['Java/Spring', 'Kafka']
    },
    db: {
      title: 'Database Cluster',
      desc: 'Sharded NoSQL storage for high-volume message persistence.',
      tech: ['Cassandra', 'ScallyDB']
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Lab Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Globe className="w-32 h-32 text-cyan-500 rotate-12" />
        </div>
        
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-white tracking-tight">System Design Lab</h1>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 gap-1.5 py-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Simulation
              </Badge>
            </div>
            <p className="text-sm text-slate-400 font-medium">WhatsApp Real-time Messaging & Persistence</p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={resetLab}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all text-sm font-semibold border border-slate-700"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Mode Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['websocket', 'offline-queue', 'architecture'] as LabMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => {
              setActiveMode(mode);
              if (mode === 'architecture') setChecklist(prev => ({ ...prev, exploreArch: true }));
            }}
            className={`group p-4 rounded-xl border-2 transition-all text-left relative overflow-hidden ${
              activeMode === mode 
                ? 'bg-slate-900 border-cyan-500/50 shadow-xl shadow-cyan-500/5' 
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className={`absolute top-0 right-0 p-4 transition-transform duration-500 ${activeMode === mode ? 'scale-110' : 'scale-100 opacity-20'}`}>
              {mode === 'websocket' && <Activity className="w-8 h-8 text-cyan-500" />}
              {mode === 'offline-queue' && <Database className="w-8 h-8 text-blue-500" />}
              {mode === 'architecture' && <Layers className="w-8 h-8 text-indigo-500" />}
            </div>
            <div className="relative z-10">
              <h3 className={`text-sm font-bold mb-1 transition-colors ${activeMode === mode ? 'text-white' : 'text-slate-400'}`}>
                {mode === 'websocket' ? 'WebSockets & Real-time' : mode === 'offline-queue' ? 'Offline Persistence' : 'Global Architecture'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[80%]">
                {mode === 'websocket' ? 'Full-duplex communication flows.' : mode === 'offline-queue' ? 'IndexedDB queuing & syncing.' : 'Distributed microservices layout.'}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Lab Area */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="bg-slate-900 border-slate-800 overflow-hidden min-h-[500px] flex flex-col">
            <CardHeader className="border-b border-slate-800 py-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-500" />
                  Interactive Workspace
                </CardTitle>
                <CardDescription className="text-xs">
                  {activeMode === 'websocket' ? 'Simulate bidirectional message flow' : activeMode === 'offline-queue' ? 'Test local storage and synchronization' : 'Explore infrastructure components'}
                </CardDescription>
              </div>
              {activeMode !== 'architecture' && (
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    isConnected ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                    {isConnected ? 'Connected' : 'Disconnected'}
                  </div>
                  <button
                    onClick={toggleConnection}
                    className={`p-2 rounded-lg transition-all ${
                      isConnected ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                    }`}
                    title={isConnected ? "Simulate network drop" : "Restore connection"}
                  >
                    {isConnected ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col">
              {activeMode === 'websocket' || activeMode === 'offline-queue' ? (
                <div className="flex-1 flex flex-col h-full bg-[#0b0e14]">
                  {/* Message Area */}
                  <div ref={messagesEndRef} className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[350px]">
                    <AnimatePresence initial={false}>
                      {messages.length === 0 && offlineQueue.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50 space-y-4 mt-12">
                          <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center">
                            <MessageSquare className="w-8 h-8" />
                          </div>
                          <p className="text-xs font-mono">WAITING_FOR_INTERACTION</p>
                        </div>
                      )}
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`group relative max-w-[80%] p-3 rounded-2xl text-sm ${
                            msg.sender === 'You' 
                              ? 'bg-cyan-600 text-white rounded-tr-none shadow-lg shadow-cyan-900/20' 
                              : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                          }`}>
                            {msg.content}
                            <div className={`flex items-center gap-1.5 mt-1.5 text-[10px] opacity-60 font-mono ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              {msg.sender === 'You' && (
                                <div className="flex items-center">
                                  {msg.status === 'pending' && <Clock className="w-2.5 h-2.5 animate-pulse" />}
                                  {msg.status === 'sent' && <Check className="w-2.5 h-2.5" />}
                                  {msg.status === 'delivered' && (
                                    <div className="flex">
                                      <Check className="w-2.5 h-2.5" />
                                      <Check className="w-2.5 h-2.5 -ml-1.5" />
                                    </div>
                                  )}
                                  {msg.status === 'read' && (
                                    <div className="flex text-cyan-300">
                                      <Check className="w-2.5 h-2.5" />
                                      <Check className="w-2.5 h-2.5 -ml-1.5" />
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      {activeMode === 'offline-queue' && offlineQueue.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex justify-end"
                        >
                          <div className="bg-slate-800/50 border-2 border-amber-500/30 text-slate-400 p-3 rounded-2xl rounded-tr-none text-sm italic flex items-center gap-3">
                            <Clock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                            {msg.content}
                            <Badge variant="outline" className="text-[9px] bg-amber-500/10 text-amber-500 border-amber-500/20 py-0">Queued Offline</Badge>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Input Area */}
                  <div className="p-4 bg-slate-900 border-t border-slate-800">
                    <div className="flex gap-3 bg-slate-950 p-2 rounded-xl border border-slate-800 ring-1 ring-slate-800 focus-within:ring-cyan-500/50 transition-all shadow-inner">
                      <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder={isConnected ? "Send message via WebSocket..." : "Network down. Message will be queued..."}
                        className="flex-1 bg-transparent border-none text-white text-sm px-3 focus:outline-none placeholder:text-slate-600 font-medium"
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!messageInput.trim()}
                        className="p-2.5 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 disabled:opacity-20 disabled:grayscale transition-all shadow-lg"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-2 px-1 flex items-center justify-between">
                      <div className="text-[10px] text-slate-500 font-mono">
                        {activeMode === 'websocket' ? 'REALTIME_PROTOCOL: V3' : 'PERSISTENCE: INDEXED_DB_LOCAL'}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Press <kbd className="bg-slate-800 px-1 rounded text-slate-400">Enter</kbd> to execute
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 p-8 bg-slate-950/50 relative">
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#334155" />
                      </marker>
                    </defs>
                    {/* Connections */}
                    <motion.path d="M 100 50 L 250 50" stroke="#334155" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
                    <motion.path d="M 250 50 L 450 50" stroke="#334155" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
                    <motion.path d="M 250 50 L 250 150" stroke="#334155" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
                    <motion.path d="M 250 150 L 450 150" stroke="#334155" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
                    
                    {/* Data Packets */}
                    <AnimatePresence>
                      {isConnected && (
                        <>
                          <motion.circle r="3" fill="#06b6d4"
                            animate={{ cx: [100, 250], cy: [50, 50] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                          <motion.circle r="3" fill="#6366f1"
                            animate={{ cx: [250, 450], cy: [50, 50] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                          />
                        </>
                      )}
                    </AnimatePresence>
                  </svg>

                  <div className="relative z-10 grid grid-cols-2 gap-x-24 gap-y-16">
                    {architectureNodes.map((node) => {
                      const Icon = node.icon;
                      const isSelected = selectedComponent === node.id;
                      return (
                        <div key={node.id} className="relative group" style={{ left: node.x / 5, top: node.y / 2 }}>
                          <motion.button
                            onClick={() => {
                              setSelectedComponent(node.id);
                              setChecklist(prev => ({ ...prev, exploreArch: true }));
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all w-40 ${
                              isSelected 
                                ? 'bg-slate-900 border-cyan-500 shadow-2xl shadow-cyan-500/20' 
                                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${node.color} flex items-center justify-center shadow-lg`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-center">
                              <div className="text-[11px] font-bold text-white uppercase tracking-wider">{node.name}</div>
                              <div className="text-[9px] text-slate-500 font-medium">Node: 10.0.0.{Math.floor(Math.random() * 255)}</div>
                            </div>
                          </motion.button>
                        </div>
                      );
                    })}
                  </div>

                  {selectedComponent && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute top-8 right-8 w-64 p-5 rounded-2xl bg-slate-900 border border-cyan-500/30 shadow-2xl z-20"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-white text-sm">{nodeDetails[selectedComponent as keyof typeof nodeDetails].title}</h4>
                        <button onClick={() => setSelectedComponent(null)} className="text-slate-500 hover:text-white"><X className="w-4 h-4" /></button>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        {nodeDetails[selectedComponent as keyof typeof nodeDetails].desc}
                      </p>
                      <div className="space-y-2">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tech Stack</div>
                        <div className="flex flex-wrap gap-1.5">
                          {nodeDetails[selectedComponent as keyof typeof nodeDetails].tech.map(t => (
                            <Badge key={t} variant="outline" className="text-[9px] bg-slate-800 border-slate-700 text-slate-300 py-0">{t}</Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dev Console / Event Log */}
          <Card className="bg-slate-900 border-slate-800 overflow-hidden">
            <CardHeader className="py-3 px-6 border-b border-slate-800 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                <Terminal className="w-3.5 h-3.5" />
                Network Events
              </CardTitle>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-rose-500" />
              </div>
            </CardHeader>
            <CardContent className="p-4 bg-black/50 font-mono text-[10px] h-40 overflow-y-auto" ref={eventLogRef}>
              {events.length === 0 ? (
                <div className="text-slate-700">Waiting for events...</div>
              ) : (
                events.map((ev) => (
                  <div key={ev.id} className="flex gap-4 mb-1 group">
                    <span className="text-slate-600 opacity-50 select-none">[{new Date(ev.timestamp).toLocaleTimeString()}]</span>
                    <span className={`font-bold ${
                      ev.type.includes('RECV') ? 'text-emerald-400' : 
                      ev.type.includes('SEND') ? 'text-cyan-400' : 
                      ev.type.includes('STATUS') ? 'text-amber-400' : 'text-slate-400'
                    }`}>{ev.type}</span>
                    <span className="text-slate-500 group-hover:text-slate-300 transition-colors truncate">{ev.payload}</span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Panel */}
        <div className="lg:col-span-4 space-y-6">
          {/* Learning Center */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="py-4 border-b border-slate-800">
              <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-brand-500" />
                Learning Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="space-y-3">
                {[
                  { id: 'sendRealtime', label: 'Send a real-time message' },
                  { id: 'simulateOffline', label: 'Simulate network interruption' },
                  { id: 'queueMessage', label: 'Queue message while offline' },
                  { id: 'syncQueue', label: 'Restore and sync local queue' },
                  { id: 'exploreArch', label: 'Explore 3+ system nodes' }
                ].map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border-2 transition-all ${
                      checklist[item.id as keyof typeof checklist] 
                        ? 'bg-emerald-500 border-emerald-500 text-white' 
                        : 'border-slate-700 bg-slate-800 text-transparent'
                    }`}>
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className={`text-xs font-medium ${checklist[item.id as keyof typeof checklist] ? 'text-slate-300' : 'text-slate-500'}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2 mb-2 text-cyan-400">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Key Concept</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed italic">
                  {activeMode === 'websocket' 
                    ? "WebSockets provide full-duplex communication over a single TCP connection, reducing HTTP overhead."
                    : activeMode === 'offline-queue'
                    ? "Optimistic UI combined with IndexedDB persistence ensures a 'never-fail' user experience."
                    : "Horizontal scaling is achieved via sharding and a gateway layer that routes connections."}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Code Preview */}
          <Card className="bg-slate-900 border-slate-800 overflow-hidden">
            <CardHeader className="py-4 border-b border-slate-800 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-brand-500" />
                System Logic
              </CardTitle>
              <Maximize2 
                className="w-3.5 h-3.5 text-slate-600 hover:text-white cursor-pointer transition-colors" 
                onClick={() => setIsCodeExpanded(true)}
              />
            </CardHeader>
            <CardContent className="p-0 bg-black/20">
              <CodeBlock code={codeSnippets[activeMode]} />
            </CardContent>
            <div className="p-3 bg-slate-800/30 text-center">
              <button 
                onClick={() => onOpenPlayground?.(codeSnippets[activeMode])}
                className="text-[10px] font-black text-cyan-500 hover:text-cyan-400 uppercase tracking-widest flex items-center justify-center gap-1.5 mx-auto transition-colors"
              >
                Open in Playground
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Expanded Code Modal */}
      <AnimatePresence>
        {isCodeExpanded && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <Code className="w-5 h-5 text-brand-500" />
                  <h2 className="text-lg font-bold text-white">System Logic Explorer</h2>
                </div>
                <button
                  onClick={() => setIsCodeExpanded(false)}
                  className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <CodeBlock code={codeSnippets[activeMode]} />
              </div>
              <div className="p-4 bg-slate-800/30 border-t border-slate-800 flex justify-end gap-3">
                <button
                  onClick={() => setIsCodeExpanded(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all text-sm font-semibold"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onOpenPlayground?.(codeSnippets[activeMode]);
                    setIsCodeExpanded(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition-all text-sm font-semibold shadow-lg shadow-cyan-900/20"
                >
                  Open in Playground
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WhatsAppSystemDesignLab;

