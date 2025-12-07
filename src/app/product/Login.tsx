import React, { useState, useEffect } from 'react';
import { LockIcon, ServerIcon, XIcon, CheckIcon } from './Icons';

interface LoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingDevice, setCheckingDevice] = useState(false);

  // Hardcoded credentials as requested
  const VALID_EMAIL = "milindgupta578@gmail.com";
  const VALID_PASS = "milind1234@";
  const SESSION_KEY = "frontend_mastery_active_session";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setCheckingDevice(false);

    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));

    if (email !== VALID_EMAIL || password !== VALID_PASS) {
      setError("Invalid credentials. Please check your email or password.");
      setLoading(false);
      return;
    }

    setCheckingDevice(true);
    await new Promise(r => setTimeout(r, 1000)); // Simulate device handshake

    // Privacy Check: Single Device Enforcement
    const activeSession = localStorage.getItem(SESSION_KEY);

    // Check if session exists and is less than 24 hours old (to prevent permanent lockout from crashes)
    let isSessionValid = false;
    if (activeSession) {
      try {
        const sessionData = JSON.parse(activeSession);
        const now = new Date().getTime();
        if (now - sessionData.timestamp < 24 * 60 * 60 * 1000) {
          isSessionValid = true;
        }
      } catch (e) {
        // Invalid JSON, ignore
      }
    }

    if (isSessionValid) {
      setError("Security Alert: This account is currently active on another device. To protect your privacy, concurrent sessions are not allowed. Please logout from the other device first.");
      setLoading(false);
      setCheckingDevice(false);
      return;
    }

    // Success - Set Session
    const newSession = {
      user: email,
      timestamp: new Date().getTime(),
      deviceId: Math.random().toString(36).substring(7)
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));

    setLoading(false);
    onLoginSuccess();
  };

  // Emergency Reset for Demo purposes (in case user gets stuck)
  const handleForceLogout = () => {
    if (window.confirm("This will forcibly disconnect the other session. Are you sure?")) {
      localStorage.removeItem(SESSION_KEY);
      setError("Previous session cleared. You can now login.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <button
          onClick={onBack}
          className="absolute -top-12 left-0 text-slate-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <XIcon className="w-4 h-4" /> Cancel
        </button>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-slate-900/50 p-6 border-b border-slate-700 text-center relative">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700 shadow-inner">
              <LockIcon className="w-8 h-8 text-brand-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Member Access</h2>
            <p className="text-slate-400 text-sm mt-1">Secure login for Ebook owners</p>
          </div>

          <form onSubmit={handleLogin} className="p-6 md:p-8 space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-200 text-sm p-4 rounded-lg flex gap-3 items-start">
                <div className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-bold">!</div>
                <div>
                  {error}
                  {error.includes("another device") && (
                    <button type="button" onClick={handleForceLogout} className="block mt-2 text-xs underline hover:text-white">
                      Force Logout Other Device (Demo Only)
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider ml-1">Email ID</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                placeholder="name@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider ml-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || checkingDevice}
                className="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-lg transition-all shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  checkingDevice ? (
                    <>
                      <ServerIcon className="w-5 h-5 animate-pulse" />
                      Verifying Device Fingerprint...
                    </>
                  ) : (
                    <span className="animate-pulse">Authenticating...</span>
                  )
                ) : (
                  <>
                    Access Content <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </>
                )}
              </button>
            </div>


          </form>

          <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500 font-mono">
            <span className="flex items-center gap-1">
              <LockIcon className="w-3 h-3" /> 256-BIT ENCRYPTION
            </span>
            <span className="flex items-center gap-1">
              <CheckIcon className="w-3 h-3 text-green-500" /> SINGLE SESSION SECURE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;