
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
  onDishClick: (id: string) => void;
}

const DishList: React.FC<DishListProps> = ({ 
  dishes, 
  selectedCategory,
  onQuantityChange,
  onDishClick
}) => {
  // Get category name for heading
  const getCategoryName = () => {
    switch(selectedCategory) {
      case 'entrada': return 'Entradas';
      case 'principal': return 'Pratos Principais';
      case 'sobremesa': return 'Sobremesas';
      case 'bebidas': return 'Bebidas';
      case 'combos': return 'Combos';
      case 'promocoes': return 'Promoções';
      default: return 'Todos os Pratos';
    }
  };
  
  return (
    <div className="px-4 py-4">
      <h2 className="text-lg font-playfair font-medium mb-3 text-gray-800">
        {dishes.length > 0 ? getCategoryName() : 'Resultados da Pesquisa'}
      </h2>
      
      {dishes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dishes.map((dish) => (
            <DishCard
              key={dish.id}
              id={dish.id}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              image={dish.image}
              onQuantityChange={onQuantityChange}
              onDishClick={onDishClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Nenhum prato encontrado. Tente outro termo de pesquisa ou categoria.
        </div>
      )}
    </div>
  );
};

export default DishList;
