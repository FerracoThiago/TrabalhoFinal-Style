import React from 'react';
import { Menu, Search, Heart, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full">
      {/* --- MOBILE COMPONENT --- */}
      <div className="block md:hidden w-full">
        <div className="w-full bg-black text-white py-1 px-4 text-center text-[14px]">
          Free shipping on orders over $100 | New arrivals daily
        </div>
        <div className="w-full bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between">
          <div className="flex items-center gap-5 text-gray-700">
            <button aria-label="Menu" className="text-gray-700">
              <Menu className="w-6 h-6" />
            </button>
            <div style={{ width: "76px", height: "32px" }}>
              <Logo variant="header" className="h-full w-full object-contain" />
            </div>
          </div>
          <div className="flex items-center gap-8 space-x-3 text-gray-700">
            <Search className="w-5 h-5" />
            <Heart className="w-5 h-5" />
            <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold">JD</div>
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- DESKTOP COMPONENT --- */}
      <div className="hidden md:block w-full bg-white border-b border-gray-200">
        <div className="w-full bg-black text-white text-[11px] text-center py-1.5 px-4 tracking-wide">
          Free shipping on orders over $100 | New arrivals daily
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          <div className="cursor-pointer shrink-0" onClick={() => navigate('/')} style={{ width: "76px", height: "32px", paddingLeft: "8px" }}>
            <Logo variant="header" className="h-full w-full object-contain" />
          </div>
          <nav className="flex items-center space-x-8 text-sm font-medium text-black shrink-0">
            <button onClick={() => navigate('/new-in')}>New In</button>
            <button onClick={() => navigate('/women')}>Women</button>
            <button onClick={() => navigate('/men')}>Men</button>
            <button onClick={() => navigate('/sale')}>Sale</button>
          </nav>
          
          <div className="flex-1 max-w-md mx-4">
            <SearchBar 
              placeholder="Search for products..." 
              value="" 
              onChange={() => {}} 
            />
          </div>

          <div className="flex items-center space-x-6 shrink-0">
            <Heart className="w-5 h-5 cursor-pointer" />
            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold">JD</div>
            <div className="relative cursor-pointer"><ShoppingBag className="w-5 h-5" /><span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;