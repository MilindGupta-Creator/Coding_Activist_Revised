"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {cn} from "../../lib/utils";

export const Spotlight = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
    >
      {isMounted && (
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.current.x}px ${mousePosition.current.y}px, rgba(94, 84, 142, 0.15), transparent 40%)`,
          }}
        />
      )}
      {children}
    </div>
  );
};