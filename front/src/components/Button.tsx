import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = "font-medium rounded-lg transition-colors text-sm flex items-center justify-center cursor-pointer";
  
  const variants = {
    primary: "bg-gray-800 text-white hover:bg-black",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200",
    outline: "border border-gray-300 text-black hover:bg-gray-50"
  };

  return (
    <button
      type="button"
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};