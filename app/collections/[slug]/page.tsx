'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

interface Product {
  id: number;
  name: string;
  price: number;
  collection: string;
  sizes: string[];
  colors: string[];
  images: string[];
  description: string;
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const collectionTitles: { [key: string]: string } = {
    'new-arrivals': 'New Arrivals',
    'winter': 'Winter Collection',
    'summer': 'Summer Essentials',
    'sport': 'Sport Collection',
    'femme': 'Femme'
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      
      // Filter products based on collection
      const filteredProducts = data.filter((product: Product) => {
        const productCollection = product.collection.toLowerCase().replace(/\s+/g, '-');
        return productCollection === params.slug;
      });
      
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container-custom py-16">
        <h1 className="text-4xl font-playfair text-center mb-8">
          {collectionTitles[params.slug] || 'Collection'}
        </h1>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 py-8">
            {error}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No products found in this collection.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative h-[400px] mb-4 overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-playfair mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-lg font-semibold">€{product.price.toFixed(2)}</p>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Available sizes: {product.sizes.join(', ')}
                </p>
                <p className="text-sm text-gray-500">
                  Colors: {product.colors.join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
} 