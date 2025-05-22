'use client';

import { useState, FormEvent, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

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

const COLLECTIONS = ['Summer Collection', 'Evening Wear', 'Casual Chic'];
const DEFAULT_SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const DEFAULT_COLORS = ['White', 'Black', 'Navy', 'Beige', 'Red'];

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    collection: COLLECTIONS[0],
    sizes: [] as string[],
    colors: [] as string[],
    images: [] as string[],
    description: ''
  });

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/products');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error instanceof Error ? error.message : 'Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      collection: COLLECTIONS[0],
      sizes: [],
      colors: [],
      images: [],
      description: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (type: 'sizes' | 'colors', value: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError(null);

      // Validate form data
      if (!formData.name || !formData.price || !formData.collection) {
        throw new Error('Please fill in all required fields');
      }

      if (formData.sizes.length === 0) {
        throw new Error('Please select at least one size');
      }

      if (formData.colors.length === 0) {
        throw new Error('Please select at least one color');
      }

      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        images: formData.images.length ? formData.images : ['/placeholder-image.jpg']
      };

      const url = '/api/products';
      const method = selectedProduct ? 'PUT' : 'POST';
      const body = selectedProduct ? { ...productData, id: selectedProduct.id } : productData;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save product');
      }

      // Refresh products list
      await fetchProducts();

      // Reset form and close modal
      resetForm();
      setIsAddModalOpen(false);
      setIsEditModalOpen(false);
      setSelectedProduct(null);

      alert(`Product ${selectedProduct ? 'updated' : 'added'} successfully!`);
    } catch (error) {
      console.error('Error saving product:', error);
      setError(error instanceof Error ? error.message : 'Failed to save product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch('/api/products', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('Failed to delete product');

      // Refresh products list
      await fetchProducts();
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container-custom">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-playfair">Product Management</h1>
            <button
              onClick={() => {
                resetForm();
                setError(null);
                setIsAddModalOpen(true);
              }}
              className="btn-primary flex items-center"
              disabled={isLoading}
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add New Product
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {error}
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          )}

          {/* Product Table */}
          {!isLoading && products.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No products found. Add your first product using the button above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Collection
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative h-16 w-16">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        €{product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.collection}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              setFormData({
                                name: product.name,
                                price: product.price.toString(),
                                collection: product.collection,
                                sizes: product.sizes,
                                colors: product.colors,
                                images: product.images,
                                description: product.description
                              });
                              setIsEditModalOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      <Dialog
        open={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          if (!isLoading) {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            setSelectedProduct(null);
            setError(null);
            resetForm();
          }
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-xl bg-white rounded-lg p-6 w-full">
            <Dialog.Title className="text-lg font-playfair mb-4">
              {isAddModalOpen ? 'Add New Product' : 'Edit Product'}
            </Dialog.Title>

            {/* Form Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price (€)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                />
              </div>

              {/* Collection */}
              <div>
                <label htmlFor="collection" className="block text-sm font-medium text-gray-700">
                  Collection
                </label>
                <select
                  id="collection"
                  name="collection"
                  value={formData.collection}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                >
                  {COLLECTIONS.map((collection) => (
                    <option key={collection} value={collection}>
                      {collection}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sizes */}
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-2">Sizes</span>
                <div className="grid grid-cols-5 gap-2">
                  {DEFAULT_SIZES.map((size) => (
                    <label key={size} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.sizes.includes(size)}
                        onChange={() => handleCheckboxChange('sizes', size)}
                        className="rounded border-gray-300 text-black focus:ring-black"
                      />
                      <span className="text-sm">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-2">Colors</span>
                <div className="grid grid-cols-3 gap-2">
                  {DEFAULT_COLORS.map((color) => (
                    <label key={color} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.colors.includes(color)}
                        onChange={() => handleCheckboxChange('colors', color)}
                        className="rounded border-gray-300 text-black focus:ring-black"
                      />
                      <span className="text-sm">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                />
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  id="image"
                  name="images"
                  value={formData.images[0] || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, images: [e.target.value] }))}
                  placeholder="/products/your-image.jpg"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    if (!isLoading) {
                      setIsAddModalOpen(false);
                      setIsEditModalOpen(false);
                      setSelectedProduct(null);
                      setError(null);
                      resetForm();
                    }
                  }}
                  className="btn-secondary"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                      Saving...
                    </span>
                  ) : (
                    isAddModalOpen ? 'Add Product' : 'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
} 