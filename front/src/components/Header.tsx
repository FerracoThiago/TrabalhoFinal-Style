import React, { useState } from 'react';
import { Menu, X, Search, Heart, ShoppingBag } from 'lucide-react';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-[rgba(229,231,235,1)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] backdrop-blur-[8px]">
      {/* TopBar */}
      <div className="w-full bg-black text-white text-center py-2 px-4 text-xs font-normal tracking-normal">
        Free shipping on orders over $100 | New arrivals daily
      </div>

      {/* Main Header Container */}
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 h-[72px] flex items-center justify-between">
        
        {/* Mobile: Hamburger + Logo / Desktop: Logo + Nav */}
        <div className="flex items-center space-x-4 md:space-x-8">
          {/* Botão Menu Hamburger (Apenas Mobile) */}
          <button
            type="button"
            aria-label="Abrir Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-[10px] flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-black" /> : <Menu className="w-5 h-5 text-black" />}
          </button>

          <Logo />

          {/* Navegação Desktop (Visível apenas em desktop conforme protótipo) */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-black">
            <a href="#new-in" className="hover:text-gray-600 transition-colors">New In</a>
            <a href="#women" className="hover:text-gray-600 transition-colors">Women</a>
            <a href="#men" className="hover:text-gray-600 transition-colors">Men</a>
            <a href="#sale" className="hover:text-gray-600 transition-colors">Sale</a>
          </nav>
        </div>

        {/* SearchBar Desktop (Visível apenas em desktop) */}
        <div className="hidden lg:flex flex-1 max-w-[384px] mx-8">
          <SearchBar />
        </div>

        {/* Ícones da Direita */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            aria-label="Search"
            className="lg:hidden w-10 h-10 rounded-[10px] flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Search className="w-5 h-5 text-black" />
          </button>

          <button
            type="button"
            aria-label="Wishlist"
            className="w-10 h-10 rounded-[10px] flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Heart className="w-5 h-5 text-black" />
          </button>

          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-black font-semibold text-sm select-none">
            JD
          </div>

          <button
            type="button"
            aria-label="Cart"
            className="w-10 h-10 rounded-[10px] relative flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ShoppingBag className="w-5 h-5 text-black" />
            <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              2
            </span>
          </button>
        </div>
      </div>

      {/* Menu Mobile Dropdown (Hamburger) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-4 space-y-4">
          <div className="pb-2">
            <SearchBar />
          </div>
          <nav className="flex flex-col space-y-3 text-sm font-medium text-black">
            <a href="#new-in" className="py-1 hover:text-gray-600 transition-colors">New In</a>
            <a href="#women" className="py-1 hover:text-gray-600 transition-colors">Women</a>
            <a href="#men" className="py-1 hover:text-gray-600 transition-colors">Men</a>
            <a href="#sale" className="py-1 hover:text-gray-600 transition-colors">Sale</a>
          </nav>
        </div>
      )}
    </header>
  );
};