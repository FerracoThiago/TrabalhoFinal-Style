import React from 'react';
import { Menu, Search, Heart, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white border-b border-gray-200">
      {/* 1. Anúncio Superior (Único para Desktop e Mobile) */}
      <div className="w-full bg-black text-white py-1.5 px-4 text-center text-xs sm:text-sm">
        Free shipping on orders over $100 | New arrivals daily
      </div>

      {/* 2. Barra de Navegação Principal (Responsiva sem duplicação) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Esquerda: Menu (Apenas Mobile) + Logo (Ambos) */}
        <div className="flex items-center gap-3 sm:gap-6">
          <button aria-label="Menu" className="md:hidden text-gray-700">
            <Menu className="w-5 h-5" />
          </button>

          <div 
            className="cursor-pointer shrink-0" 
            onClick={() => navigate('/')} 
            style={{ width: "76px", height: "32px" }}
          >
            <Logo variant="header" className="h-full w-full object-contain" />
          </div>
        </div>

        {/* Centro: Links de Navegação (Apenas Desktop) */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-black shrink-0">
          <button onClick={() => navigate('/new-in')} className="hover:opacity-75">New In</button>
          <button onClick={() => navigate('/women')} className="hover:opacity-75">Women</button>
          <button onClick={() => navigate('/men')} className="hover:opacity-75">Men</button>
          <button onClick={() => navigate('/sale')} className="hover:opacity-75">Sale</button>
        </nav>
        
        {/* Centro/Esquerda: Barra de Pesquisa (Apenas Desktop) */}
        <div className="hidden md:block flex-1 max-w-md mx-4">
          <SearchBar 
            placeholder="Search for products..." 
            value="" 
            onChange={() => {}} 
          />
        </div>

        {/* Direita: Ícones de Ação (Responsivo) */}
        <div className="flex items-center space-x-4 sm:space-x-6 text-gray-700 shrink-0">
          <Search className="w-5 h-5 md:hidden cursor-pointer" />
          <Heart className="w-5 h-5 cursor-pointer hover:opacity-75" />
          
          <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-black">
            JD
          </div>
          
          <button
            type="button"
            aria-label="Shopping Cart"
            onClick={() => navigate('/cart')}
            className="relative cursor-pointer text-gray-700 hover:opacity-75"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              2
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;