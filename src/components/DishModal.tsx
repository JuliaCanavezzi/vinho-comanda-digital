
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Minus } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
}

interface DishModalProps {
  isOpen: boolean;
  onClose: () => void;
  dish: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    ingredients?: Ingredient[];
    category?: string;
  } | null;
  onAddToCart: (dishId: string, quantity: number, removedIngredients: string[]) => void;
}

const DishModal: React.FC<DishModalProps> = ({
  isOpen,
  onClose,
  dish,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);

  // Reset state when dish changes or modal opens
  React.useEffect(() => {
    if (isOpen && dish) {
      setQuantity(1);
      setRemovedIngredients([]);
    }
  }, [isOpen, dish]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleIngredientToggle = (ingredientId: string) => {
    setRemovedIngredients(prev => {
      if (prev.includes(ingredientId)) {
        return prev.filter(id => id !== ingredientId);
      } else {
        return [...prev, ingredientId];
      }
    });
  };

  const handleAddToCart = () => {
    if (dish) {
      onAddToCart(dish.id, quantity, removedIngredients);
      onClose();
    }
  };

  if (!dish) return null;

  // Format price to Brazilian Real (R$)
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(dish.price);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{dish.name}</DialogTitle>
          <DialogClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        {/* Dish Image - Increased size */}
        <div className="w-full h-64 sm:h-80 bg-gray-100 mb-4 overflow-hidden rounded-md">
          <img 
            src={dish.image} 
            alt={dish.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Dish Details */}
        <div className="mb-4">
          <p className="text-gray-700 mb-2">{dish.description}</p>
          <p className="text-lg font-medium text-[#7b1c2d]">{formattedPrice}</p>
        </div>
        
        {/* Ingredients Selection */}
        {dish.ingredients && dish.ingredients.length > 0 && (
          <div className="mb-6">
            <h3 className="font-medium mb-2">Select items to remove:</h3>
            <div className="space-y-2">
              {dish.ingredients.map((ingredient) => (
                <div key={ingredient.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`ingredient-${ingredient.id}`}
                    checked={!removedIngredients.includes(ingredient.id)}
                    onCheckedChange={() => handleIngredientToggle(ingredient.id)}
                  />
                  <label 
                    htmlFor={`ingredient-${ingredient.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {ingredient.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Quantity Control */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-medium">Quantity:</span>
          <div className="flex items-center">
            <button 
              onClick={handleDecrement}
              className={`h-8 w-8 rounded-full flex items-center justify-center ${quantity > 1 ? 'bg-[#7b1c2d] text-white' : 'bg-gray-200 text-gray-400'}`} 
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="mx-3 w-6 text-center font-medium">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="h-8 w-8 rounded-full bg-[#7b1c2d] text-white flex items-center justify-center"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <Button 
          onClick={handleAddToCart} 
          className="w-full bg-[#7b1c2d] hover:bg-[#6B0F1A] text-white"
        >
          Add to Cart
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DishModal;
