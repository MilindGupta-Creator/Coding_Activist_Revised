"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

export default function AdContainer() {
  const pathname = usePathname();
  const showAd = pathname !== "/jobs";

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