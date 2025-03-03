"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {cn} from "../../lib/utils";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-row items-center justify-center py-4">
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.div
            className="absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 duration-300 bg-gradient-to-r from-violet-600 to-indigo-600 blur-sm"
            style={{
            //   layoutId: `tooltip-${idx}`,
              zIndex: 0,
            }}
          ></motion.div>
          <div className="relative z-10 mx-1">
            <img
              src={item.image}
              alt={item.name}
              className="object-cover rounded-full h-14 w-14 border-2 border-white group-hover:border-violet-500 transition-all duration-300"
            />
            {hoveredIndex === idx && (
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mt-2 p-2 bg-black border border-gray-800 rounded-lg text-white text-sm shadow-xl"
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 15,
                }}
              >
                <div className="flex flex-col items-center justify-center space-y-1">
                  <p className="font-bold text-sm">{item.name}</p>
                  <p className="text-xs text-gray-300">{item.designation}</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-2 h-2 rotate-45 bg-black border-r border-b border-gray-800"></div>
              </motion.div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};