import React from 'react';
import {Heart, Trash2 } from 'lucide-react';

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
  onSaveForLater?: () => void;
  onRemove?: () => void;
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
  onSaveForLater,
  onRemove,
  showDivider = true,
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col md:flex-row gap-4 items-start w-full">
        <div className="flex gap-4 w-full md:w-auto">
          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 flex md:hidden flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h3 
                  className="text-black"
                  style={{ 
                    fontFamily: 'Segoe UI', 
                    fontWeight: 600, 
                    fontSize: '18px', 
                    lineHeight: '28px', 
                    letterSpacing: '0%' 
                  }}
                >
                  {name}
                </h3>
                <p className="text-xs text-gray-500">{style}</p>
              </div>

              <div className="text-right flex flex-col items-end shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold text-black">{price}</span>
                  <span className="text-xs text-gray-400 line-through">{oldPrice}</span>
                </div>
                <span className="text-[11px] font-bold text-white bg-red-600 px-2 py-0.5 rounded-md mt-1 inline-block text-center whitespace-nowrap">
                  Save {savings}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
              <span>Size: <strong className="text-black">{size}</strong></span>
              <span>Color: <strong className="text-black">{color}</strong></span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-1 flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h3 
                className="text-black"
                style={{ 
                  fontFamily: 'Segoe UI', 
                  fontWeight: 600, 
                  fontSize: '18px', 
                  lineHeight: '28px', 
                  letterSpacing: '0%' 
                }}
              >
                {name}
              </h3>
              <p className="text-xs text-gray-500">{style}</p>
            </div>
            
            <div className="text-right">
              <span className="text-base font-bold text-black">{price}</span>
              <span className="text-xs text-gray-400 line-through ml-1.5">{oldPrice}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
            <span>Size: <strong className="text-black">{size}</strong></span>
            <span>Color: <strong className="text-black">{color}</strong></span>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center border border-gray-200 rounded-lg px-2 py-1 gap-3 bg-gray-50">
              <button
                type="button"
                onClick={onDecrease}
                className="text-gray-600 hover:text-black font-semibold px-1"
              >
                -
              </button>
              <span className="text-xs font-semibold text-black">{quantity}</span>
              <button
                type="button"
                onClick={onIncrease}
                className="text-gray-600 hover:text-black font-semibold px-1"
              >
                +
              </button>
              <span className="text-[10px] text-gray-400 pl-1 border-l border-gray-200">Max {maxQuantity}</span>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-600 font-medium">
              <button 
                type="button" 
                onClick={onSaveForLater}
                className="flex items-center gap-1 hover:text-black transition-colors"
              >
                <Heart className="w-4 h-4" />
                <span>Save for Later</span>
              </button>
              <button 
                type="button" 
                onClick={onRemove}
                className="flex items-center gap-1 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Remove</span>
              </button>
            </div>

            <span className="text-xs font-bold text-white bg-red-600 px-2 py-1 rounded-md">
              Save {savings}
            </span>
          </div>
        </div>

        <div className="flex md:hidden flex-col w-full gap-3 mt-1">
          <div className="flex items-center border border-gray-200 rounded-lg px-2 py-1 gap-3 bg-gray-50 w-fit">
            <button
              type="button"
              onClick={onDecrease}
              className="text-gray-600 hover:text-black font-semibold px-1"
            >
              -
            </button>
            <span className="text-xs font-semibold text-black">{quantity}</span>
            <button
              type="button"
              onClick={onIncrease}
              className="text-gray-600 hover:text-black font-semibold px-1"
            >
              +
            </button>
            <span className="text-[10px] text-gray-400 pl-1 border-l border-gray-200">Max {maxQuantity}</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-600 font-medium pt-1">
            <button 
              type="button" 
              onClick={onSaveForLater}
              className="flex items-center gap-1 hover:text-black transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span>Save for Later</span>
            </button>
            <button 
              type="button" 
              onClick={onRemove}
              className="flex items-center gap-1 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>

      {showDivider && <div className="my-6 border-b border-gray-100 w-full" />}
    </div>
  );
};