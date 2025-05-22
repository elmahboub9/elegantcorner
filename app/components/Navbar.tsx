import Link from 'next/link';
import { useState } from 'react';
import { FaInstagram, FaWhatsapp, FaShoppingBag } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="font-playfair text-2xl font-bold">
            Elegant Corner
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/collections" className="hover:text-gray-600">Collections</Link>
            <Link href="/new-arrivals" className="hover:text-gray-600">New Arrivals</Link>
            <Link href="/about" className="hover:text-gray-600">About</Link>
            <Link href="/contact" className="hover:text-gray-600">Contact</Link>
          </div>

          {/* Social and Cart Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
               className="hover:text-gray-600">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="https://wa.me/33651398493" target="_blank" rel="noopener noreferrer"
               className="hover:text-gray-600">
              <FaWhatsapp className="w-5 h-5" />
            </a>
            <button className="hover:text-gray-600 relative">
              <FaShoppingBag className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                0
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/collections" 
                    className="block px-3 py-2 hover:bg-gray-50">
                Collections
              </Link>
              <Link href="/new-arrivals" 
                    className="block px-3 py-2 hover:bg-gray-50">
                New Arrivals
              </Link>
              <Link href="/about" 
                    className="block px-3 py-2 hover:bg-gray-50">
                About
              </Link>
              <Link href="/contact" 
                    className="block px-3 py-2 hover:bg-gray-50">
                Contact
              </Link>
              <div className="flex items-center space-x-4 px-3 py-2">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href="https://wa.me/33651398493" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="w-5 h-5" />
                </a>
                <button className="relative">
                  <FaShoppingBag className="w-5 h-5" />
                  <span className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    0
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 