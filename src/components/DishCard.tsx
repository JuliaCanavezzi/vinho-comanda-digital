import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
interface DishProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  onQuantityChange: (id: string, quantity: number) => void;
  onDishClick: (id: string) => void;
}
const DishCard: React.FC<DishProps> = ({
  id,
  name,
  description,
  price,
  image,
  onQuantityChange,
  onDishClick
}) => {
  const [quantity, setQuantity] = useState(0);
  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(id, newQuantity);
    }
  };
  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(id, newQuantity);
  };
  const handleCardClick = () => {
    onDishClick(id);
  };

  // Format price to Brazilian Real (R$)
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
  return <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow h-40 cursor-pointer" onClick={handleCardClick}>
      {/* Dish Image - 40% width, full height */}
      <div className="w-2/5 h-full bg-gray-200 flex-shrink-0">
        <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      
      {/* Dish Info - 60% width */}
      <div className="flex-1 p-4 flex flex-col justify-between h-full">
        <div>
          <h3 className="font-cursive text-lg font-semibold">{name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">{description}</p>
        </div>
        
        {/* Price and Quantity Controls */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-[#7b1c2d] text-lg">{formattedPrice}</span>
          
          <div className="flex items-center">
            <button onClick={handleDecrement} className={`h-8 w-8 rounded-full flex items-center justify-center ${quantity > 0 ? 'bg-[#7b1c2d] text-white' : 'bg-gray-200 text-gray-400'}`} disabled={quantity === 0} aria-label="Diminuir quantidade">
              <Minus className="h-4 w-4" />
            </button>
            <span className="mx-2 w-6 text-center font-medium">{quantity}</span>
            <button onClick={handleIncrement} aria-label="Aumentar quantidade" className="h-8 w-8 rounded-full text-white flex items-center justify-center bg-[#4e0b1b]">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default DishCard;