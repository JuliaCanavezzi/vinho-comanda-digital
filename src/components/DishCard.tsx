
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface DishProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  onQuantityChange: (id: string, quantity: number) => void;
}

const DishCard: React.FC<DishProps> = ({
  id,
  name,
  description,
  price,
  image,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(0);

  const handleDecrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(id, newQuantity);
    }
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(id, newQuantity);
  };

  // Format price to Brazilian Real (R$)
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);

  return (
    <div className="flex border border-gray-200 rounded-lg overflow-hidden mb-3 bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Dish Image */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-200 flex-shrink-0">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Dish Info */}
      <div className="flex-1 p-3 flex flex-col">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-1">{name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        </div>
        
        {/* Price and Quantity Controls */}
        <div className="flex items-center justify-between mt-2">
          <span className="font-medium text-wine">{formattedPrice}</span>
          
          <div className="flex items-center">
            <button
              onClick={handleDecrement}
              className={`h-7 w-7 rounded-full flex items-center justify-center ${
                quantity > 0 ? 'bg-wine text-white' : 'bg-gray-200 text-gray-400'
              }`}
              disabled={quantity === 0}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="mx-2 w-6 text-center">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="h-7 w-7 rounded-full bg-wine text-white flex items-center justify-center"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
