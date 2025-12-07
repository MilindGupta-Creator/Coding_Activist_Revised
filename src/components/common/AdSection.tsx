"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function AdSection() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in (has active session)
  useEffect(() => {
    const checkSession = () => {
      const activeSession = localStorage.getItem("frontend_mastery_active_session");
      if (activeSession) {
        try {
          const sessionData = JSON.parse(activeSession);
          // Check if session is valid (less than 24 hours old)
          if (new Date().getTime() - sessionData.timestamp < 24 * 60 * 60 * 1000) {
            setIsLoggedIn(true);
            return;
          }
        } catch (e) {
          // Invalid session
        }
      }
      setIsLoggedIn(false);
    };

    checkSession();
    // Check periodically in case user logs in/out
    const interval = setInterval(checkSession, 1000);
    return () => clearInterval(interval);
  }, []);

  // Hide ad on /jobs, /product routes, or when user is logged in
  const showAd = pathname !== "/jobs" && pathname !== "/product" && !isLoggedIn;

  if (!showAd) return null;

  return (
    <div className="ad-container p-4 border border-gray-700 rounded-lg">
      <div className="text-sm text-gray-400 mb-2">Advertisement</div>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
          margin: '0 auto'
        }}
        data-ad-client="ca-pub-2570738441831963"
        data-ad-slot="5438523302"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <Script id="adsense-init">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </div>
  );
} 