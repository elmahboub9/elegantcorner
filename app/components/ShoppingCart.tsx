'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';

interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
}

interface ShoppingCartProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  items: CartItem[];
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

export default function ShoppingCart({ isOpen, setIsOpen, items, removeItem, updateQuantity }: ShoppingCartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleWhatsAppOrder = () => {
    const orderMessage = `Hello! I would like to place an order:\n\n${items
      .map(
        (item) =>
          `• ${item.name}\n  - Size: ${item.size}\n  - Color: ${item.color}\n  - Quantity: ${
            item.quantity
          }\n  - Price: €${(item.price * item.quantity).toFixed(2)}\n`
      )
      .join('\n')}
\nTotal: €${total.toFixed(2)}`;

    const whatsappUrl = `https://wa.me/33651398493?text=${encodeURIComponent(orderMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-playfair">Shopping Cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {items.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>{item.name}</h3>
                                      <p className="ml-4">€{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {item.size} • {item.color}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="flex items-center space-x-2">
                                      <label htmlFor={`quantity-${item.id}`} className="sr-only">
                                        Quantity
                                      </label>
                                      <select
                                        id={`quantity-${item.id}`}
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                        className="rounded-md border border-gray-300 py-1.5 text-base leading-5 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                                      >
                                        {[1, 2, 3, 4, 5].map((num) => (
                                          <option key={num} value={num}>
                                            {num}
                                          </option>
                                        ))}
                                      </select>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => removeItem(item.id)}
                                      className="font-medium text-black hover:text-gray-800"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Total</p>
                        <p>€{total.toFixed(2)}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <button
                          onClick={handleWhatsAppOrder}
                          className="flex w-full items-center justify-center bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
                        >
                          <FaWhatsapp className="mr-2 h-5 w-5" />
                          Order via WhatsApp
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-black hover:text-gray-800"
                            onClick={() => setIsOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 