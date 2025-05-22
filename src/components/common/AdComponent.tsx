import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

interface AdComponentProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'in-article' | 'in-feed';
  className?: string;
  lazyLoad?: boolean;
}

const AdComponent = ({ adSlot, adFormat = 'auto', className = '', lazyLoad = true }: AdComponentProps) => {
  const [isVisible, setIsVisible] = useState(!lazyLoad);
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lazyLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, [lazyLoad]);

  return (
    <div ref={adRef} className={`ad-container p-4 border border-gray-700 rounded-lg ${className}`}>
      <div className="text-sm text-gray-400 mb-2">Advertisement</div>
      {isVisible && (
        <>
          <ins
            className="adsbygoogle"
            style={{
              display: 'block',
              textAlign: 'center',
              margin: '0 auto',
              ...(adFormat === 'in-article' && {
                display: 'inline-block',
                width: '100%',
                height: '100%',
              }),
              ...(adFormat === 'in-feed' && {
                display: 'block',
                width: '100%',
                height: 'auto',
              }),
            }}
            data-ad-client="ca-pub-2570738441831963"
            data-ad-slot={adSlot}
            data-ad-format={adFormat}
            data-full-width-responsive="true"
          />
          <Script id={`adsense-init-${adSlot}`}>
            {`(adsbygoogle = window.adsbygoogle || []).push({});`}
          </Script>
        </>
      )}
    </div>
  );
};

export default AdComponent; 