'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  collection: string;
}

export default function CollectionPage() {
  const params = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      // In a real application, this would fetch from an API
      // For now, we'll simulate with static data
      const mockProducts = [
        {
          id: '1',
          name: 'Elegant Dress',
          price: 129.99,
          image: '/products/dress1.jpg',
          collection: 'new-arrivals'
        },
        {
          id: '2',
          name: 'Winter Coat',
          price: 199.99,
          image: '/products/coat1.jpg',
          collection: 'winter'
        },
        // Add more mock products as needed
      ];

      // Filter products based on collection
      const filteredProducts = mockProducts.filter(
        product => product.collection === params.slug
      );
      
      setProducts(filteredProducts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [params.slug, fetchProducts]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container-custom py-16">
        <h1 className="text-4xl font-playfair text-center mb-16 capitalize">
          {(params.slug as string).replace('-', ' ')} Collection
        </h1>
        
        {products.length === 0 ? (
          <p className="text-center text-gray-600">No products found in this collection.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="relative h-[400px] w-full mb-4 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-gray-600">€{product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
} 