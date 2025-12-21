import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, ExternalLink, BarChart3, Copy, CheckCircle2, XCircle, Loader2, X, HelpCircle, Info, ArrowRight, Lightbulb, Zap, BookOpen, QrCode, Globe, TrendingUp, Clock, Users, MapPin, RefreshCw, Download, Upload, Shield, Lock, Database } from 'lucide-react';

type ShortURL = {
  id: string;
  longURL: string;
  shortCode: string;
  shortURL: string;
  createdAt: number;
  clicks: number;
  qrCode?: string;
};

type ClickEvent = {
  id: string;
  code: string;
  timestamp: number;
  country?: string;
  referrer?: string;
  device?: string;
};

type LabMode = 'shorten' | 'redirect' | 'analytics' | 'architecture';

interface URLShortenerSystemDesignLabProps {
  onClose?: () => void;
}

const URLShortenerSystemDesignLab: React.FC<URLShortenerSystemDesignLabProps> = ({ onClose }) => {
  const [activeMode, setActiveMode] = useState<LabMode>('shorten');
  const [urls, setUrls] = useState<ShortURL[]>([]);
  const [longURL, setLongURL] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [clickEvents, setClickEvents] = useState<ClickEvent[]>([]);
  const [selectedURL, setSelectedURL] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showModeHelp, setShowModeHelp] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [redirectingCode, setRedirectingCode] = useState<string | null>(null);

  // Simulate URL shortening
  const shortenURL = async () => {
    if (!longURL.trim()) return;

    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    const code = customAlias || generateShortCode();
    const newURL: ShortURL = {
      id: `url-${Date.now()}`,
      longURL: longURL.trim(),
      shortCode: code,
      shortURL: `${window.location.origin}/s/${code}`,
      createdAt: Date.now(),
      clicks: 0,
      qrCode: `data:image/svg+xml;base64,${btoa(`<svg><text>${code}</text></svg>`)}` // Simplified QR
    };

    setUrls(prev => [newURL, ...prev]);
    setLongURL('');
    setCustomAlias('');
    setIsProcessing(false);
  };

  const generateShortCode = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 7; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  // Simulate redirect and analytics tracking
  const handleRedirect = (code: string) => {
    const url = urls.find(u => u.shortCode === code);
    if (!url) return;

    setRedirectingCode(code);
    
    // Track click
    const clickEvent: ClickEvent = {
      id: `click-${Date.now()}`,
      code,
      timestamp: Date.now(),
      country: ['US', 'UK', 'IN', 'CA', 'DE'][Math.floor(Math.random() * 5)],
      referrer: ['Direct', 'Google', 'Twitter', 'Facebook', 'Email'][Math.floor(Math.random() * 5)],
      device: ['Desktop', 'Mobile', 'Tablet'][Math.floor(Math.random() * 3)]
    };

    setClickEvents(prev => [clickEvent, ...prev]);
    setUrls(prev => prev.map(u => 
      u.shortCode === code ? { ...u, clicks: u.clicks + 1 } : u
    ));

    // Simulate redirect after delay
    setTimeout(() => {
      setRedirectingCode(null);
      window.open(url.longURL, '_blank');
    }, 1500);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const resetLab = () => {
    setUrls([]);
    setClickEvents([]);
    setLongURL('');
    setCustomAlias('');
    setSelectedURL(null);
    setRedirectingCode(null);
  };

  const architectureComponents = [
    { id: 'client', name: 'Browser Client', icon: Link2, color: 'bg-blue-500', description: 'React frontend, URL validation, QR generation', details: 'Handles URL input validation, short URL generation UI, QR code display, and analytics dashboard. Implements client-side caching for better performance.' },
    { id: 'api', name: 'API Gateway', icon: Globe, color: 'bg-green-500', description: 'REST endpoints for shorten, redirect, analytics', details: 'Provides RESTful APIs for URL shortening, redirect handling, and analytics retrieval. Acts as a single entry point with rate limiting and authentication.' },
    { id: 'redirect', name: 'Redirect Handler', icon: ExternalLink, color: 'bg-purple-500', description: 'Fast redirects with analytics tracking', details: 'Handles short URL lookups and redirects. Tracks click events asynchronously using sendBeacon API. Implements caching for frequently accessed URLs.' },
    { id: 'analytics', name: 'Analytics Service', icon: BarChart3, color: 'bg-yellow-500', description: 'Click tracking, geolocation, time-series data', details: 'Collects and processes click events. Tracks geolocation, referrers, devices, and timestamps. Stores data in time-series database for efficient querying.' },
    { id: 'cache', name: 'Cache Layer', icon: Zap, color: 'bg-orange-500', description: 'CDN + Redis for fast lookups', details: 'CDN caches redirect mappings at edge locations. Redis stores hot data (frequently accessed URLs). Reduces database load and improves redirect speed.' },
    { id: 'db', name: 'Database', icon: Database, color: 'bg-red-500', description: 'URL mappings, analytics data (sharded)', details: 'Stores URL mappings (short code → long URL) and analytics data. Uses sharding for horizontal scaling. Implements read replicas for better performance.' },
  ];

  const modeDescriptions = {
    shorten: {
      title: 'URL Shortening',
      icon: Link2,
      description: 'Create short URLs with custom aliases and QR codes',
      instructions: [
        'Enter a long URL in the input field',
        'Optionally add a custom alias for your short URL',
        'Click "Shorten" to generate a short URL',
        'Copy the short URL or download the QR code'
      ],
      learningPoints: [
        'URL validation happens client-side first',
        'Short codes are generated using base62 encoding',
        'Custom aliases must be unique',
        'QR codes enable easy sharing'
      ]
    },
    redirect: {
      title: 'Redirect Flow',
      icon: ExternalLink,
      description: 'Experience how redirects work with analytics tracking',
      instructions: [
        'Click on any short URL to simulate a redirect',
        'Watch the redirect animation and analytics tracking',
        'See how clicks are tracked asynchronously',
        'Observe the fast redirect performance'
      ],
      learningPoints: [
        'Redirects use 301 (permanent) or 302 (temporary) status',
        'Analytics tracking is non-blocking',
        'Caching improves redirect speed',
        'sendBeacon API ensures reliable tracking'
      ]
    },
    analytics: {
      title: 'Analytics Dashboard',
      icon: BarChart3,
      description: 'View real-time analytics for your shortened URLs',
      instructions: [
        'Select a short URL to view its analytics',
        'See click counts, geographic distribution, and referrers',
        'View time-series data and device breakdown',
        'Export analytics data if needed'
      ],
      learningPoints: [
        'Analytics are collected in real-time',
        'Data is aggregated for performance',
        'Geographic data helps understand audience',
        'Referrer tracking shows traffic sources'
      ]
    },
    architecture: {
      title: 'Architecture Explorer',
      icon: Globe,
      description: 'Explore the system architecture and component interactions',
      instructions: [
        'Click on any component to learn more about it',
        'Read detailed descriptions of each system component',
        'Understand how components interact with each other',
        'See the data flow through the system'
      ],
      learningPoints: [
        'System uses microservices architecture',
        'Caching is critical for performance',
        'Analytics tracking is asynchronous',
        'Horizontal scaling through sharding'
      ]
    }
  };

  // Simulate analytics data
  const getAnalyticsData = (code: string) => {
    const url = urls.find(u => u.shortCode === code);
    if (!url) return null;

    const urlClicks = clickEvents.filter(c => c.code === code);
    const countries = urlClicks.reduce((acc, click) => {
      const country = click.country || 'Unknown';
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const referrers = urlClicks.reduce((acc, click) => {
      const ref = click.referrer || 'Direct';
      acc[ref] = (acc[ref] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const devices = urlClicks.reduce((acc, click) => {
      const device = click.device || 'Unknown';
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalClicks: url.clicks,
      uniqueVisitors: new Set(urlClicks.map(c => c.id)).size,
      countries,
      referrers,
      devices,
      timeSeries: urlClicks.map(c => ({
        date: new Date(c.timestamp).toLocaleDateString(),
        clicks: 1
      }))
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 relative rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-900 p-6 shadow-2xl shadow-purple-500/10"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 rounded-2xl pointer-events-none"></div>
      
      <div className="relative z-10 mb-6 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-400 rounded-lg blur-lg opacity-50 animate-pulse"></div>
              <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Link2 className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">URL Shortener System Design Lab</h3>
              <p className="text-sm text-slate-400">Interactive simulation of URL shortening architecture</p>
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
            <RefreshCw className="w-4 h-4" />
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
            className="mb-6 p-6 rounded-xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 border-2 border-purple-500/30"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Welcome to the URL Shortener Lab!</h4>
                    <p className="text-sm text-slate-300">Learn how URL shorteners work through interactive simulations</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ArrowRight className="w-3 h-3 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white mb-1">What You'll Learn</div>
                      <div className="text-xs text-slate-400">
                        URL shortening, redirect handling, analytics tracking, caching strategies, and system architecture
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap className="w-3 h-3 text-pink-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white mb-1">How to Use</div>
                      <div className="text-xs text-slate-400">
                        Select a mode above to explore different aspects. Shorten URLs, test redirects, view analytics, and explore the architecture.
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
              className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mode Selector */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-medium text-slate-300">Explore Modes</h4>
            <button
              onClick={() => setShowModeHelp(showModeHelp === activeMode ? null : activeMode)}
              className="p-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-purple-400 transition-colors"
              title="Show mode help"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['shorten', 'redirect', 'analytics', 'architecture'] as LabMode[]).map((mode) => {
            const modeInfo = modeDescriptions[mode];
            const ModeIcon = modeInfo.icon;
            return (
              <div key={mode} className="flex-1 min-w-[150px]">
                <button
                  onClick={() => {
                    setActiveMode(mode);
                    setShowModeHelp(null);
                  }}
                  className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeMode === mode
                      ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
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
                  <Info className="w-4 h-4 text-purple-400" />
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
                  <div className="text-xs font-medium text-purple-400 mb-2 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    Step-by-Step Instructions
                  </div>
                  <ul className="space-y-2">
                    {modeDescriptions[activeMode].instructions.map((instruction, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-medium text-pink-400 mb-2 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3" />
                    Key Learning Points
                  </div>
                  <ul className="space-y-2">
                    {modeDescriptions[activeMode].learningPoints.map((point, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-pink-400 mt-0.5">→</span>
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

      {/* URL Shortening Mode */}
      {activeMode === 'shorten' && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-purple-300">
                <span className="font-medium">Tip:</span> Enter a long URL and optionally add a custom alias. The system will generate a short code and create a QR code for easy sharing.
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 space-y-3">
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Long URL</label>
              <input
                type="text"
                value={longURL}
                onChange={(e) => setLongURL(e.target.value)}
                placeholder="https://example.com/very/long/url/path"
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Custom Alias (Optional)</label>
              <input
                type="text"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                placeholder="my-custom-link"
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
            <button
              onClick={shortenURL}
              disabled={!longURL.trim() || isProcessing}
              className="w-full px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Shortening...
                </>
              ) : (
                <>
                  <Link2 className="w-4 h-4" />
                  Shorten URL
                </>
              )}
            </button>
          </div>

          {/* Shortened URLs List */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-300">Your Short URLs ({urls.length})</div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {urls.length === 0 ? (
                <div className="text-center text-slate-500 py-8">
                  <Link2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <div className="text-sm">No URLs shortened yet</div>
                </div>
              ) : (
                urls.map((url) => (
                  <motion.div
                    key={url.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-slate-800/50 border border-slate-700"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-slate-400 mb-1">Original URL</div>
                        <div className="text-sm text-slate-300 truncate mb-3">{url.longURL}</div>
                        <div className="text-xs text-slate-400 mb-1">Short URL</div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium text-purple-400">{url.shortURL}</div>
                          <button
                            onClick={() => copyToClipboard(url.shortURL, url.id)}
                            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-400 hover:text-white transition-colors"
                          >
                            {copiedId === url.id ? (
                              <CheckCircle2 className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="w-16 h-16 rounded-lg bg-slate-700 flex items-center justify-center">
                          <QrCode className="w-8 h-8 text-slate-500" />
                        </div>
                        <div className="text-xs text-slate-400">{url.clicks} clicks</div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Redirect Mode */}
      {activeMode === 'redirect' && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-300">
                <span className="font-medium">Tip:</span> Click on any short URL to simulate a redirect. Watch how analytics are tracked asynchronously without blocking the redirect.
              </div>
            </div>
          </div>

          {urls.length === 0 ? (
            <div className="text-center text-slate-500 py-12">
              <ExternalLink className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <div className="text-sm mb-2">No URLs to redirect</div>
              <div className="text-xs text-slate-500">Switch to "URL Shortening" mode to create some URLs first</div>
            </div>
          ) : (
            <div className="space-y-3">
              {urls.map((url) => (
                <motion.div
                  key={url.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    redirectingCode === url.shortCode
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-slate-700 bg-slate-800/50 hover:border-purple-500'
                  }`}
                  onClick={() => handleRedirect(url.shortCode)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white mb-1">{url.shortURL}</div>
                      <div className="text-xs text-slate-400 truncate">{url.longURL}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      {redirectingCode === url.shortCode ? (
                        <>
                          <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                          <span className="text-sm text-blue-400">Redirecting...</span>
                        </>
                      ) : (
                        <>
                          <div className="text-xs text-slate-400">{url.clicks} clicks</div>
                          <ExternalLink className="w-5 h-5 text-purple-400" />
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Recent Clicks */}
          {clickEvents.length > 0 && (
            <div className="mt-6">
              <div className="text-sm font-medium text-slate-300 mb-3">Recent Clicks ({clickEvents.length})</div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {clickEvents.slice(0, 10).map((click) => (
                  <div
                    key={click.id}
                    className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <div>
                        <div className="text-xs text-white">/{click.code}</div>
                        <div className="text-xs text-slate-400">
                          {new Date(click.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      {click.country && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {click.country}
                        </div>
                      )}
                      {click.device && (
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {click.device}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Analytics Mode */}
      {activeMode === 'analytics' && (
        <div className="space-y-4">
          {urls.length === 0 ? (
            <div className="text-center text-slate-500 py-12">
              <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <div className="text-sm mb-2">No URLs to analyze</div>
              <div className="text-xs text-slate-500">Create some URLs and generate clicks to see analytics</div>
            </div>
          ) : (
            <>
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-yellow-300">
                    <span className="font-medium">Tip:</span> Select a short URL to view its detailed analytics including clicks, geographic distribution, referrers, and device breakdown.
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* URL List */}
                <div>
                  <div className="text-sm font-medium text-slate-300 mb-3">Select URL</div>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {urls.map((url) => (
                      <button
                        key={url.id}
                        onClick={() => setSelectedURL(url.shortCode)}
                        className={`w-full p-3 rounded-lg text-left transition-all ${
                          selectedURL === url.shortCode
                            ? 'bg-purple-500/20 border-2 border-purple-500'
                            : 'bg-slate-800/50 border-2 border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        <div className="text-sm font-medium text-white mb-1">{url.shortCode}</div>
                        <div className="text-xs text-slate-400 truncate">{url.longURL}</div>
                        <div className="text-xs text-purple-400 mt-2">{url.clicks} clicks</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Analytics Display */}
                <div>
                  {selectedURL ? (
                    (() => {
                      const analytics = getAnalyticsData(selectedURL);
                      if (!analytics) return null;
                      return (
                        <div className="space-y-4">
                          <div className="text-sm font-medium text-slate-300">Analytics</div>
                          
                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                              <div className="text-xs text-slate-400 mb-1">Total Clicks</div>
                              <div className="text-lg font-bold text-white">{analytics.totalClicks}</div>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                              <div className="text-xs text-slate-400 mb-1">Unique Visitors</div>
                              <div className="text-lg font-bold text-white">{analytics.uniqueVisitors}</div>
                            </div>
                          </div>

                          {/* Geographic Distribution */}
                          <div>
                            <div className="text-xs font-medium text-slate-300 mb-2">Top Countries</div>
                            <div className="space-y-1">
                              {Object.entries(analytics.countries)
                                .sort(([, a], [, b]) => b - a)
                                .slice(0, 5)
                                .map(([country, count]) => (
                                  <div key={country} className="flex items-center justify-between p-2 rounded bg-slate-800/50">
                                    <div className="flex items-center gap-2">
                                      <MapPin className="w-3 h-3 text-slate-500" />
                                      <span className="text-xs text-white">{country}</span>
                                    </div>
                                    <span className="text-xs text-purple-400">{count}</span>
                                  </div>
                                ))}
                            </div>
                          </div>

                          {/* Referrers */}
                          <div>
                            <div className="text-xs font-medium text-slate-300 mb-2">Top Referrers</div>
                            <div className="space-y-1">
                              {Object.entries(analytics.referrers)
                                .sort(([, a], [, b]) => b - a)
                                .slice(0, 5)
                                .map(([referrer, count]) => (
                                  <div key={referrer} className="flex items-center justify-between p-2 rounded bg-slate-800/50">
                                    <span className="text-xs text-white">{referrer}</span>
                                    <span className="text-xs text-purple-400">{count}</span>
                                  </div>
                                ))}
                            </div>
                          </div>

                          {/* Devices */}
                          <div>
                            <div className="text-xs font-medium text-slate-300 mb-2">Device Breakdown</div>
                            <div className="space-y-1">
                              {Object.entries(analytics.devices)
                                .sort(([, a], [, b]) => b - a)
                                .map(([device, count]) => (
                                  <div key={device} className="flex items-center justify-between p-2 rounded bg-slate-800/50">
                                    <span className="text-xs text-white">{device}</span>
                                    <span className="text-xs text-purple-400">{count}</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="text-center text-slate-500 py-12">
                      <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <div className="text-sm">Select a URL to view analytics</div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Architecture Mode */}
      {activeMode === 'architecture' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {architectureComponents.map((component) => {
              const Icon = component.icon;
              return (
                <motion.button
                  key={component.id}
                  onClick={() => setSelectedURL(component.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedURL === component.id
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg ${component.color} flex items-center justify-center mb-3 mx-auto`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-medium text-white text-center mb-1">
                    {component.name}
                  </div>
                  <div className="text-xs text-slate-400 text-center">
                    {component.description}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {selectedURL && architectureComponents.find(c => c.id === selectedURL) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-lg bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-purple-500/30 shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {(() => {
                    const comp = architectureComponents.find(c => c.id === selectedURL);
                    const Icon = comp?.icon;
                    return (
                      <div className={`w-12 h-12 rounded-lg ${comp?.color} flex items-center justify-center`}>
                        {Icon && <Icon className="w-6 h-6 text-white" />}
                      </div>
                    );
                  })()}
                  <div>
                    <div className="text-lg font-bold text-white">
                      {architectureComponents.find(c => c.id === selectedURL)?.name}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      System Component
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedURL(null)}
                  className="p-1.5 rounded-lg bg-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-medium text-purple-400 mb-1.5">Overview</div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {architectureComponents.find(c => c.id === selectedURL)?.description}
                  </p>
                </div>
                <div>
                  <div className="text-xs font-medium text-pink-400 mb-1.5">Technical Details</div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {architectureComponents.find(c => c.id === selectedURL)?.details}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default URLShortenerSystemDesignLab;

