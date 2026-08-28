import React from 'react';

interface CheckoutStepProps {
  number: number;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  isCompleted: boolean;
}

export const CheckoutStep: React.FC<CheckoutStepProps> = ({
  label,
  icon,
  isActive,
  isCompleted,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          isActive || isCompleted
            ? 'bg-black text-white'
            : 'bg-white text-gray-400 border border-gray-200'
        }`}
      >
        {icon}
      </div>
      <span
        className={`mt-2 text-xs tracking-tight whitespace-nowrap ${
          isActive || isCompleted ? 'text-black font-semibold' : 'text-gray-400 font-normal'
        }`}
      >
        {label}
      </span>
    </div>
  );
};