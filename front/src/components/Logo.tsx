import React from 'react';
import logoHeader from '../assets/images/logo-style-header.svg';
import logoCadastro from '../assets/images/logo-style-cadastro.svg';

interface LogoProps {
  variant?: 'header' | 'auth';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'auth', className = '' }) => {
  const logoSrc = variant === 'header' ? logoHeader : logoCadastro;
  const sizeClasses = variant === 'header' ? 'h-6 sm:h-7' : 'h-10 sm:h-12';

  return (
    <div className={`flex items-center ${sizeClasses} ${className}`}>
      <img src={logoSrc} alt="Style" className="w-auto h-full object-contain" />
    </div>
  );
};