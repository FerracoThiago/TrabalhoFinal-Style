import React, { useState } from 'react';

interface PromoCodeProps {
  onApply?: (code: string) => void;
}

export const PromoCode: React.FC<PromoCodeProps> = ({ onApply }) => {
  const [code, setCode] = useState('');

  const handleApply = () => {
    if (onApply && code.trim()) {
      onApply(code);
    }
  };

  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 flex flex-col w-full" style={{ gap: '16px' }}>
      <h2 
        className="text-black"
        style={{ 
          fontFamily: 'Segoe UI', 
          fontWeight: 600, 
          fontSize: '24px', 
          lineHeight: '24px', 
          letterSpacing: '-0.6px' 
        }}
      >
        Promo Code
      </h2>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter promo code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
        />
        <button
          type="button"
          onClick={handleApply}
          className="bg-gray-800 text-white font-medium px-4 py-2 rounded-lg hover:bg-black transition-colors text-sm shrink-0"
        >
          Apply
        </button>
      </div>

      <div className="text-xs text-gray-500">
        Try: <span className="font-semibold text-gray-700">SAVE10</span>, <span className="font-semibold text-gray-700">VIPCOMP30</span>, <span className="font-semibold text-gray-700">STUDENT15</span>
      </div>
    </div>
  );
};