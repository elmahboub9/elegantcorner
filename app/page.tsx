'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCollections from './components/FeaturedCollections';
import WhatsAppButton from './components/WhatsAppButton';
import ShoppingCart from './components/ShoppingCart';
import Footer from './components/Footer';

interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
}

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedCollections />
      <WhatsAppButton />
      <ShoppingCart
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        items={cartItems}
        removeItem={removeFromCart}
        updateQuantity={updateQuantity}
      />
      <Footer />
    </main>
  );
} 