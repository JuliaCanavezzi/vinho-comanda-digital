
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CategoryMenu from '../components/CategoryMenu';
import DishList from '../components/DishList';
import { Dish } from '../components/DishList';
import { Search } from 'lucide-react';
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
  {
    id: '7',
    name: 'Caipirinha de Limão',
    description: 'Clássica bebida brasileira com cachaça, limão e açúcar',
    price: 18.90,
    image: 'https://images.unsplash.com/photo-1541546339599-ecdbfcf77378',
    categoryId: 'bebidas',
  },
  {
    id: '8',
    name: 'Tiramisu',
    description: 'Sobremesa italiana com camadas de biscoito, café e creme de mascarpone',
    price: 26.90,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9',
    categoryId: 'sobremesa',
  },
  {
    id: '9',
    name: 'Combo Família',
    description: '2 pratos principais, 2 entradas e 1 sobremesa grande para compartilhar',
    price: 159.90,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
    categoryId: 'combos',
  },
  {
    id: '10',
    name: 'Promoção do Chef',
    description: 'Prato especial do dia com 20% de desconto',
    price: 42.90,
    image: 'https://images.unsplash.com/photo-1546241072-48010ad2862c',
    categoryId: 'promocoes',
  },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('entrada');
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [searchQuery, setSearchQuery] = useState('');
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

  // Filter dishes based on search query and selected category
  const filteredDishes = sampleDishes.filter(dish => {
    const matchesSearch = searchQuery === '' || 
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || dish.categoryId === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const cartItemCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      {/* Header */}
      <Header cartItemCount={cartItemCount} />
      
      {/* Search Bar */}
      <div className="px-4 py-4 bg-white shadow-sm">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Pesquise aqui..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7b1c2d] focus:border-[#7b1c2d] text-sm"
          />
        </div>
      </div>
      
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
            dishes={filteredDishes}
            selectedCategory={selectedCategory}
            onQuantityChange={handleQuantityChange}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
