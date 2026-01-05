"use client";

import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mx-5">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full border border-gray-300 rounded-full py-3 pl-12 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button type="submit" className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <FiSearch className="text-gray-400 hover:text-gray-600" size={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
