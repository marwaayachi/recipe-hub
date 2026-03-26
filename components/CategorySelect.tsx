'use client';

import { Category } from "@/types/recipe";
import { FaSearch } from "react-icons/fa";


interface Props {
    categories: Category[];
    selectedCategory: number | "";
    onChange: (id: number | "") => void;
}

export default function CategorySelect({ categories, selectedCategory, onChange }: Props) {
  return (
    <div className="w-full max-w-6xl mx-auto mb-6 relative">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
        <FaSearch />
      </div>

      {/* Select */}
      <select
        className="
          w-full
          pl-10
          pr-4
          py-3
          border border-gray-300
          rounded-xl
          shadow-sm
          bg-white
          text-gray-800
          focus:outline-none
          focus:ring-2 focus:ring-red-400
          hover:border-gray-400
          transition-all
          duration-200
          cursor-pointer
          appearance-none
        "
        value={selectedCategory}
        onChange={(e) => {
          const val = e.target.value;
          onChange(val === "" ? "" : Number(val));
        }}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}