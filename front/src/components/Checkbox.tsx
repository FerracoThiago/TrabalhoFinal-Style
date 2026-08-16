import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string | React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <div 
      onClick={onChange}
      className="flex items-start space-x-3 cursor-pointer select-none"
    >
      <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0 ${checked ? 'bg-black border-black text-white' : 'border-gray-300 bg-white'}`}>
        {checked && <Check className="w-3 h-3 stroke-[3]" />}
      </div>
      <span className="text-xs text-black leading-tight">
        {label}
      </span>
    </div>
  );
};