
import React, { useState } from 'react';
import Header from '../components/Header';
import CategoryMenu from '../components/CategoryMenu';
import DishList from '../components/DishList';
import DishModal from '../components/DishModal';

// Mock data for dishes
const dishes = [
  {
    id: '1',
    name: 'Salmão Grelhado',
    description: 'Salmão fresco grelhado com ervas finas e acompanha arroz de jasmim.',
    price: 45.90,
    image: '/placeholder.svg',
    categoryId: 'principal',
    ingredients: [
      { id: '1', name: 'Salmão' },
      { id: '2', name: 'Ervas finas' },
      { id: '3', name: 'Arroz de jasmim' }
    ]
  },
  {
    id: '2',
    name: 'Risotto de Cogumelos',
    description: 'Cremoso risotto preparado com cogumelos shiitake e parmesão.',
    price: 38.50,
    image: '/placeholder.svg',
    categoryId: 'principal',
    ingredients: [
      { id: '4', name: 'Arroz arbóreo' },
      { id: '5', name: 'Cogumelos shiitake' },
      { id: '6', name: 'Parmesão' }
    ]
  },
  {
    id: '3',
    name: 'Bruschetta Italiana',
    description: 'Pão italiano tostado com tomate, manjericão e azeite extravirgem.',
    price: 18.90,
    image: '/placeholder.svg',
    categoryId: 'entrada',
    ingredients: [
      { id: '7', name: 'Pão italiano' },
      { id: '8', name: 'Tomate' },
      { id: '9', name: 'Manjericão' }
    ]
  }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart, setCart] = useState({});

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleQuantityChange = (dishId, quantity) => {
    setCart(prev => ({
      ...prev,
      [dishId]: quantity
    }));
  };

  const handleDishClick = (dishId) => {
    const dish = dishes.find(d => d.id === dishId);
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const handleAddToCart = (dishId, quantity, removedIngredients) => {
    console.log('Adding to cart:', { dishId, quantity, removedIngredients });
    handleQuantityChange(dishId, quantity);
  };

  const filteredDishes = dishes.filter(dish => {
    const matchesCategory = selectedCategory === 'todos' || dish.categoryId === selectedCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dish.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-cream">
      <Header onSearch={handleSearch} />
      <CategoryMenu 
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      <DishList 
        dishes={filteredDishes}
        selectedCategory={selectedCategory}
        onQuantityChange={handleQuantityChange}
        onDishClick={handleDishClick}
      />
      <DishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dish={selectedDish}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Index;
