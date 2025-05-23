
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryBarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 200;
    const currentScroll = scrollContainerRef.current.scrollLeft;
    
    scrollContainerRef.current.scrollTo({
      left: direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative bg-neutral-light shadow-sm">
      <div className="flex items-center">
        {/* Left scroll button */}
        <button 
          onClick={() => scroll('left')}
          className="flex-shrink-0 px-2 py-4 bg-gradient-to-r from-neutral-light to-transparent z-10"
        >
          <ChevronLeft size={20} className="text-gray-500" />
        </button>
        
        {/* Scrollable container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide py-4 px-2 scroll-smooth hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`category-button mr-2 ${
                activeCategory === category ? 'active' : ''
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Right scroll button */}
        <button 
          onClick={() => scroll('right')}
          className="flex-shrink-0 px-2 py-4 bg-gradient-to-l from-neutral-light to-transparent z-10"
        >
          <ChevronRight size={20} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default CategoryBar;
