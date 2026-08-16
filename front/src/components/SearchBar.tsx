import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar: React.FC = () => {
  return (
    <div className="relative w-full max-w-[384px] h-10">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <Search className="w-4 h-4" />
      </span>
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full h-full pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
      />
    </div>
  );
};