import React from 'react';
import { Heart, Trash2, AlertCircle } from 'lucide-react';

interface OutOfStockItemProps {
  image: string;
  name: string;
  style: string;
  price: string;
  size: string;
  color: string;
  onNotify?: () => void;
  onSaveForLater?: () => void;
  onRemove?: () => void;
}

export const OutOfStockItem: React.FC<OutOfStockItemProps> = ({
  image,
  name,
  style,
  price,
  size,
  color,
  onNotify,
  onSaveForLater,
  onRemove,
}) => {
  return (
    <div className="bg-white border border-red-100 shadow-sm rounded-xl p-5 flex flex-col w-full" style={{ gap: '20px' }}>
      <div className="flex items-center space-x-2">
        <AlertCircle className="w-4 h-4 text-red-500" />
        <span 
          className="text-black"
          style={{ 
            fontFamily: 'Segoe UI', 
            fontWeight: 600, 
            fontSize: '24px', 
            lineHeight: '24px', 
            letterSpacing: '-0.6px' 
          }}
        >
          Out of Stock (1)
        </span>
      </div>

      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row gap-4 items-start w-full">
          <div className="flex gap-4 w-full md:w-auto">
            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
              <img src={image} alt={name} className="w-full h-full object-cover opacity-60" />
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
                <span className="text-base font-bold text-black">{price}</span>
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
              <span className="text-base font-bold text-black">{price}</span>
            </div>

            <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
              <span>Size: <strong className="text-black">{size}</strong></span>
              <span>Color: <strong className="text-black">{color}</strong></span>
            </div>

            <div className="flex items-center justify-between mt-3">
              <button
                type="button"
                onClick={onNotify}
                className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors border border-gray-200"
              >
                Notify When Available
              </button>

              <div className="flex items-center gap-6 text-xs text-black font-medium">
                <button 
                  type="button" 
                  onClick={onSaveForLater}
                  className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
                >
                  <Heart className="w-4 h-4 text-black" />
                  <span>Save for Later</span>
                </button>
                <button 
                  type="button" 
                  onClick={onRemove}
                  className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
                >
                  <Trash2 className="w-4 h-4 text-black" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex md:hidden flex-col w-full gap-3 mt-1">
            <button
              type="button"
              onClick={onNotify}
              className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors border border-gray-200 w-fit"
            >
              Notify When Available
            </button>

            <div className="flex items-center gap-6 text-xs text-black font-medium pt-1">
              <button 
                type="button" 
                onClick={onSaveForLater}
                className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
              >
                <Heart className="w-4 h-4 text-black" />
                <span>Save for Later</span>
              </button>
              <button 
                type="button" 
                onClick={onRemove}
                className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
              >
                <Trash2 className="w-4 h-4 text-black" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};