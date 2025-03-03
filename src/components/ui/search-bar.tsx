"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8">
      <motion.form
        onSubmit={handleSearch}
        className={`relative flex items-center w-full rounded-full transition-all duration-300 ${
          isFocused ? "bg-white shadow-lg" : "bg-gray-800"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Search
          className={`absolute left-4 w-5 h-5 ${
            isFocused ? "text-gray-800" : "text-gray-400"
          }`}
        />
        <input
          type="text"
          placeholder="Search for jobs, companies, or skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full py-3 pl-12 pr-12 rounded-full outline-none ${
            isFocused
              ? "text-gray-900 bg-white"
              : "text-white bg-gray-800 placeholder:text-gray-400"
          }`}
        />
        <AnimatePresence>
          {searchQuery && (
            <motion.button
              type="button"
              onClick={clearSearch}
              className="absolute right-16 text-gray-500 hover:text-gray-700"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
        <button
          type="submit"
          className="absolute right-3 bg-violet-600 hover:bg-violet-700 text-white py-1.5 px-4 rounded-full transition-colors duration-300"
        >
          Search
        </button>
      </motion.form>
    </div>
  );
};