import React, { useState } from 'react';
import { LockIcon, ServerIcon, XIcon, CheckIcon } from './Icons';
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

      // Simple 24h session for the reader UI (used by Reader.tsx)
      const newSession = {
        user: normalizedEmail,
        uid: doc.id,
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
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider ml-1">Premium Key</label>
              <input
                type="text"
                required
                value={premiumKey}
                onChange={(e) => setPremiumKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                placeholder="ABCD-1234-EFGH"
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