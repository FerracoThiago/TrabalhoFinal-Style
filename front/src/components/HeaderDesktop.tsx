import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag } from 'lucide-react';

export const HeaderDesktop: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="hidden md:block w-full bg-white border-b border-gray-200">
      <div className="w-full bg-black text-white text-[11px] text-center py-1.5 px-4 tracking-wide">
        Free shipping on orders over $100 | New arrivals daily
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 select-none cursor-pointer"
          >
            <div className="bg-black text-white font-bold px-2.5 py-1 rounded text-sm tracking-widest flex items-center justify-center">
              S
            </div>
            <span className="font-bold tracking-wider text-black text-lg">
              STYLE
            </span>
          </div>
        </div>

        <nav className="flex items-center space-x-8 text-sm font-medium text-black">
          <button onClick={() => navigate('/new-in')} className="hover:text-gray-500 transition-colors">
            New In
          </button>
          <button onClick={() => navigate('/women')} className="hover:text-gray-500 transition-colors">
            Women
          </button>
          <button onClick={() => navigate('/men')} className="hover:text-gray-500 transition-colors">
            Men
          </button>
          <button onClick={() => navigate('/sale')} className="hover:text-gray-500 transition-colors">
            Sale
          </button>
        </nav>

        <div className="flex items-center relative w-72">
          <input 
            type="text" 
            placeholder="Search for products..." 
            className="w-full bg-gray-100 border border-transparent rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-gray-300 transition-colors"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center space-x-6">
          <button 
            type="button" 
            className="text-black hover:text-gray-600 transition-colors"
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
  );
};