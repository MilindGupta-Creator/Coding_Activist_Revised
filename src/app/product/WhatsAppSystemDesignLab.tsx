import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Send, Wifi, WifiOff, Server, Database, MessageSquare, Users, Clock, CheckCircle2, XCircle, Loader2, X, HelpCircle, Info, ArrowRight, Lightbulb, Zap, BookOpen } from 'lucide-react';

type Message = {
  id: string;
  content: string;
  sender: string;
  timestamp: number;
  status: 'pending' | 'sent' | 'delivered' | 'read';
  isOffline?: boolean;
};

type LabMode = 'websocket' | 'offline-queue' | 'architecture';

interface WhatsAppSystemDesignLabProps {
  onClose?: () => void;
}

const WhatsAppSystemDesignLab: React.FC<WhatsAppSystemDesignLabProps> = ({ onClose }) => {
  const [activeMode, setActiveMode] = useState<LabMode>('websocket');
  const [isConnected, setIsConnected] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [offlineQueue, setOfflineQueue] = useState<Message[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showModeHelp, setShowModeHelp] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate WebSocket connection
  useEffect(() => {
    if (isPlaying && isConnected && activeMode === 'websocket') {
      const interval = setInterval(() => {
        // Simulate receiving a message
        const newMessage: Message = {
          id: `msg-${Date.now()}`,
          content: `Message ${messages.length + 1}`,
          sender: 'Alice',
          timestamp: Date.now(),
          status: 'delivered',
        };
        setMessages(prev => [...prev, newMessage]);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, isConnected, activeMode, messages.length]);

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
      // Simulate delivery after 1s
      setTimeout(() => {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
          )
        );
      }, 1000);
    } else {
      setOfflineQueue(prev => [...prev, newMessage]);
    }

    setMessageInput('');
  };

  const toggleConnection = () => {
    setIsConnected(prev => !prev);
    if (!isConnected && offlineQueue.length > 0) {
      // Simulate syncing offline queue
      setTimeout(() => {
        setMessages(prev => [...prev, ...offlineQueue]);
        setOfflineQueue([]);
      }, 1000);
    }
  };

  const resetLab = () => {
    setMessages([]);
    setOfflineQueue([]);
    setIsPlaying(false);
    setMessageInput('');
    setIsConnected(true);
  };

  const architectureComponents = [
    { id: 'client', name: 'Browser Client', icon: MessageSquare, color: 'bg-blue-500', description: 'React frontend, WebSocket client, local storage', details: 'Handles UI rendering, WebSocket connections, and local message caching. Implements optimistic UI updates for better UX.' },
    { id: 'websocket', name: 'WebSocket Server', icon: Server, color: 'bg-green-500', description: 'Real-time bidirectional communication', details: 'Maintains persistent connections with clients. Handles message routing, connection management, and heartbeat monitoring. Scales horizontally using connection sharding.' },
    { id: 'api', name: 'API Gateway', icon: Server, color: 'bg-purple-500', description: 'REST endpoints for auth, contacts, media', details: 'Provides RESTful APIs for authentication, contact management, media uploads, and profile updates. Acts as a single entry point for HTTP requests.' },
    { id: 'message', name: 'Message Service', icon: Database, color: 'bg-yellow-500', description: 'Message storage, delivery, ordering', details: 'Processes and stores messages. Ensures message ordering, deduplication, and delivery guarantees. Handles message persistence and retrieval.' },
    { id: 'presence', name: 'Presence Service', icon: Users, color: 'bg-pink-500', description: 'Online status, last seen, typing indicators', details: 'Tracks user online/offline status, last seen timestamps, and typing indicators. Uses Redis for fast lookups and pub/sub for real-time updates.' },
    { id: 'media', name: 'Media Service', icon: Database, color: 'bg-orange-500', description: 'Image/video uploads, CDN integration', details: 'Handles media file uploads, processing, and storage. Integrates with CDN for fast global delivery. Supports image compression and video transcoding.' },
    { id: 'db', name: 'Database Cluster', icon: Database, color: 'bg-red-500', description: 'Sharded database for messages and user data', details: 'Sharded MySQL/PostgreSQL cluster for horizontal scaling. Uses consistent hashing for message distribution. Implements read replicas for better performance.' },
  ];

  const modeDescriptions = {
    websocket: {
      title: 'WebSocket Flow',
      icon: Zap,
      description: 'Experience real-time messaging with WebSocket connections',
      instructions: [
        'Type a message and click Send to see real-time delivery',
        'Toggle connection to see how messages behave when offline',
        'Watch message status indicators (sent → delivered → read)',
        'Observe the low-latency communication in action'
      ],
      learningPoints: [
        'WebSocket provides full-duplex communication',
        'Messages are delivered instantly without polling',
        'Connection status affects message delivery',
        'Status indicators show message lifecycle'
      ]
    },
    'offline-queue': {
      title: 'Offline Queue',
      icon: Database,
      description: 'Learn how messages are queued and synced when offline',
      instructions: [
        'Click "Simulate Offline" to disconnect',
        'Add messages while offline - they\'ll be queued locally',
        'Click "Sync Queue" to restore connection and sync',
        'Watch how queued messages are sent automatically'
      ],
      learningPoints: [
        'Messages are stored locally when offline',
        'Queue persists across page refreshes',
        'Automatic sync when connection is restored',
        'No message loss during network interruptions'
      ]
    },
    architecture: {
      title: 'Architecture Explorer',
      icon: Server,
      description: 'Explore the system architecture and component interactions',
      instructions: [
        'Click on any component to learn more about it',
        'Read detailed descriptions of each system component',
        'Understand how components interact with each other',
        'See the data flow through the system'
      ],
      learningPoints: [
        'System is built with microservices architecture',
        'Each component has a specific responsibility',
        'Components communicate via APIs and message queues',
        'Scalability is achieved through horizontal scaling'
      ]
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 relative rounded-2xl border-2 border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-900 p-6 shadow-2xl shadow-cyan-500/10"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 rounded-2xl pointer-events-none"></div>
      
      <div className="relative z-10 mb-6 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400 rounded-lg blur-lg opacity-50 animate-pulse"></div>
              <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">WhatsApp Web System Design Lab</h3>
              <p className="text-sm text-slate-400">Interactive simulation of real-time messaging architecture</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!showWelcome && (
            <button
              onClick={() => setShowWelcome(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
              title="Show welcome guide"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Help</span>
            </button>
          )}
          <button
            onClick={resetLab}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
            title="Reset lab to initial state"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Close</span>
            </button>
          )}
        </div>
      </div>

      {/* Welcome Screen */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border-2 border-cyan-500/30"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Welcome to the System Design Lab!</h4>
                    <p className="text-sm text-slate-300">Learn how WhatsApp Web's architecture works through interactive simulations</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ArrowRight className="w-3 h-3 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white mb-1">What You'll Learn</div>
                      <div className="text-xs text-slate-400">
                        Real-time messaging, offline queuing, system architecture, and how components interact in a scalable chat application
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap className="w-3 h-3 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white mb-1">How to Use</div>
                      <div className="text-xs text-slate-400">
                        Select a mode above to explore different aspects. Each mode has interactive features you can experiment with. Click the help icon (?) for mode-specific guidance.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowWelcome(false)}
                className="ml-4 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => setShowWelcome(false)}
              className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mode Selector with Descriptions */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-medium text-slate-300">Explore Modes</h4>
            <button
              onClick={() => setShowModeHelp(showModeHelp === activeMode ? null : activeMode)}
              className="p-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-cyan-400 transition-colors"
              title="Show mode help"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['websocket', 'offline-queue', 'architecture'] as LabMode[]).map((mode) => {
            const modeInfo = modeDescriptions[mode];
            const ModeIcon = modeInfo.icon;
            return (
              <div key={mode} className="flex-1 min-w-[200px]">
                <button
                  onClick={() => {
                    setActiveMode(mode);
                    resetLab();
                    setShowModeHelp(null);
                  }}
                  className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeMode === mode
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <ModeIcon className="w-4 h-4" />
                    <span>{modeInfo.title}</span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
        
        {/* Mode Help Panel */}
        <AnimatePresence>
          {showModeHelp === activeMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700 overflow-hidden"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-white">{modeDescriptions[activeMode].title} Guide</span>
                </div>
                <button
                  onClick={() => setShowModeHelp(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-400 mb-4">{modeDescriptions[activeMode].description}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-medium text-cyan-400 mb-2 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    Step-by-Step Instructions
                  </div>
                  <ul className="space-y-2">
                    {modeDescriptions[activeMode].instructions.map((instruction, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-medium text-blue-400 mb-2 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3" />
                    Key Learning Points
                  </div>
                  <ul className="space-y-2">
                    {modeDescriptions[activeMode].learningPoints.map((point, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">→</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* WebSocket Mode */}
      {activeMode === 'websocket' && (
        <div className="space-y-4">
          {/* Quick Info Banner */}
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-300">
                <span className="font-medium">Tip:</span> Try sending messages and toggling the connection to see how WebSocket handles real-time communication. Watch the message status indicators change from sent → delivered → read.
              </div>
            </div>
          </div>

          {/* Connection Status */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700">
            <div className="flex items-center gap-3">
              {isConnected ? (
                <Wifi className="w-5 h-5 text-green-400" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-400" />
              )}
              <div>
                <div className="text-sm font-medium text-white">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </div>
                <div className="text-xs text-slate-400">
                  {isConnected ? 'WebSocket active' : 'Offline mode'}
                </div>
              </div>
            </div>
            <button
              onClick={toggleConnection}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isConnected
                  ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                  : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
              }`}
            >
              {isConnected ? 'Disconnect' : 'Connect'}
            </button>
          </div>

          {/* Message List */}
          <div className="h-64 overflow-y-auto rounded-lg bg-slate-900 border border-slate-800 p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 text-slate-600" />
                </div>
                <div className="text-sm font-medium text-slate-400 mb-2">No messages yet</div>
                <div className="text-xs text-slate-500 max-w-xs">
                  Start by typing a message below. You'll see real-time delivery status indicators.
                </div>
              </div>
            ) : (
              <AnimatePresence>
                {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex flex-col gap-1 ${
                    msg.sender === 'You' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      msg.sender === 'You'
                        ? 'bg-brand-500 text-white'
                        : 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    <div className="text-sm">{msg.content}</div>
                    <div className="flex items-center gap-1 mt-1 text-xs opacity-70">
                      {msg.status === 'pending' && <Loader2 className="w-3 h-3 animate-spin" />}
                      {msg.status === 'sent' && <CheckCircle2 className="w-3 h-3" />}
                      {msg.status === 'delivered' && (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <CheckCircle2 className="w-3 h-3 -ml-1" />
                        </>
                      )}
                      {msg.status === 'read' && (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-blue-400" />
                          <CheckCircle2 className="w-3 h-3 text-blue-400 -ml-1" />
                        </>
                      )}
                      <span className="ml-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
                ))}
              </AnimatePresence>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
              <button
                onClick={sendMessage}
                disabled={!messageInput.trim()}
                className="px-6 py-2 rounded-lg bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1">
              <span>Press</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">Enter</kbd>
              <span>to send</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="text-xs text-slate-400 mb-1">Messages Sent</div>
              <div className="text-lg font-bold text-white">{messages.length}</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="text-xs text-slate-400 mb-1">Connection</div>
              <div className={`text-lg font-bold flex items-center gap-2 ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
                {isConnected ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    Active
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    Offline
                  </>
                )}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="text-xs text-slate-400 mb-1">Latency</div>
              <div className="text-lg font-bold text-white flex items-center gap-1">
                {isConnected ? (
                  <>
                    <Zap className="w-3 h-3 text-green-400" />
                    ~50ms
                  </>
                ) : (
                  'N/A'
                )}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="text-xs text-slate-400 mb-1">Queue Size</div>
              <div className="text-lg font-bold text-white">{offlineQueue.length}</div>
            </div>
          </div>
        </div>
      )}

      {/* Offline Queue Mode */}
      {activeMode === 'offline-queue' && (
        <div className="space-y-4">
          {/* Info Banner */}
          <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-start gap-3">
              <WifiOff className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-medium text-amber-400 mb-2">Offline Queue System</div>
                <p className="text-xs text-amber-300/80 mb-2">
                  When you're offline, messages are stored locally in your browser. This ensures no messages are lost even when the network is unavailable.
                </p>
                <div className="text-xs text-amber-300/70">
                  <span className="font-medium">How it works:</span> Messages are queued in IndexedDB/LocalStorage → Connection restored → Automatic sync → Messages delivered in order
                </div>
              </div>
            </div>
          </div>

          {/* Offline Queue */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-300 mb-2">
              Offline Queue ({offlineQueue.length} messages)
            </div>
            <div className="h-48 overflow-y-auto rounded-lg bg-slate-900 border border-slate-800 p-4 space-y-2">
              {offlineQueue.length === 0 ? (
                <div className="text-center text-slate-500 py-8">
                  <Database className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <div className="text-sm">No messages in queue</div>
                </div>
              ) : (
                offlineQueue.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700"
                  >
                    <div className="flex-1">
                      <div className="text-sm text-white">{msg.content}</div>
                      <div className="text-xs text-slate-400 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span className="text-xs text-amber-400">Pending</span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsConnected(false)}
              className="flex-1 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
            >
              Simulate Offline
            </button>
            <button
              onClick={() => {
                const newMsg: Message = {
                  id: `offline-${Date.now()}`,
                  content: `Queued message ${offlineQueue.length + 1}`,
                  sender: 'You',
                  timestamp: Date.now(),
                  status: 'pending',
                  isOffline: true,
                };
                setOfflineQueue(prev => [...prev, newMsg]);
              }}
              className="flex-1 px-4 py-2 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors"
            >
              Add to Queue
            </button>
            <button
              onClick={() => {
                setIsConnected(true);
                setTimeout(() => {
                  setMessages(prev => [...prev, ...offlineQueue]);
                  setOfflineQueue([]);
                }, 1000);
              }}
              className="flex-1 px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
            >
              Sync Queue
            </button>
          </div>

          {/* Sync Animation */}
          {isConnected && offlineQueue.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-lg bg-green-500/10 border border-green-500/30"
            >
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-green-400 animate-spin" />
                <span className="text-sm text-green-400">Syncing {offlineQueue.length} messages...</span>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Architecture Explorer Mode */}
      {activeMode === 'architecture' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {architectureComponents.map((component) => {
              const Icon = component.icon;
              return (
                <motion.button
                  key={component.id}
                  onClick={() => setSelectedComponent(component.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedComponent === component.id
                      ? 'border-brand-500 bg-brand-500/10'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg ${component.color} flex items-center justify-center mb-3 mx-auto`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-medium text-white text-center mb-1">
                    {component.name}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {selectedComponent && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-lg bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-cyan-500/30 shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {(() => {
                    const comp = architectureComponents.find(c => c.id === selectedComponent);
                    const Icon = comp?.icon;
                    return (
                      <div className={`w-12 h-12 rounded-lg ${comp?.color} flex items-center justify-center`}>
                        {Icon && <Icon className="w-6 h-6 text-white" />}
                      </div>
                    );
                  })()}
                  <div>
                    <div className="text-lg font-bold text-white">
                      {architectureComponents.find(c => c.id === selectedComponent)?.name}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      System Component
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedComponent(null)}
                  className="p-1.5 rounded-lg bg-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-medium text-cyan-400 mb-1.5">Overview</div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {architectureComponents.find(c => c.id === selectedComponent)?.description}
                  </p>
                </div>
                <div>
                  <div className="text-xs font-medium text-blue-400 mb-1.5">Technical Details</div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {architectureComponents.find(c => c.id === selectedComponent)?.details}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Architecture Diagram */}
          <div className="p-6 rounded-lg bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-slate-300">System Architecture Flow</div>
              <div className="text-xs text-slate-500">Click components above to learn more</div>
            </div>
            <div className="space-y-6">
              {/* Client Layer */}
              <div>
                <div className="text-xs text-slate-500 mb-2 uppercase tracking-wide">Client Layer</div>
                <div className="flex items-center gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex-1 p-4 rounded-lg bg-blue-500/20 border-2 border-blue-500/30 text-center cursor-pointer hover:bg-blue-500/30 transition-colors"
                    onClick={() => setSelectedComponent('client')}
                  >
                    <MessageSquare className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-xs text-blue-400 font-medium">Browser Client</div>
                    <div className="text-xs text-slate-500 mt-1">React, WebSocket, LocalStorage</div>
                  </motion.div>
                  <div className="text-slate-500 text-xl">→</div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex-1 p-4 rounded-lg bg-green-500/20 border-2 border-green-500/30 text-center cursor-pointer hover:bg-green-500/30 transition-colors"
                    onClick={() => setSelectedComponent('websocket')}
                  >
                    <Server className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <div className="text-xs text-green-400 font-medium">WebSocket Server</div>
                    <div className="text-xs text-slate-500 mt-1">Real-time Communication</div>
                  </motion.div>
                </div>
              </div>

              {/* Service Layer */}
              <div>
                <div className="text-xs text-slate-500 mb-2 uppercase tracking-wide">Service Layer</div>
                <div className="grid grid-cols-3 gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="p-4 rounded-lg bg-purple-500/20 border-2 border-purple-500/30 text-center cursor-pointer hover:bg-purple-500/30 transition-colors"
                    onClick={() => setSelectedComponent('api')}
                  >
                    <Server className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-xs text-purple-400 font-medium">API Gateway</div>
                    <div className="text-xs text-slate-500 mt-1">REST Endpoints</div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="p-4 rounded-lg bg-yellow-500/20 border-2 border-yellow-500/30 text-center cursor-pointer hover:bg-yellow-500/30 transition-colors"
                    onClick={() => setSelectedComponent('message')}
                  >
                    <Database className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <div className="text-xs text-yellow-400 font-medium">Message Service</div>
                    <div className="text-xs text-slate-500 mt-1">Message Processing</div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="p-4 rounded-lg bg-pink-500/20 border-2 border-pink-500/30 text-center cursor-pointer hover:bg-pink-500/30 transition-colors"
                    onClick={() => setSelectedComponent('presence')}
                  >
                    <Users className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                    <div className="text-xs text-pink-400 font-medium">Presence Service</div>
                    <div className="text-xs text-slate-500 mt-1">User Status</div>
                  </motion.div>
                </div>
              </div>

              {/* Data Layer */}
              <div>
                <div className="text-xs text-slate-500 mb-2 uppercase tracking-wide">Data Layer</div>
                <div className="flex items-center gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex-1 p-4 rounded-lg bg-orange-500/20 border-2 border-orange-500/30 text-center cursor-pointer hover:bg-orange-500/30 transition-colors"
                    onClick={() => setSelectedComponent('media')}
                  >
                    <Database className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                    <div className="text-xs text-orange-400 font-medium">Media Service</div>
                    <div className="text-xs text-slate-500 mt-1">CDN Integration</div>
                  </motion.div>
                  <div className="text-slate-500 text-xl">→</div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex-1 p-4 rounded-lg bg-red-500/20 border-2 border-red-500/30 text-center cursor-pointer hover:bg-red-500/30 transition-colors"
                    onClick={() => setSelectedComponent('db')}
                  >
                    <Database className="w-6 h-6 text-red-400 mx-auto mb-2" />
                    <div className="text-xs text-red-400 font-medium">Database Cluster</div>
                    <div className="text-xs text-slate-500 mt-1">Sharded Storage</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default WhatsAppSystemDesignLab;

