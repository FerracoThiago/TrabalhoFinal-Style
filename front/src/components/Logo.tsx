import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-6' }) => {
  return (
    <div className={`flex items-center space-x-2 select-none ${className}`}>
      <div className="bg-black text-white font-bold px-2 py-0.5 rounded text-sm tracking-widest">
        S
      </div>
      <span className="font-bold tracking-wider text-black text-base">
        STYLE
      </span>
    </div>
  );
};