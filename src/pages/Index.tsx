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
  // Entradas
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
    name: 'Calamari Fritto',
    description: 'Lulas empanadas e fritas, servidas com molho aioli',
    price: 36.90,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0',
    categoryId: 'entrada',
  },
  {
    id: '11',
    name: 'Antipasti Misto',
    description: 'Seleção de queijos, embutidos, azeitonas e grissini',
    price: 48.90,
    image: 'https://images.unsplash.com/photo-1626200419199-391ae4a09c75',
    categoryId: 'entrada',
  },
  {
    id: '12',
    name: 'Salada Caprese',
    description: 'Tomate, mozzarella de búfala fresca e manjericão',
    price: 29.90,
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804',
    categoryId: 'entrada',
  },
  
  // Pratos Principais
  {
    id: '4',
    name: 'Risoto de Funghi',
    description: 'Arroz arbóreo com cogumelos frescos, vinho branco e parmesão',
    price: 58.90,
    image: 'https://images.unsplash.com/photo-1673546126067-1f58ca6147a0',
    categoryId: 'principal',
  },
  {
    id: '5',
    name: 'Filé Mignon ao Molho Madeira',
    description: 'Filé mignon grelhado com molho madeira, acompanha batatas e legumes',
    price: 64.90,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cee6a6',
    categoryId: 'principal',
  },
  {
    id: '13',
    name: 'Linguine al Mare',
    description: 'Massa fresca com frutos do mar, tomate e ervas aromáticas',
    price: 68.90,
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8',
    categoryId: 'principal',
  },
  {
    id: '14',
    name: 'Salmão Grelhado',
    description: 'Salmão fresco grelhado, com risoto de aspargos e molho de limão',
    price: 72.90,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2',
    categoryId: 'principal',
  },
  {
    id: '15',
    name: 'Ossobuco alla Milanese',
    description: 'Ossobuco cozido lentamente, servido com risoto de açafrão',
    price: 78.90,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
    categoryId: 'principal',
  },
  
  // Sobremesas
  {
    id: '6',
    name: 'Cheesecake de Frutas Vermelhas',
    description: 'Base de biscoito com creme de queijo e calda de frutas vermelhas',
    price: 22.90,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad',
    categoryId: 'sobremesa',
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
    id: '16',
    name: 'Panna Cotta',
    description: 'Creme italiano de baunilha com calda de frutas vermelhas',
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777',
    categoryId: 'sobremesa',
  },
  {
    id: '17',
    name: 'Sorvete Gourmet',
    description: 'Trio de sorvetes artesanais com calda e frutas frescas',
    price: 18.90,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
    categoryId: 'sobremesa',
  },
  
  // Bebidas
  {
    id: '7',
    name: 'Vinho Tinto Cabernet Sauvignon',
    description: 'Vinho tinto seco com notas de frutas vermelhas e especiarias',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3',
    categoryId: 'bebidas',
  },
  {
    id: '9',
    name: 'Caipirinha de Limão',
    description: 'Clássica bebida brasileira com cachaça, limão e açúcar',
    price: 18.90,
    image: 'https://images.unsplash.com/photo-1541546339599-ecdbfcf77378',
    categoryId: 'bebidas',
  },
  {
    id: '18',
    name: 'Mojito',
    description: 'Coquetel refrescante com rum, hortelã, limão e água com gás',
    price: 22.90,
    image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602',
    categoryId: 'bebidas',
  },
  {
    id: '19',
    name: 'Suco Natural',
    description: 'Diversos sabores de frutas frescas: laranja, abacaxi, morango',
    price: 14.90,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba',
    categoryId: 'bebidas',
  },
  {
    id: '20',
    name: 'Água Mineral',
    description: 'Com ou sem gás (500ml)',
    price: 6.90,
    image: 'https://images.unsplash.com/photo-1564419320461-6870880221ad',
    categoryId: 'bebidas',
  },
  
  // Combos e Promoções
  {
    id: '10',
    name: 'Combo Família',
    description: '2 pratos principais, 2 entradas e 1 sobremesa grande para compartilhar',
    price: 159.90,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
    categoryId: 'combos',
  },
  {
    id: '21',
    name: 'Combo Casal',
    description: '2 pratos principais, 1 entrada para compartilhar e 2 sobremesas',
    price: 129.90,
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b',
    categoryId: 'combos',
  },
  {
    id: '22',
    name: 'Combo Individual',
    description: '1 prato principal, 1 entrada e 1 bebida não alcoólica',
    price: 79.90,
    image: 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1',
    categoryId: 'combos',
  },
  {
    id: '23',
    name: 'Promoção do Chef',
    description: 'Prato especial do dia com 20% de desconto',
    price: 42.90,
    image: 'https://images.unsplash.com/photo-1546241072-48010ad2862c',
    categoryId: 'promocoes',
  },
  {
    id: '24',
    name: 'Happy Hour',
    description: 'Bebidas selecionadas com 30% de desconto das 17h às 19h',
    price: 16.90,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b',
    categoryId: 'promocoes',
  },
  {
    id: '25',
    name: 'Menu Executivo',
    description: 'Entrada + prato principal + sobremesa por preço único (seg a sex, 12h às 15h)',
    price: 54.90,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2',
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
