import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Shield, ShieldAlert, ShieldCheck, Database, Server, Code, FileCode2, AlertTriangle, Eye, EyeOff, RotateCcw, X, Info, ChevronRight, Terminal } from 'lucide-react';

type LabMode = 'stored' | 'reflected' | 'dom';

interface WebSecurityXSSLabProps {
    onClose?: () => void;
}

const XSS_PAYLOADS = [
    { name: 'Basic Alert', payload: `<script>alert('XSS')</script>`, desc: 'Simple script tag injection' },
    { name: 'Image Error', payload: `<img src="x" onerror="alert('XSS')">`, desc: 'Attribute injection using onerror' },
    { name: 'SVG OnLoad', payload: `<svg onload="alert('XSS')">`, desc: 'SVG tag injection' },
    { name: 'Iframe Injection', payload: `<iframe src="javascript:alert('XSS')"></iframe>`, desc: 'Iframe with javascript URI' },
];

export const WebSecurityXSSLab: React.FC<WebSecurityXSSLabProps> = ({ onClose }) => {
    const [activeMode, setActiveMode] = useState<LabMode>('stored');
    const [inputText, setInputText] = useState('');
    const [comments, setComments] = useState<{ id: string, text: string, user: string }[]>([
        { id: '1', text: 'Great article!', user: 'Alice' },
        { id: '2', text: 'Thanks for sharing.', user: 'Bob' }
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [urlHash, setUrlHash] = useState('welcome');

    const [isVulnerable, setIsVulnerable] = useState(true);
    const [xssTriggered, setXssTriggered] = useState(false);
    const [executedPayload, setExecutedPayload] = useState('');

    const domOutputRef = useRef<HTMLDivElement>(null);

    // Check for XSS execution
    useEffect(() => {
        // Intercept alerts for demonstration
        const originalAlert = window.alert;
        window.alert = ((msg: string) => {
            setXssTriggered(true);
            setExecutedPayload(msg || 'XSS Executed!');
            setTimeout(() => setXssTriggered(false), 3000);
        }) as any;

        return () => {
            window.alert = originalAlert;
        };
    }, []);

    // Handle DOM XSS specifically
    useEffect(() => {
        if (activeMode === 'dom' && domOutputRef.current) {
            if (isVulnerable) {
                // Vulnerable: using innerHTML
                domOutputRef.current.innerHTML = urlHash;

                // Find and manually execute scripts added via innerHTML (since browsers block them otherwise)
                const scripts = domOutputRef.current.getElementsByTagName('script');
                for (let i = 0; i < scripts.length; i++) {
                    try {
                        eval(scripts[i].innerText || scripts[i].textContent || '');
                    } catch (e) { }
                }

                // Execute event handlers mapped in HTML string like onerror
                const elementsWithOnerror = domOutputRef.current.querySelectorAll('[onerror]');
                elementsWithOnerror.forEach(el => {
                    const attr = el.getAttribute('onerror');
                    if (attr) {
                        try { eval(attr); } catch (e) { }
                    }
                });
                const elementsWithOnload = domOutputRef.current.querySelectorAll('[onload]');
                elementsWithOnload.forEach(el => {
                    const attr = el.getAttribute('onload');
                    if (attr) {
                        try { eval(attr); } catch (e) { }
                    }
                });

            } else {
                // Secure: using textContent
                domOutputRef.current.textContent = urlHash;
            }
        }
    }, [urlHash, activeMode, isVulnerable]);

    const handleAddComment = () => {
        if (!inputText.trim()) return;
        setComments([...comments, { id: Date.now().toString(), text: inputText, user: 'Attacker' }]);
        setInputText('');
    };

    const handleSearch = () => {
        // Search just sets the query which reflects on the page
    };

    const escapeHTML = (str: string) => {
        return str.replace(/[&<>'"]/g,
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag));
    };

    const renderHTML = (content: string) => {
        if (isVulnerable) {
            // Very unsafe, intentionally for demo
            return <span dangerouslySetInnerHTML={{ __html: content }} />;
        } else {
            // Safe, escaped
            return <span>{content}</span>;
        }
    };

    const resetLab = () => {
        setComments([
            { id: '1', text: 'Great article!', user: 'Alice' },
            { id: '2', text: 'Thanks for sharing.', user: 'Bob' }
        ]);
        setInputText('');
        setSearchQuery('');
        setUrlHash('welcome');
        setXssTriggered(false);
    };

    // Helper to trigger events on dynamically inserted elements in React
    // Since dangerouslySetInnerHTML doesn't execute script tags natively in modern React,
    // we simulate the execution for demonstration purposes if a payload matches.
    const simulateExecutionIfVulnerable = (payload: string) => {
        if (!isVulnerable) return;

        // Simulate browser execution of injected payloads
        const lowerPayload = payload.toLowerCase();
        if (lowerPayload.includes('<script>') || lowerPayload.includes('onerror') || lowerPayload.includes('onload') || lowerPayload.includes('javascript:')) {
            // Match simple alert text
            const match = payload.match(/alert\(['"]([^'"]+)['"]\)/);
            const alertText = match ? match[1] : 'XSS Executed via injected element';
            window.alert(alertText);
        }
    };

    const renderModeContent = () => {
        switch (activeMode) {
            case 'stored':
                return (
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                                <Database className="w-4 h-4 text-blue-400" />
                                Database / Comments Section
                            </h4>

                            <div className="space-y-3 max-h-48 overflow-y-auto mb-4 pr-2">
                                {comments.map(c => (
                                    <div key={c.id} className="p-3 bg-slate-900 rounded border border-slate-800 flex flex-col gap-1">
                                        <span className="text-xs text-slate-400 font-bold">{c.user}</span>
                                        <div className="text-slate-300 text-sm">
                                            {/* Execute the payload simulating browser behavior when vulnerable */}
                                            {(() => {
                                                if (c.user === 'Attacker') simulateExecutionIfVulnerable(c.text);
                                                return renderHTML(c.text);
                                            })()}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Enter a comment..."
                                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                                />
                                <button
                                    onClick={handleAddComment}
                                    className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'reflected':
                return (
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                                <Server className="w-4 h-4 text-purple-400" />
                                Search Page Example
                            </h4>

                            <div className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Search for something (try payloads)..."
                                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                                />
                                <button
                                    onClick={() => {
                                        setSearchQuery(inputText);
                                        simulateExecutionIfVulnerable(inputText);
                                    }}
                                    className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Search
                                </button>
                            </div>

                            {searchQuery && (
                                <div className="p-4 bg-slate-900 rounded border border-slate-800">
                                    <div className="text-slate-400 text-sm mb-2">Search Results for:</div>
                                    <div className="text-xl text-white font-bold">
                                        {renderHTML(searchQuery)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'dom':
                return (
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-emerald-400" />
                                URL Hash Routing Example
                            </h4>

                            <div className="mb-4">
                                <div className="text-xs text-slate-400 mb-1">Simulated URL</div>
                                <div className="flex items-center gap-2 bg-slate-900 rounded-lg border border-slate-700 px-3 py-2">
                                    <span className="text-slate-500 text-sm">https://example.com/page#</span>
                                    <input
                                        type="text"
                                        value={urlHash}
                                        onChange={(e) => setUrlHash(e.target.value)}
                                        className="flex-1 bg-transparent border-none outline-none text-emerald-400 text-sm font-mono"
                                    />
                                </div>
                            </div>

                            <div className="p-4 bg-slate-900 rounded border border-slate-800">
                                <div className="text-slate-400 text-sm mb-2">Vulnerable Client Code:</div>
                                <div className="bg-black/50 p-2 rounded text-xs font-mono text-emerald-300 mb-4 opacity-70">
                                    {isVulnerable ? "document.getElementById('content').innerHTML = location.hash;" : "document.getElementById('content').textContent = location.hash;"}
                                </div>

                                <div className="text-slate-400 text-sm mb-2">Rendered Output:</div>
                                <div className="text-lg text-white" ref={domOutputRef}>
                                    {/* DOM automatically populated via useEffect */}
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 relative rounded-2xl border-2 border-red-500/30 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-900 p-6 shadow-2xl shadow-red-500/10"
        >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-500/5 rounded-2xl pointer-events-none"></div>

            <div className="relative z-10 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className={`absolute inset-0 ${isVulnerable ? 'bg-red-500' : 'bg-green-500'} rounded-lg blur-lg opacity-50 animate-pulse transition-colors`}></div>
                        <div className={`relative w-10 h-10 rounded-lg bg-gradient-to-br ${isVulnerable ? 'from-red-500 to-orange-500' : 'from-green-500 to-emerald-500'} flex items-center justify-center transition-colors`}>
                            <ShieldAlert className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Cross-Site Scripting (XSS) Lab</h3>
                        <p className="text-sm text-slate-400">Experiment with payloads to understand XSS vulnerabilities</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Security Toggle */}
                    <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
                        <button
                            onClick={() => setIsVulnerable(true)}
                            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${isVulnerable ? 'bg-red-500/20 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'text-slate-400 hover:text-slate-300'}`}
                        >
                            Vulnerable 🔓
                        </button>
                        <button
                            onClick={() => setIsVulnerable(false)}
                            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${!isVulnerable ? 'bg-green-500/20 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]' : 'text-slate-400 hover:text-slate-300'}`}
                        >
                            Secure 🔒
                        </button>
                    </div>

                    <button
                        onClick={resetLab}
                        className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                        title="Reset lab"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">

                {/* Left Sidebar - Payloads & Modes */}
                <div className="md:col-span-4 space-y-4">
                    <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
                        <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Attack Modes</h4>
                        <div className="space-y-2">
                            <button
                                onClick={() => { setActiveMode('stored'); resetLab(); }}
                                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${activeMode === 'stored' ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600'}`}
                            >
                                <div className="flex items-center gap-2"><Database className="w-4 h-4" /> Stored XSS</div>
                                {activeMode === 'stored' && <ChevronRight className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={() => { setActiveMode('reflected'); resetLab(); }}
                                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${activeMode === 'reflected' ? 'bg-purple-500/20 border-purple-500/50 text-purple-300' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600'}`}
                            >
                                <div className="flex items-center gap-2"><Server className="w-4 h-4" /> Reflected XSS</div>
                                {activeMode === 'reflected' && <ChevronRight className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={() => { setActiveMode('dom'); resetLab(); }}
                                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${activeMode === 'dom' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600'}`}
                            >
                                <div className="flex items-center gap-2"><Terminal className="w-4 h-4" /> DOM-based XSS</div>
                                {activeMode === 'dom' && <ChevronRight className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
                        <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Common Payloads</h4>
                        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                            {XSS_PAYLOADS.map((p, idx) => (
                                <div key={idx} className="bg-slate-900 rounded-lg p-3 border border-slate-800 group hover:border-slate-600 transition-colors">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-bold text-slate-300">{p.name}</span>
                                        <button
                                            onClick={() => {
                                                if (activeMode === 'dom') setUrlHash(p.payload);
                                                else setInputText(p.payload);
                                            }}
                                            className="text-[10px] bg-slate-800 hover:bg-cyan-600 text-white px-2 py-1 rounded transition-colors"
                                        >
                                            Copy to Input
                                        </button>
                                    </div>
                                    <code className="text-[10px] text-red-400 block mb-1 font-mono break-all bg-black/30 p-1.5 rounded">
                                        {p.payload}
                                    </code>
                                    <p className="text-[10px] text-slate-500">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="md:col-span-8 space-y-4">

                    {/* Status Alert */}
                    <AnimatePresence>
                        {xssTriggered && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-red-500/10 border-2 border-red-500 rounded-lg p-4 flex items-center gap-4 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                            >
                                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                    <ShieldAlert className="w-6 h-6 text-red-500 animate-pulse" />
                                </div>
                                <div>
                                    <h4 className="text-red-400 font-bold text-lg leading-none">XSS Execution Successful!</h4>
                                    <p className="text-red-300 text-sm mt-1">The browser executed the malicious script: "{executedPayload}"</p>
                                </div>
                            </motion.div>
                        )}

                        {!xssTriggered && !isVulnerable && inputText && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-green-500/10 border border-green-500/50 rounded-lg p-3 flex items-center gap-3"
                            >
                                <ShieldCheck className="w-5 h-5 text-green-500" />
                                <span className="text-sm text-green-400">Security mode is blocking script execution via proper output encoding/safe APIs.</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {renderModeContent()}

                    <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                        <h4 className="text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
                            <Info className="w-4 h-4" /> What's happening?
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            {activeMode === 'stored' && "Stored XSS occurs when a malicious script is permanently stored on the target server. In this example, if you enter a script into the comment box and the application renders it without sanitization (Vulnerable mode), the script will execute for anyone viewing the comments."}
                            {activeMode === 'reflected' && "Reflected XSS occurs when malicious input is immediately returned by the web application in an error message, search result, etc. Here, searching for a script will cause it to be reflected back and executed within the context of the page if it's not sanitized."}
                            {activeMode === 'dom' && "DOM-based XSS occurs entirely on the client side. The vulnerability is in the page's JavaScript itself, which takes user-controlled data (like the URL hash) and unsafely passes it to a sink (like innerHTML). Notice how the input never even goes to a server!"}
                        </p>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default WebSecurityXSSLab;
