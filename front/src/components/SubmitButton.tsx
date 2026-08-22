import React from 'react';

interface SubmitButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className="w-full h-12 bg-black text-white font-medium text-md rounded-xl hover:bg-gray-900 transition-colors mt-4 disabled:opacity-50"
    >
      {children}
    </button>
  );
};