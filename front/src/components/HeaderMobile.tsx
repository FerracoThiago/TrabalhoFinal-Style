import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';

export const HeaderMobile: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="block md:hidden w-full bg-white border-b border-gray-200">
        <div className="w-full bg-black text-white text-[11px] text-center py-1.5 px-4 tracking-wide">
          Free shipping on orders over $100 | New arrivals daily
        </div>

        <div className="px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button 
              type="button" 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-black hover:text-gray-600 focus:outline-none"
              aria-label="Abrir menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div 
              onClick={() => navigate('/')}
              className="flex items-center space-x-1.5 select-none cursor-pointer"
            >
              <div className="bg-black text-white font-bold px-2 py-1 rounded text-sm tracking-widest flex items-center justify-center">
                S
              </div>
              <span className="font-bold tracking-wider text-black text-sm">
                STYLE
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              type="button" 
              className="text-black hover:text-gray-600 transition-colors p-1"
              aria-label="Pesquisar"
            >
              <Search className="w-5 h-5" />
            </button>

            <button 
              type="button" 
              className="text-black hover:text-gray-600 transition-colors p-1"
              aria-label="Favoritos"
            >
              <Heart className="w-5 h-5" />
            </button>

            <button 
              type="button" 
              onClick={() => navigate('/login')}
              className="flex items-center space-x-1 text-black hover:text-gray-600 transition-colors"
              aria-label="Minha Conta"
            >
              <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold">
                JD
              </div>
            </button>

            <button 
              type="button" 
              onClick={() => navigate('/carrinho')}
              className="relative text-black hover:text-gray-600 transition-colors p-1"
              aria-label="Sacola de compras"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                2
              </span>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div 
            className="fixed inset-0 bg-black/50 transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-auto rounded-br-2xl shadow-xl flex flex-col z-10 p-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <span className="font-bold tracking-wider text-black text-lg">MENU</span>
              <button 
                type="button" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-black hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col text-base font-medium text-black">
              <button 
                onClick={() => { setMobileMenuOpen(false); navigate('/new-in'); }} 
                className="text-left py-3 border-b border-gray-200 hover:text-gray-500"
              >
                New In
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); navigate('/women'); }} 
                className="text-left py-3 border-b border-gray-200 hover:text-gray-500"
              >
                Women
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); navigate('/men'); }} 
                className="text-left py-3 border-b border-gray-200 hover:text-gray-500"
              >
                Men
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); navigate('/sale'); }} 
                className="text-left py-3 hover:text-gray-500"
              >
                Sale
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};