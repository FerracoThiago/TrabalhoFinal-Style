import React, { useState, useEffect } from 'react';
import { Truck } from 'lucide-react';
import { RefreshCw } from 'lucide-react';
import { Shield } from 'lucide-react';
import { Image as ImageIcon } from 'lucide-react';
import { Hero } from '../components/Hero/Hero';
import { Footer } from '../components/Footer/Footer';
import { ProductCard } from '../components/ProductCard/ProductCard';

const categories = [
  { name: "Women's Fashion", count: '500+ items' },
  { name: "Men's Fashion", count: '350+ items' },
  { name: 'Accessories', count: '200+ items' },
  { name: 'Shoes', count: '180+ items' },
];

interface Product {
  id: number;
  name: string;
  price: number;
  discount?: number;
  avgReview?: number;
  tags: string[];
}

export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/product')
      .then((response) => response.json())
      .then((data) => setProducts(data.slice(0, 4)))
      .catch((error) => console.error('Erro ao buscar produtos:', error));
  }, []);

  return (
    <div>
      <Hero />

      <section className="w-full bg-white py-12 px-4">
        <div className="max-w-[390px] sm:max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
              <Truck className="w-5 h-5 text-black" />
            </div>
            <h3 className="text-sm font-semibold text-black mb-1">Free Shipping</h3>
            <p className="text-xs text-gray-500">Free shipping on orders over $100</p>
          </div>
          <div>
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-black" />
            </div>
            <h3 className="text-sm font-semibold text-black mb-1">Easy Returns</h3>
            <p className="text-xs text-gray-500">30-day hassle-free returns</p>
          </div>
          <div>
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
              <Shield className="w-5 h-5 text-black" />
            </div>
            <h3 className="text-sm font-semibold text-black mb-1">Secure Payment</h3>
            <p className="text-xs text-gray-500">Your payment information is safe</p>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-12 px-4">
        <div className="max-w-[390px] sm:max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-black text-center mb-2">Shop by Category</h2>
          <p className="text-sm text-gray-500 text-center mb-8">
            Explore our carefully curated collections for every style and occasion
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div
                key={category.name}
                className="relative rounded-xl overflow-hidden aspect-square bg-[#EAEAEA]"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="w-10 h-10 text-gray-400" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-sm font-semibold">{category.name}</h3>
                  <p className="text-xs text-gray-200">{category.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-12 px-4">
        <div className="max-w-[390px] sm:max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-black text-center mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                discount={product.discount}
                tags={product.tags}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};