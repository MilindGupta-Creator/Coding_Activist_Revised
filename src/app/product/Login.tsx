import React, { useState } from 'react';
import { LockIcon, ServerIcon, XIcon, CheckIcon, BookIcon, CodeIcon, StarIcon } from './Icons';
import { db } from '@/firebase/firebase';

interface LoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onBack }) => {
  const [email, setEmail] = useState('');
  const [premiumKey, setPremiumKey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingDevice, setCheckingDevice] = useState(false);

  // Local session key used only for the product reader (watermark, expiry, etc.)
  const SESSION_KEY = "frontend_mastery_active_session";

  // Generate a unique session ID (device fingerprint)
  const generateSessionId = (): string => {
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';
    const screenInfo = typeof window !== 'undefined' 
      ? `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}` 
      : '';
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    // Create a hash-like string from device info
    const deviceFingerprint = btoa(`${userAgent}-${screenInfo}-${timestamp}-${random}`)
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, 32);
    return `${timestamp}-${deviceFingerprint}`;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPremiumKey = premiumKey.trim().toUpperCase();

    setLoading(true);
    setCheckingDevice(true);

    try {
      // Check Firestore premiumUsers collection for matching email + premiumKey
      const snapshot = await db
        .collection('premiumUsers')
        .where('email', '==', normalizedEmail)
        .where('premiumKey', '==', normalizedPremiumKey)
        .limit(1)
        .get();

      if (snapshot.empty) {
        throw new Error('INVALID_PREMIUM_KEY');
      }

      const doc = snapshot.docs[0];
      const data: any = doc.data();

      // Optional: verify expiryDate if present
      let isExpired = false;
      try {
        const expiry = data?.expiryDate;
        const expiryDate =
          expiry && typeof expiry.toDate === 'function'
            ? expiry.toDate()
            : null;
        if (expiryDate && expiryDate.getTime() < Date.now()) {
          isExpired = true;
        }
      } catch {
        // If expiry parsing fails, treat as non-expired to avoid locking valid users
      }

      if (isExpired) {
        throw new Error('PREMIUM_EXPIRED');
      }

      // Generate unique session ID for this device
      const newSessionId = generateSessionId();
      
      // Check if there's an active session on another device
      const existingSessionId = data?.activeSessionId;
      const lastLoginTimestamp = data?.lastLoginTimestamp;
      
      // If there's an existing session and it's recent (within last 24 hours), it means another device is logged in
      if (existingSessionId && lastLoginTimestamp) {
        const lastLogin = lastLoginTimestamp.toDate ? lastLoginTimestamp.toDate() : new Date(lastLoginTimestamp);
        const timeSinceLastLogin = Date.now() - lastLogin.getTime();
        const hours24 = 24 * 60 * 60 * 1000;
        
        // If last login was recent (within 24h), invalidate the old session
        if (timeSinceLastLogin < hours24) {
          // This will log out the other device when it checks its session
          // We proceed to create a new session for this device
        }
      }

      // Update Firestore with new active session
      await doc.ref.update({
        activeSessionId: newSessionId,
        lastLoginTimestamp: new Date(),
      });

      // Create local session with session ID
      const newSession = {
        user: normalizedEmail,
        uid: doc.id,
        sessionId: newSessionId,
        timestamp: Date.now(),
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
      }

      setLoading(false);
      setCheckingDevice(false);
      onLoginSuccess();
    } catch (err: any) {
      // Helpful logging during development (remove or comment out in production)
      console.error("Premium login error:", err);

      let message = "Login failed. Please check your email or premium key.";
      if (err?.message === 'INVALID_PREMIUM_KEY') {
        message = "Invalid email or premium key. Please double-check and try again.";
      } else if (err?.message === 'PREMIUM_EXPIRED') {
        message = "Your premium access has expired. Please renew to continue.";
      }
      setError(message);
      setLoading(false);
      setCheckingDevice(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Educational Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-blue-400/20 font-mono text-sm rotate-12">{"<code>"}</div>
        <div className="absolute top-40 right-20 text-purple-400/20 font-mono text-sm -rotate-12">{"function()"}</div>
        <div className="absolute bottom-32 left-20 text-brand-400/20 font-mono text-sm rotate-6">{"const learn"}</div>
        <div className="absolute bottom-20 right-10 text-blue-400/20 font-mono text-sm -rotate-6">{"= true"}</div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-gradient-to-br from-slate-800/90 via-slate-800/80 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with Educational Theme */}
          <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 p-8 border-b border-slate-700/50 text-center relative">
            <button
              onClick={onBack}
              className="absolute top-4 left-4 text-slate-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-all hover:bg-slate-700/50 px-3 py-1.5 rounded-lg z-10"
            >
              <XIcon className="w-4 h-4" /> Cancel
            </button>
            
            {/* Educational Icon with Animation */}
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30 transform hover:scale-105 transition-transform duration-300">
                <BookIcon className="w-10 h-10 text-white" />
              </div>
              {/* Decorative Stars */}
              <div className="absolute -top-2 -right-2">
                <StarIcon className="w-5 h-5 text-yellow-400 animate-pulse" />
              </div>
              <div className="absolute -bottom-1 -left-2">
                <CodeIcon className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2 bg-[length:200%_auto] animate-gradient">
              Welcome Back, Learner!
            </h2>
            <p className="text-slate-300 text-sm mt-1">Access your premium learning content</p>
            
            {/* Badge */}
            <div className="mt-4 inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5">
              <StarIcon className="w-4 h-4 text-yellow-400" />
              <span className="text-xs font-medium text-blue-300">Premium Member</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="p-6 md:p-8 space-y-6 bg-slate-900/30">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-200 text-sm p-4 rounded-xl flex gap-3 items-start backdrop-blur-sm">
                <div className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-xs">!</div>
                <div className="flex-1">
                  <p className="font-medium mb-1">Oops! Something went wrong</p>
                  <p className="text-red-300/80">{error}</p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-500 hover:border-slate-600"
                  placeholder="your.email@example.com"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                Premium Access Key
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={premiumKey}
                  onChange={(e) => setPremiumKey(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all placeholder:text-slate-500 hover:border-slate-600 font-mono tracking-wider"
                  placeholder="ABCD-1234-EFGH"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <LockIcon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <LockIcon className="w-3 h-3" />
                Your key is encrypted and secure
              </p>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || checkingDevice}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-500 hover:via-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 flex items-center justify-center gap-2 group transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  checkingDevice ? (
                    <>
                      <ServerIcon className="w-5 h-5 animate-pulse" />
                      <span>Verifying your device...</span>
                    </>
                  ) : (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Authenticating...</span>
                    </>
                  )
                ) : (
                  <>
                    <BookIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span>Continue Learning</span>
                    <span className="group-hover:translate-x-1 transition-transform text-xl">→</span>
                  </>
                )}
              </button>
            </div>

            {/* Help Text */}
            <div className="text-center pt-2">
              <p className="text-xs text-slate-500">
                Need help? <span className="text-blue-400 hover:text-blue-300 cursor-pointer underline">Contact support</span>
              </p>
            </div>
          </form>

          {/* Security Footer with Educational Touch */}
          <div className="px-6 py-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800/50">
            <div className="flex flex-wrap justify-center gap-4 items-center text-[10px] text-slate-500">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <LockIcon className="w-3.5 h-3.5 text-blue-400" /> 
                <span className="font-medium">256-BIT ENCRYPTION</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <CheckIcon className="w-3.5 h-3.5 text-green-400" /> 
                <span className="font-medium">SECURE SESSION</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <StarIcon className="w-3.5 h-3.5 text-yellow-400" /> 
                <span className="font-medium">PREMIUM ACCESS</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;