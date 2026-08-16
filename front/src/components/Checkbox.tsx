import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string | React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-start space-x-3 cursor-pointer select-none">
      <div 
        onClick={onChange}
        // A alteração principal é aqui: 'rounded' virou 'rounded-full'
        className={`w-4 h-4 mt-0.5 rounded-full flex items-center justify-center transition-colors border ${
          checked 
            ? 'bg-black border-black' 
            : 'bg-white border-gray-300 hover:border-gray-400'
        }`}
      >
        {checked && <Check className="w-3 h-3 text-white stroke-[3]" />}
      </div>
      <span className="text-xs text-gray-600 leading-relaxed">
        {label}
      </span>
    </label>
  );
};