"use client";
import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{ h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    // Obfuscated key to make it less obvious in localStorage
    const STORAGE_KEY = '_f_m_e_t'; 
    const DURATION = 4 * 60 * 60 * 1000; // 4 hours in ms

    let endTime = localStorage.getItem(STORAGE_KEY);

    if (!endTime) {
      // Add a random offset of up to 15 minutes to make it unique per user
      const randomOffset = Math.floor(Math.random() * 15 * 60 * 1000);
      const newEndTime = Date.now() + DURATION + randomOffset;
      localStorage.setItem(STORAGE_KEY, newEndTime.toString());
      endTime = newEndTime.toString();
    }

    const targetTime = parseInt(endTime, 10);

    const calculateTime = () => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        // If expired, we could either stop or reset to a new "tomorrow" date
        // For urgency, let's keep it at 0 or show a very small time
        return { h: 0, m: 0, s: 0 };
      }

      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / 1000 / 60) % 60);
      const s = Math.floor((difference / 1000) % 60);

      return { h, m, s };
    };

    setTimeLeft(calculateTime());

    const timer = setInterval(() => {
      const updatedTime = calculateTime();
      setTimeLeft(updatedTime);
      if (updatedTime.h === 0 && updatedTime.m === 0 && updatedTime.s === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null;

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs">
      <div className="flex flex-col items-center">
        <span className="bg-white/10 px-1.5 py-0.5 rounded border border-white/20 text-white font-bold">
          {format(timeLeft.h)}
        </span>
      </div>
      <span className="text-white/50 animate-pulse">:</span>
      <div className="flex flex-col items-center">
        <span className="bg-white/10 px-1.5 py-0.5 rounded border border-white/20 text-white font-bold">
          {format(timeLeft.m)}
        </span>
      </div>
      <span className="text-white/50 animate-pulse">:</span>
      <div className="flex flex-col items-center">
        <span className="bg-white/10 px-1.5 py-0.5 rounded border border-white/20 text-white font-bold">
          {format(timeLeft.s)}
        </span>
      </div>
    </div>
  );
};

export default CountdownTimer;
