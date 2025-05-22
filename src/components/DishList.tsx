
import React from 'react';
import DishCard from './DishCard';

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
}

interface DishListProps {
  dishes: Dish[];
  selectedCategory: string;
  onQuantityChange: (id: string, quantity: number) => void;
}

const DishList: React.FC<DishListProps> = ({ 
  dishes, 
  selectedCategory,
  onQuantityChange 
}) => {
  // Filter dishes based on selected category
  const filteredDishes = selectedCategory === 'all' 
    ? dishes 
    : dishes.filter(dish => dish.categoryId === selectedCategory);

  return (
    <div className="px-4 py-4">
      <h2 className="text-lg font-playfair font-medium mb-3 text-gray-800">
        {selectedCategory === 'all' ? 'Todos os pratos' : 'Pratos selecionados'}
      </h2>
      
      {filteredDishes.length > 0 ? (
        <div className="space-y-3">
          {filteredDishes.map((dish) => (
            <DishCard
              key={dish.id}
              id={dish.id}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              image={dish.image}
              onQuantityChange={onQuantityChange}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Nenhum prato encontrado nesta categoria.
        </div>
      )}
    </div>
  );
};

export default DishList;
