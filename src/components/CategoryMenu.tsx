
import React from 'react';

interface Category {
  id: string;
  name: string;
}

interface CategoryMenuProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  // Add safety check to prevent undefined error
  if (!categories || !Array.isArray(categories)) {
    return null;
  }

  return (
    <div className="w-full overflow-x-auto category-scroll py-3 px-4 bg-white border-b border-gray-100">
      <div className="flex space-x-4 min-w-max">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-[#7b1c2d] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;
