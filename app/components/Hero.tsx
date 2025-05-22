import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/hero-bg.jpg")',
          filter: 'brightness(0.8)'
        }}
      />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-playfair text-white mb-6">
              Discover Timeless Elegance
            </h1>
            <p className="text-lg md:text-xl text-white mb-8">
              Explore our curated collection of sophisticated fashion pieces that blend style with comfort.
            </p>
            <div className="space-x-4">
              <Link href="/collections" className="btn-primary bg-white text-black hover:bg-gray-100">
                Shop Collections
              </Link>
              <Link href="/new-arrivals" className="btn-secondary border-white text-white hover:bg-white hover:text-black">
                New Arrivals
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-white">
          <span className="text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1 h-2 bg-white rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 