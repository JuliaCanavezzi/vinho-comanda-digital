
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CategoryMenu from '../components/CategoryMenu';
import DishList from '../components/DishList';
import { Dish } from '../components/DishList';
import { useToast } from "@/components/ui/use-toast";

// Sample data
const categories = [
  { id: 'entrada', name: 'Entrada' },
  { id: 'principal', name: 'Principal' },
  { id: 'sobremesa', name: 'Sobremesa' },
  { id: 'bebidas', name: 'Bebidas' },
  { id: 'combos', name: 'Combos' },
  { id: 'promocoes', name: 'Promoções' },
];

const sampleDishes: Dish[] = [
  {
    id: '1',
    name: 'Bruschetta Italiana',
    description: 'Pão italiano com tomate, manjericão, alho e azeite extra virgem',
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f',
    categoryId: 'entrada',
  },
  {
    id: '2',
    name: 'Carpaccio de Carne',
    description: 'Finas fatias de carne crua temperadas com molho especial da casa',
    price: 32.90,
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804',
    categoryId: 'entrada',
  },
  {
    id: '3',
    name: 'Risoto de Funghi',
    description: 'Arroz arbóreo com cogumelos frescos, vinho branco e parmesão',
    price: 58.90,
    image: 'https://images.unsplash.com/photo-1673546126067-1f58ca6147a0',
    categoryId: 'principal',
  },
  {
    id: '4',
    name: 'Filé Mignon ao Molho Madeira',
    description: 'Filé mignon grelhado com molho madeira, acompanha batatas e legumes',
    price: 64.90,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cee6a6',
    categoryId: 'principal',
  },
  {
    id: '5',
    name: 'Cheesecake de Frutas Vermelhas',
    description: 'Base de biscoito com creme de queijo e calda de frutas vermelhas',
    price: 22.90,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad',
    categoryId: 'sobremesa',
  },
  {
    id: '6',
    name: 'Vinho Tinto Cabernet Sauvignon',
    description: 'Vinho tinto seco com notas de frutas vermelhas e especiarias',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3',
    categoryId: 'bebidas',
  },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('entrada');
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const { toast } = useToast();

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setCart(prev => {
      const updated = { ...prev, [id]: quantity };
      if (quantity === 0) {
        delete updated[id];
      }
      return updated;
    });
    
    // Show toast when adding item to cart
    if (quantity > 0) {
      const dish = sampleDishes.find(dish => dish.id === id);
      toast({
        title: quantity === 1 ? "Item adicionado" : "Quantidade atualizada",
        description: dish ? dish.name : "Item",
        duration: 2000,
      });
    }
  };

  const cartItemCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      {/* Header with search bar */}
      <Header cartItemCount={cartItemCount} />
      
      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Category menu */}
        <CategoryMenu 
          categories={categories} 
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
        
        {/* Dish list */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <DishList 
            dishes={sampleDishes}
            selectedCategory={selectedCategory}
            onQuantityChange={handleQuantityChange}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
