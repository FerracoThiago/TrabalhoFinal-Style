import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Image as ImageIcon } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  discount?: number;
  tags: string[];
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, discount, tags }) => {
  const [avgReview] = useState(() => Number((Math.random() * 4 + 1).toFixed(1)));
  const [adding, setAdding] = useState(false);

  const hasDiscount = discount != null && discount > 0;
  const originalPrice = hasDiscount ? price / (1 - discount / 100) : null;
  const badgeText = tags[0];

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Você precisa estar logado para adicionar ao carrinho.');
      return;
    }

    setAdding(true);

    try {
      const response = await fetch('http://localhost:3333/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: id,
          quantity: 1,
          operation: 'add',
        }),
      });

      if (!response.ok) {
        alert('Não foi possível adicionar ao carrinho.');
      }
    } catch {
      alert('Erro ao conectar com o servidor.');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="w-full">
      <div className="relative rounded-xl overflow-hidden aspect-square bg-[#EAEAEA] mb-3">
        {badgeText && (
          <span className="absolute top-3 left-3 bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
            {badgeText}
          </span>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <ImageIcon className="w-10 h-10 text-gray-400" />
        </div>
      </div>

      <h3 className="text-sm font-semibold text-black mb-1">{name}</h3>

      <div className="flex items-center gap-1 mb-1">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="text-xs font-medium text-black">{avgReview.toFixed(1)}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-black">${price}</span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">${originalPrice!.toFixed(0)}</span>
          )}
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={adding}
          className="text-xs font-medium bg-white text-black border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          {adding ? '...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};