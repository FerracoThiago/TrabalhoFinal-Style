import React from 'react';
import { AlertCircle, Heart, Trash2 } from 'lucide-react';

interface OutOfStockItemProps {
  image: string;
  name: string;
  style: string;
  price: string;
  size: string;
  color: string;
}

export const OutOfStockItem: React.FC<OutOfStockItemProps> = ({
  image,
  name,
  style,
  price,
  size,
  color,
}) => {
  return (
    <div 
      className="bg-white border border-red-100 shadow-sm flex flex-col mx-auto w-[358px]" 
      style={{ borderRadius: '12px', borderWidth: '1px', padding: '25px', gap: '16px' }}
    >
      <div className="flex items-center space-x-2 text-red-600">
        <AlertCircle className="w-6 h-6" />
        <span style={{ fontFamily: 'Segoe UI', fontWeight: 600, fontSize: '24px', lineHeight: '24px', letterSpacing: '-0.6px' }}>
          Out of Stock (1)
        </span>
      </div>

      <div className="flex space-x-3 items-start">
        <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 relative">
          <img src={image} alt={name} className="w-full h-full object-cover opacity-60 absolute inset-0" />
          <div className="absolute inset-0 flex items-center justify-center p-1 z-10">
            <span className="bg-red-500 text-white text-[9px] font-semibold px-2 py-0.5 rounded-md shadow-sm">
              Out of Stock
            </span>
          </div>
        </div>

        <div className="flex-1 flex justify-between items-start">
          <div className="flex flex-col">
            <h3 className="text-gray-800" style={{ fontFamily: 'Segoe UI', fontWeight: 600, fontSize: '18px', lineHeight: '28px' }}>
              {name}
            </h3>
            <p className="text-xs text-gray-400">{style}</p>
          </div>
          <span className="text-sm font-bold text-gray-800">{price}</span>
        </div>
      </div>

      <div>
        <button
          type="button"
          className="border border-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Notify When Available
        </button>
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        <div className="flex items-center space-x-4 text-xs font-medium text-black">
          <button type="button" className="flex items-center space-x-1.5 hover:opacity-75">
            <Heart className="w-4 h-4" />
            <span>Save for Later</span>
          </button>
          <button type="button" className="flex items-center space-x-1.5 hover:opacity-75">
            <Trash2 className="w-4 h-4" />
            <span>Remove</span>
          </button>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Size: {size} &nbsp;·&nbsp; Color: {color}
      </div>
    </div>
  );
};