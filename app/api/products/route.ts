import { NextResponse } from 'next/server';

// Mock data for demonstration
const products = [
  {
    id: 1,
    name: 'Polo Paris Regular Fit',
    price: 89.99,
    collection: 'Summer',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy'],
    images: ['/products/polo-1.jpg'],
    description: 'Classic polo shirt with a modern twist, perfect for any occasion.'
  },
  {
    id: 2,
    name: 'Elegant Evening Dress',
    price: 299.99,
    collection: 'Evening',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Red', 'Navy'],
    images: ['/products/dress-1.jpg'],
    description: 'Sophisticated evening dress for special occasions.'
  },
  {
    id: 3,
    name: 'Casual Linen Shirt',
    price: 79.99,
    collection: 'Casual',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Beige', 'Light Blue'],
    images: ['/products/shirt-1.jpg'],
    description: 'Comfortable linen shirt for a relaxed yet stylish look.'
  }
];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const product = await request.json();
    products.push({ ...product, id: products.length + 1 });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const product = await request.json();
    const index = products.findIndex(p => p.id === product.id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    products[index] = product;
    return NextResponse.json(product);
  } catch (error) {
    console.error('Failed to update product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    products.splice(index, 1);
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Failed to delete product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
} 