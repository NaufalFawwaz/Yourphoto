import React from 'react';
import { FILTERS } from '@/utils/filters';
import { useTheme } from '@/context/ThemeContext';

const FilterPanel = ({ show, panelRef, selectedFilter, onFilterSelect }) => {
  const { isDarkMode } = useTheme();
  
  if (!show) return null;

  return (
    <div 
      ref={panelRef}
      className={`absolute top-16 left-4 p-3 rounded-lg shadow-lg z-30 ${
        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
      }`}
    >
      <div className="grid grid-cols-2 gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter.name}
            onClick={() => onFilterSelect(filter.class)}
            className={`p-2 rounded text-xs transition-colors duration-200 ${
              selectedFilter === filter.class 
                ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                : (isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300')
            }`}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;