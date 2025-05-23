'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Collection {
  id: string;
  title: string;
  image: string;
  productCount: number;
  description: string;
  slug: string;
}

const collections: Collection[] = [
  {
    id: 'new-arrivals',
    title: 'New Arrivals',
    image: '/collections/new-arrivals.jpg',
    productCount: 12,
    description: 'Our latest additions to the collection, featuring the season\'s most coveted styles.',
    slug: 'new-arrivals'
  },
  {
    id: 'winter',
    title: 'Winter Collection',
    image: '/collections/winter.jpg',
    productCount: 8,
    description: 'Embrace the cold with our elegant winter essentials, designed for both style and comfort.',
    slug: 'winter'
  },
  {
    id: 'summer',
    title: 'Summer Essentials',
    image: '/collections/summer.jpg',
    productCount: 10,
    description: 'Light, breathable pieces perfect for warm days and balmy nights.',
    slug: 'summer'
  },
  {
    id: 'sport',
    title: 'Sport Collection',
    image: '/collections/sport.jpg',
    productCount: 6,
    description: 'Performance meets style in our sport collection, designed to elevate your active lifestyle.',
    slug: 'sport'
  },
  {
    id: 'femme',
    title: 'Femme',
    image: '/collections/femme.jpg',
    productCount: 15,
    description: 'Celebrate femininity with our elegantly curated collection for the modern woman.',
    slug: 'femme'
  }
];

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container-custom py-16">
        <h1 className="text-4xl font-playfair text-center mb-16">Our Collections</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link 
              href={`/collections/${collection.slug}`} 
              key={collection.id}
              className="group relative overflow-hidden"
            >
              <div className="relative h-[500px] w-full">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 group-hover:bg-opacity-20" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <h2 className="text-2xl font-playfair mb-2">{collection.title}</h2>
                  <p className="text-sm opacity-90 mb-2">{collection.description}</p>
                  <span className="text-sm">{collection.productCount} Products</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
} 