import { NextResponse } from 'next/server';

// Mock database
let products = [
  {
    id: 1,
    name: 'Polo Paris Regular Fit',
    price: 89.99,
    collection: 'Summer Collection',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy'],
    images: ['/products/polo-1.jpg'],
    description: 'Classic polo shirt with a modern twist, perfect for any occasion.'
  },
  {
    id: 2,
    name: 'Elegant Evening Dress',
    price: 299.99,
    collection: 'Evening Wear',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Red', 'Navy'],
    images: ['/products/dress-1.jpg'],
    description: 'Sophisticated evening dress for special occasions.'
  }
];

export async function GET() {
  console.log('GET /api/products - Returning products:', products);
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const product = await request.json();
    console.log('POST /api/products - Received product:', product);
    
    // Add new ID
    const newProduct = {
      ...product,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    };
    
    products.push(newProduct);
    console.log('Added new product. Total products:', products.length);
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('POST /api/products - Error:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const product = await request.json();
    console.log('PUT /api/products - Updating product:', product);
    
    const index = products.findIndex(p => p.id === product.id);
    if (index === -1) {
      console.log('Product not found:', product.id);
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    products[index] = product;
    console.log('Updated product at index:', index);
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('PUT /api/products - Error:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    console.log('DELETE /api/products - Deleting product:', id);
    
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      console.log('Product not found:', id);
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    products = products.filter(p => p.id !== id);
    console.log('Deleted product. Remaining products:', products.length);
    
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/products - Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
} 