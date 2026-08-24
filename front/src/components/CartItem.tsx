import React from 'react';
import { Heart, Trash2 } from 'lucide-react';

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
                <span 
                  className="font-bold text-white bg-red-600 inline-flex items-center justify-center mt-1"
                  style={{
                    width: '71px',
                    height: '22px',
                    paddingTop: '3px',
                    paddingRight: '11px',
                    paddingBottom: '3px',
                    paddingLeft: '11px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    lineHeight: '16px',
                  }}
                >
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
            
            <div className="text-right flex flex-col items-end">
              <div>
                <span className="text-base font-bold text-black">{price}</span>
                <span className="text-xs text-gray-400 line-through ml-1.5">{oldPrice}</span>
              </div>
              <span 
                className="font-bold text-white bg-red-600 inline-flex items-center justify-center mt-1"
                style={{
                  width: '71px',
                  height: '22px',
                  paddingTop: '3px',
                  paddingRight: '11px',
                  paddingBottom: '3px',
                  paddingLeft: '11px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  lineHeight: '16px',
                }}
              >
                Save {savings}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
            <span>Size: <strong className="text-black">{size}</strong></span>
            <span>Color: <strong className="text-black">{color}</strong></span>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              <div 
                className="flex items-center justify-between border border-gray-200 bg-white shadow-sm"
                style={{
                  width: '100px',
                  height: '34px',
                  paddingLeft: '12px',
                  paddingRight: '12px',
                  borderRadius: '8px',
                }}
              >
                <button
                  type="button"
                  onClick={onDecrease}
                  className="text-gray-700 hover:text-black font-semibold flex items-center justify-center select-none"
                  style={{ fontSize: '15px', lineHeight: '1', width: '16px', height: '16px' }}
                >
                  −
                </button>
                <span 
                  className="font-semibold text-black text-center flex-1 select-none"
                  style={{ fontSize: '13px', lineHeight: '1' }}
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={onIncrease}
                  className="text-gray-700 hover:text-black font-semibold flex items-center justify-center select-none"
                  style={{ fontSize: '15px', lineHeight: '1', width: '16px', height: '16px' }}
                >
                  +
                </button>
              </div>
              <span className="text-[10px] text-gray-400 leading-tight">
                Max<br />{maxQuantity}
              </span>
            </div>

            <div className="flex items-center gap-5 text-xs text-black font-medium">
              <button 
                type="button" 
                onClick={onSaveForLater}
                className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
              >
                <Heart className="w-4 h-4 text-black fill-none stroke-[2]" />
                <span>Save for Later</span>
              </button>
              <button 
                type="button" 
                onClick={onRemove}
                className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
              >
                <Trash2 className="w-4 h-4 text-black stroke-[2]" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex md:hidden flex-col w-full gap-3 mt-1">
          <div className="flex items-center gap-3">
            <div 
              className="flex items-center justify-between border border-gray-200 bg-white shadow-sm w-fit"
              style={{
                width: '100px',
                height: '34px',
                paddingLeft: '12px',
                paddingRight: '12px',
                borderRadius: '8px',
              }}
            >
              <button
                type="button"
                onClick={onDecrease}
                className="text-gray-700 hover:text-black font-semibold flex items-center justify-center select-none"
                style={{ fontSize: '15px', lineHeight: '1', width: '16px', height: '16px' }}
              >
                −
              </button>
              <span 
                className="font-semibold text-black text-center flex-1 select-none"
                style={{ fontSize: '13px', lineHeight: '1' }}
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={onIncrease}
                className="text-gray-700 hover:text-black font-semibold flex items-center justify-center select-none"
                style={{ fontSize: '15px', lineHeight: '1', width: '16px', height: '16px' }}
              >
                +
              </button>
            </div>
            <span className="text-[10px] text-gray-400 leading-tight">
              Max<br />{maxQuantity}
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs text-black font-medium pt-1">
            <button 
              type="button" 
              onClick={onSaveForLater}
              className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
            >
              <Heart className="w-4 h-4 text-black fill-none stroke-[2]" />
              <span>Save for Later</span>
            </button>
            <button 
              type="button" 
              onClick={onRemove}
              className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
            >
              <Trash2 className="w-4 h-4 text-black stroke-[2]" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>

      {showDivider && <div className="my-6 border-b border-gray-100 w-full" />}
    </div>
  );
};