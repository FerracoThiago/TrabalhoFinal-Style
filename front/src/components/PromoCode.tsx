import React from 'react';
import { Tag } from 'lucide-react';
import { Input } from './Input';

export const PromoCode: React.FC = () => {
  return (
    <div 
      className="bg-white border border-gray-100 shadow-sm flex flex-col mx-auto w-[358px]" 
      style={{ borderRadius: '12px', borderWidth: '1px', padding: '25px', gap: '12px' }}
    >
      <div className="flex items-center space-x-2 text-lg font-bold text-black">
        <Tag className="w-6 h-6 text-gray-700" strokeWidth={2.5} />
        <span className="text-black font-extrabold text-lg">Promo Code</span>
      </div>

      <div className="flex space-x-2">
        <div className="flex-1">
          <Input
            placeholder="Enter promo code"
            value=""
            onChange={() => {}}
          />
        </div>
        <button
          type="button"
          className="bg-gray-500 hover:bg-gray-600 text-white text-xs font-semibold px-5 rounded-xl transition-colors h-11"
        >
          Apply
        </button>
      </div>

      <p className="text-[11px] text-gray-400">
        Try: SAVE10, WELCOME20, STUDENT15
      </p>
    </div>
  );
};