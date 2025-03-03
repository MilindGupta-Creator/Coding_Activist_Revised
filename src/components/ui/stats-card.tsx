"use client";

import React from "react";
import { motion } from "framer-motion";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string | number;
    positive: boolean;
  };
};

export const StatsCard = ({ title, value, icon, change }: StatCardProps) => {
  return (
    <motion.div
      className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-violet-500 transition-all duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
          {change && (
            <p
              className={`text-sm mt-2 flex items-center ${
                change.positive ? "text-green-500" : "text-red-500"
              }`}
            >
              {change.positive ? "↑" : "↓"} {change.value}
              <span className="text-gray-400 ml-1">vs last week</span>
            </p>
          )}
        </div>
        <div className="p-3 bg-gray-800 rounded-lg">{icon}</div>
      </div>
    </motion.div>
  );
};