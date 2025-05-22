import Link from 'next/link';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-playfair text-xl mb-4">Elegant Corner</h3>
            <p className="text-gray-300 text-sm">
              Your destination for sophisticated fashion and timeless elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/collections" className="text-gray-300 hover:text-white">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-gray-300 hover:text-white">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-lg mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <FaWhatsapp />
                <a href="https://wa.me/33651398493" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-300 hover:text-white">
                  +33 651 398 493
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MdEmail />
                <a href="mailto:elmahboubhamza9@gmail.com" 
                   className="text-gray-300 hover:text-white">
                  elmahboubhamza9@gmail.com
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                   className="flex items-center space-x-2 text-gray-300 hover:text-white">
                  <FaInstagram />
                  <span>Follow us on Instagram</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-playfair text-lg mb-4">Location</h4>
            <p className="text-gray-300">
              7 Rue Louis Arretche<br />
              35700 Rennes<br />
              France
            </p>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="font-playfair text-xl mb-4">Localization & Delivery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-playfair text-lg mb-2">France (National Delivery)</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Delivery via Colissimo, Chronopost, or Mondial Relay</li>
                <li>• Delivery time: 2 to 4 business days</li>
                <li>• Free shipping on orders over €40</li>
              </ul>
            </div>
            <div>
              <h4 className="font-playfair text-lg mb-2">Rennes (In-Person Pickup)</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Pickup available by appointment</li>
                <li>• 7 Rue Louis Arretche, 35700 Rennes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Elegant Corner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 