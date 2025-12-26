import { useState } from 'react';

export const useChaosMode = () => {
  const [isExploding, setIsExploding] = useState(false);
  const [crackBurst, setCrackBurst] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const triggerChaos = () => {
    const html = document.documentElement;
    
    // Add chaos class for earthquake effect
    html.classList.add('chaos-mode');
    setIsExploding(true);
    setCrackBurst(true);
    
    // Update count and check for confetti milestone
    setClickCount(prev => {
      const newCount = prev + 1;
      // Show confetti on milestones
      if (newCount % 10 === 0) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 1500);
      }
      return newCount;
    });
    
    // Remove after the mayhem
    setTimeout(() => setCrackBurst(false), 1200);
    
    setTimeout(() => {
      html.classList.remove('chaos-mode');
      setIsExploding(false);
    }, 800);
  };

  return {
    triggerChaos,
    isExploding,
    crackBurst,
    showConfetti,
    clickCount,
  };
};

