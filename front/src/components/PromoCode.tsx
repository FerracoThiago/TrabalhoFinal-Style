import React, { useState } from 'react';
import { Tag } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button'; 

interface PromoCodeProps {
  onApply?: (code: string) => void;
}

export const PromoCode: React.FC<PromoCodeProps> = ({ onApply }) => {
  const [code, setCode] = useState('');

  return (
    <div 
      className="bg-white border border-gray-100 shadow-sm rounded-xl flex flex-col w-full" 
      style={{ 
        maxWidth: '434.66px',
        height: '170px',
        padding: '25px 20px',
        gap: '24px' 
      }}
    >
      <div className="flex items-center gap-2">
        <Tag className="w-4 h-4 text-black" />
        <h2 className="text-black font-semibold text-[24px] leading-[24px] tracking-[-0.6px]">
          Promo Code
        </h2>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {/* Reutilizando o seu Input */}
          <div className="flex-1">
            <Input
              placeholder="Enter promo code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          {/* Reutilizando o Botão padronizado */}
          <Button 
            variant="primary" 
            onClick={() => onApply?.(code)}
            className="px-4 h-11 shrink-0"
          >
            Apply
          </Button>
        </div>

        <div className="text-xs text-gray-500">
          Try: <span className="font-semibold text-gray-700">SAVE10</span>, <span className="font-semibold text-gray-700">WELCOME20</span>, <span className="font-semibold text-gray-700">STUDENT15</span>
        </div>
      </div>
    </div>
  );
};