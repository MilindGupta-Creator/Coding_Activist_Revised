"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Filter } from "lucide-react";

type FilterOption = {
  id: string;
  label: string;
  options: { value: string; label: string }[];
};

export const FilterDropdown = ({
  filters,
  onFilterChange,
}: {
  filters: FilterOption[];
  onFilterChange: (filterId: string, value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (filterId: string, value: string) => {
    const newFilters = { ...selectedFilters, [filterId]: value };
    setSelectedFilters(newFilters);
    onFilterChange(filterId, value);
  };

  const clearFilters = () => {
    setSelectedFilters({});
    filters.forEach((filter) => {
      onFilterChange(filter.id, "all");
    });
  };

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).filter((value) => value !== "all").length;
  };

  return (
    <div className="relative mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
        {getActiveFilterCount() > 0 && (
          <span className="inline-flex items-center justify-center w-5 h-5 ml-1 text-xs font-semibold text-white bg-violet-600 rounded-full">
            {getActiveFilterCount()}
          </span>
        )}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-2 w-72 bg-gray-900 border border-gray-800 rounded-lg shadow-xl"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-white">Filter Jobs</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-violet-400 hover:text-violet-300"
                >
                  Clear all
                </button>
              </div>

              <div className="space-y-4">
                {filters.map((filter) => (
                  <div key={filter.id} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      {filter.label}
                    </label>
                    <select
                      value={selectedFilters[filter.id] || "all"}
                      onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                      {filter.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-800">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md transition-colors duration-200"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};