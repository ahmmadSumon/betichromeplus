import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto mx-5">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full border border-gray-300 rounded-full py-3 pl-12 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
    </div>
  );
};

export default SearchBar;
