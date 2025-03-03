"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {cn} from "../../lib/utils";

export const AnimatedCard = ({
  items,
  className,
  children,
}: {
  items: {
    id: number;
    content: React.ReactNode;
  }[];
  className?: string;
  children?: React.ReactNode;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition duration-500"
            style={{
              zIndex: 0,
            }}
          ></motion.div>
          <motion.div
            className="relative z-10 p-5 h-full rounded-xl bg-black border border-gray-800 group-hover:border-violet-500 transition duration-300"
            style={{
              transition: "all 0.2s ease-in-out",
              transform: hoveredIndex === idx ? "translateY(-5px)" : "none",
            }}
          >
            {item.content}
          </motion.div>
        </div>
      ))}
      {children}
    </div>
  );
};