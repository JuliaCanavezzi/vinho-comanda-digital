import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CategoryMenu from '../components/CategoryMenu';
import DishList from '../components/DishList';
import DishModal from '../components/DishModal';
import { Dish } from '../components/DishList';
import { Search } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

// Sample data
const categories = ['Entrada', 'Principal', 'Sobremesa', 'Bebidas', 'Combos', 'Promoções'];

const sampleDishes: Dish[] = [
  // Entradas
  {
    id: '1',
    name: 'Dadinho de Tapioca',
    description: 'cubos crocantes por fora e macios por dentro, feitos com tapioca e queijo coalho.',
    price: 29.90,
    image: 'https://th.bing.com/th/id/R.28ed4af5948ce08f0494b7b879842aea?rik=t9OegNW6toPutg&pid=ImgRaw&r=0',
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
    image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAsJCQcJCQcJCQkJCQkJCQsJCwsMCwsLDA0QDBEODQ4MEhkSJRodJR0ZHxwpKRYlNzU2GioyPi0pMBk7IRP/2wBDAQcICAsJCxULCxUsHRkdLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz/wAARCAEjAUUDASIAAhEBAxEB/8QAGwAAAQUBAQAAAAAAAAAAAAAAAQACBAUGAwf/xABAEAACAQMDAgQEBAMHBAEEAwABAgMABBEFEiExQRMiUWEGFHGBIzKRoUKx4RUkM1LB0fAWYnLxggc0U7JDRJL/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAgMEAQUG/8QALxEAAwACAQQBAwMDAwUAAAAAAAECAxEhBBIxQRMiMlFhcYEUkaEjweEFUnKx8P/aAAwDAQACEQMRAD8A35LZPJ79abluR6U48nkDrQHf196HRZbHX96RLDHPX60ckd/rTf8AnFDgTnrnmnAtx5q50RQD9zZ/MaQZuevWm9xTgcc0Act96G5v83vS5oZ4NAHd1yx6UAxPTOaGQO3pSBzx69KAeC3ck0T9TTQevqKBbnvQDjuHHPNDP1oZz+lHsOBQDw3Tk9KRY4xk030pHuc9/SgH7m45PuPWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO9DNAP3N6mm7iepP6UvegetAODH3z9KJZu2f2pn360cgevWkHf3phI4/wBacCeetAP3n3/ShuI9aaCPfv1o8k/pQBDMec/tRDP0zQBOO
