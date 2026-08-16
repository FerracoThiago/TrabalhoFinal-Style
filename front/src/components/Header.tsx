import React from 'react';
import { Menu, Search, Heart, ShoppingBag } from 'lucide-react';
import { TopBar } from './Header/TopBar';
import logoHeader from '../../assets/images/logo-style-header.svg';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <TopBar />

      <div className="w-full max-w-[390px] mx-auto px-4 h-[57px] flex items-center justify-between">
        <button
          type="button"
          aria-label="Menu"
          className="w-10 h-10 rounded-[10px] flex items-center justify-center bg-transparent hover:bg-gray-50 transition-colors"
        >
          <Menu className="w-5 h-5 text-black" />
        </button>

        <div className="flex items-center justify-center">
          <img 
            src={logoHeader} 
            alt="STYLE Logo" 
            className="h-6 object-contain"
          />
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            aria-label="Search"
            className="w-10 h-10 rounded-[10px] flex items-center justify-center bg-transparent hover:bg-gray-50 transition-colors"
          >
            <Search className="w-5 h-5 text-black" />
          </button>

          <button
            type="button"
            aria-label="Wishlist"
            className="w-10 h-10 rounded-[10px] flex items-center justify-center bg-transparent hover:bg-gray-50 transition-colors"
          >
            <Heart className="w-5 h-5 text-black" />
          </button>

          <div 
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-black font-semibold text-sm select-none"
            style={{
              paddingTop: '8px',
              paddingRight: '16px',
              paddingBottom: '8px',
              paddingLeft: '16px',
            }}
          >
            JD
          </div>

          <button
            type="button"
            aria-label="Cart"
            className="w-10 h-10 rounded-[10px] relative flex items-center justify-center bg-transparent hover:bg-gray-50 transition-colors"
          >
            <ShoppingBag className="w-5 h-5 text-black" />
            <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              2
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};