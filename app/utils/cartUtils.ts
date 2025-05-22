export interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
}

export const addToCart = (
  cartItems: CartItem[],
  productToAdd: CartItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (item) =>
      item.id === productToAdd.id &&
      item.size === productToAdd.size &&
      item.color === productToAdd.color
  );

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id &&
      item.size === productToAdd.size &&
      item.color === productToAdd.color
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeFromCart = (cartItems: CartItem[], itemId: number): CartItem[] => {
  return cartItems.filter((item) => item.id !== itemId);
};

export const updateQuantity = (
  cartItems: CartItem[],
  itemId: number,
  newQuantity: number
): CartItem[] => {
  return cartItems.map((item) =>
    item.id === itemId ? { ...item, quantity: newQuantity } : item
  );
};

export const calculateTotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const formatPrice = (price: number): string => {
  return `€${price.toFixed(2)}`;
};

export const generateWhatsAppMessage = (cartItems: CartItem[]): string => {
  const total = calculateTotal(cartItems);
  const message = `Hello! I would like to place an order:\n\n${cartItems
    .map(
      (item) =>
        `• ${item.name}\n  - Size: ${item.size}\n  - Color: ${item.color}\n  - Quantity: ${
          item.quantity
        }\n  - Price: ${formatPrice(item.price * item.quantity)}\n`
    )
    .join('\n')}\nTotal: ${formatPrice(total)}`;

  return encodeURIComponent(message);
}; 