import { useEffect } from 'react';

/**
 * Custom hook for enhanced anti-screenshot / copy protection
 * On mobile screens, skips aggressive protection to avoid false positives
 */
export const useSecurityProtection = () => {
  useEffect(() => {
    // On small/mobile screens, skip aggressive anti-debug/screenshot logic
    // These heuristics can wrongly detect mobile browser UI as DevTools
    // and cause constant reloads/logouts. Desktop still keeps full protection.
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return;
    }

    // Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    
    // Prevent drag and drop
    const handleDragStart = (e: DragEvent) => e.preventDefault();
    const handleDrag = (e: DragEvent) => e.preventDefault();
    const handleDrop = (e: DragEvent) => e.preventDefault();
    
    // Prevent text selection
    const handleSelectStart = (e: Event) => e.preventDefault();
    
    // Prevent image dragging
    const handleImageDrag = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
      }
    };

    // Enhanced keyboard protection
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Print Screen, F12, and specific function keys that open DevTools
      const blockedFKeys = ['F12', 'F8']; // F8 can pause debugger, F12 opens DevTools
      if (
        e.key === 'PrintScreen' ||
        blockedFKeys.includes(e.key) ||
        // DevTools shortcuts
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.key === 'K' || e.key === 'i' || e.key === 'j' || e.key === 'c' || e.key === 'k')) ||
        (e.metaKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.key === 'K' || e.key === 'i' || e.key === 'j' || e.key === 'c' || e.key === 'k')) ||
        // Common shortcuts
        (e.ctrlKey && (e.key === 'p' || e.key === 's' || e.key === 'c' || e.key === 'u' || e.key === 'a' || e.key === 'P' || e.key === 'S' || e.key === 'C' || e.key === 'U' || e.key === 'A')) ||
        (e.metaKey && (e.key === 'p' || e.key === 's' || e.key === 'c' || e.key === 'u' || e.key === 'a' || e.key === 'P' || e.key === 'S' || e.key === 'C' || e.key === 'U' || e.key === 'A')) ||
        // Additional protection keys
        (e.ctrlKey && e.shiftKey && e.key === 'Delete') ||
        (e.ctrlKey && e.key === 'Insert')
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Prevent common debugging methods
    const blockConsole = () => {
      const noop = () => {};
      const methods = ['log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd', 'count', 'trace', 'profile', 'profileEnd', 'table', 'clear'];
      methods.forEach(method => {
        if (window.console && (window.console as any)[method]) {
          (window.console as any)[method] = noop;
        }
      });
    };

    // Anti-debugging: Prevent debugger statements
    const antiDebug = () => {
      return setInterval(() => {
        const start = performance.now();
        // eslint-disable-next-line no-debugger
        debugger;
        const end = performance.now();
        if (end - start > 100) {
          // DevTools is likely open (debugger pauses execution)
          window.location.reload();
        }
      }, 1000);
    };

    // Enhanced DevTools detection (multiple methods)
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      // Method 1: Window size difference
      if (widthThreshold || heightThreshold) {
        window.location.reload();
        return;
      }
      
      // Method 3: Debugger detection via timing
      const start = performance.now();
      // eslint-disable-next-line no-debugger
      debugger;
      const end = performance.now();
      if (end - start > 100) {
        window.location.reload();
      }
    };

    // Monitor DOM changes (detect if someone tries to modify content)
    const monitorDOMChanges = () => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          // If someone tries to remove protection or modify content
          if (mutation.type === 'childList' || mutation.type === 'attributes') {
            // Check if protection elements are being removed
            const styleElement = document.querySelector('style[data-protection]');
            if (!styleElement) {
              window.location.reload();
            }
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });

      return observer;
    };

    // Detect iframe embedding (prevent content theft via iframe)
    const detectIframe = () => {
      try {
        if (window.self !== window.top && window.top) {
          // Content is in an iframe - reload in top frame
          window.top.location.href = window.self.location.href;
        }
      } catch (e) {
        // Cross-origin iframe - block it
        window.location.href = '/';
      }
    };

    // Prevent common browser extensions that might extract content
    const detectExtensions = () => {
      // Check for common extension patterns
      const suspiciousPatterns = [
        'chrome-extension://',
        'moz-extension://',
        'safari-extension://'
      ];
      
      // Monitor for extension injection
      setInterval(() => {
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
          if (script.src && suspiciousPatterns.some(pattern => script.src.includes(pattern))) {
            window.location.reload();
          }
        });
      }, 2000);
    };

    // Screenshot Detection and Protection
    const detectScreenshots = () => {
      // Method 1: Detect visibility changes (window loses focus during screenshot)
      let visibilityChangeCount = 0;
      const handleVisibilityChange = () => {
        if (document.hidden) {
          visibilityChangeCount++;
          if (visibilityChangeCount > 2) {
            // Multiple rapid visibility changes might indicate screenshot attempt
            window.location.reload();
          }
          setTimeout(() => {
            visibilityChangeCount = Math.max(0, visibilityChangeCount - 1);
          }, 1000);
        }
      };

      // Method 2: Detect window blur (common during screenshots)
      let blurCount = 0;
      const handleBlur = () => {
        blurCount++;
        if (blurCount > 3) {
          window.location.reload();
        }
        setTimeout(() => {
          blurCount = Math.max(0, blurCount - 1);
        }, 2000);
      };

      // Method 3: Monitor clipboard for screenshot pastes
      const handlePaste = (e: ClipboardEvent) => {
        const items = e.clipboardData?.items;
        if (items) {
          for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
              // Screenshot detected in clipboard
              window.location.reload();
            }
          }
        }
      };

      // Method 4: Detect screen capture API usage
      const detectScreenCapture = () => {
        try {
          // Check if getDisplayMedia is being called (screen recording)
          if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
            const originalGetDisplayMedia = navigator.mediaDevices.getDisplayMedia;
            (navigator.mediaDevices as any).getDisplayMedia = function() {
              window.location.reload();
              return Promise.reject(new Error('Screen capture blocked'));
            };
          }
        } catch (e) {
          // Ignore
        }
      };

      // Method 5: Monitor for screenshot keyboard shortcuts
      const handleScreenshotShortcuts = (e: KeyboardEvent) => {
        // Windows: Win+Shift+S, Win+PrintScreen, PrintScreen
        // Mac: Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5
        const isWindowsKey = e.getModifierState('Meta') || e.getModifierState('OS');
        const isPrintScreen = e.key === 'PrintScreen' || e.code === 'PrintScreen';
        
        if (
          isPrintScreen ||
          (isWindowsKey && isPrintScreen) ||
          (isWindowsKey && e.shiftKey && (e.key === 'S' || e.key === 's')) ||
          ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5'))
        ) {
          // Screenshot shortcut detected - blur content and add stronger watermark
          document.body.style.filter = 'blur(15px)';
          // Increase watermark opacity temporarily
          const watermarks = document.querySelectorAll('[data-watermark]');
          watermarks.forEach((wm: any) => {
            if (wm) wm.style.opacity = '0.15';
          });
          setTimeout(() => {
            window.location.reload();
          }, 300);
        }
      };

      // Method 6: Detect canvas read attempts (screenshot tools often use canvas)
      const detectCanvasRead = () => {
        const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
        const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;
        
        HTMLCanvasElement.prototype.toDataURL = function() {
          window.location.reload();
          return originalToDataURL.apply(this, arguments as any);
        };
        
        CanvasRenderingContext2D.prototype.getImageData = function() {
          window.location.reload();
          return originalGetImageData.apply(this, arguments as any);
        };
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('blur', handleBlur);
      document.addEventListener('paste', handlePaste);
      document.addEventListener('keydown', handleScreenshotShortcuts);
      
      detectScreenCapture();
      detectCanvasRead();

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('blur', handleBlur);
        document.removeEventListener('paste', handlePaste);
        document.removeEventListener('keydown', handleScreenshotShortcuts);
      };
    };

    // Apply CSS to prevent selection with protection marker
    const style = document.createElement('style');
    style.setAttribute('data-protection', 'true');
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      img {
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
        pointer-events: none !important;
      }
      /* Prevent content extraction via CSS */
      body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999999;
        pointer-events: none;
        background: transparent;
      }
      /* Make watermarks more visible in screenshots */
      [data-watermark] {
        text-shadow: 2px 2px 4px rgba(0,0,0,0.8), -2px -2px 4px rgba(0,0,0,0.8);
        filter: contrast(1.2) brightness(1.1);
      }
    `;
    document.head.appendChild(style);

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('drag', handleDrag);
    document.addEventListener('drop', handleDrop);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleImageDrag);
    
    // Block console methods
    blockConsole();
    
    // Start anti-debugging protection
    const antiDebugInterval = antiDebug();
    
    // Enhanced protections (keep lightweight to avoid breaking network/Firebase)
    detectIframe();
    detectExtensions();
    const screenshotCleanupFn = detectScreenshots();
    const domObserver = monitorDOMChanges();
    
    // Monitor for DevTools (check periodically with multiple methods)
    const devToolsInterval = setInterval(detectDevTools, 300);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('drag', handleDrag);
      document.removeEventListener('drop', handleDrop);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleImageDrag);
      clearInterval(devToolsInterval);
      clearInterval(antiDebugInterval);
      domObserver.disconnect();
      if (screenshotCleanupFn) screenshotCleanupFn();
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);
};

