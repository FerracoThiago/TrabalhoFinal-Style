import React from 'react';
import { Minus, Plus, Heart, Trash2 } from 'lucide-react';

interface CartItemProps {
  image: string;
  name: string;
  style: string;
  size: string;
  color: string;
  price: string;
  oldPrice: string;
  savings: string;
  quantity: number;
  maxQuantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  showDivider?: boolean;
}

export const CartItem: React.FC<CartItemProps> = ({
  image,
  name,
  style,
  size,
  color,
  price,
  oldPrice,
  savings,
  quantity,
  maxQuantity,
  onDecrease,
  onIncrease,
  showDivider = true,
}) => {
  return (
    <div
      className={`flex flex-col w-full ${
        showDivider ? 'pb-4 border-b border-gray-100' : ''
      }`}
      style={{ gap: '12px' }}
    >
      <div className="relative w-full min-h-[80px]">
        <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute top-[90px] right-0 text-right flex flex-col items-end">
          <div className="flex items-baseline">
            <span className="text-sm font-bold text-black">
              {price}
            </span>

            <span className="text-xs text-gray-400 line-through ml-1">
              {oldPrice}
            </span>
          </div>

          <span className="mt-1 inline-block bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
            Save {savings}
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <h3 className="text-sm font-bold text-black leading-tight">
          {name}
        </h3>

        <p className="text-xs text-gray-400 mt-0.5">
          {style}
        </p>

        <p className="text-xs text-gray-500 mt-1">
          Size: {size} &nbsp;·&nbsp; Color: {color}
        </p>
      </div>

      <div className="flex flex-col gap-3 pt-1 w-full">
        <div className="flex items-center">
          <div className="flex items-center border border-gray-200 rounded-lg px-2.5 py-1.5 space-x-3 bg-white">
            <button
              type="button"
              onClick={onDecrease}
              className="text-black hover:opacity-75"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="text-xs font-semibold text-black">
              {quantity}
            </span>

            <button
              type="button"
              onClick={onIncrease}
              className="text-black hover:opacity-75"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[10px] text-gray-400 leading-tight ml-3">
            <div>Max</div>
            <div>{maxQuantity}</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-8 text-xs font-medium text-black mt-10">
          <button
            type="button"
            className="flex items-center space-x-1.5 hover:opacity-75"
          >
            <Heart className="w-4 h-4" />
            <span>Save for Later</span>
          </button>

          <button
            type="button"
            className="flex items-center space-x-1.5 hover:opacity-75"
          >
            <Trash2 className="w-4 h-4" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};