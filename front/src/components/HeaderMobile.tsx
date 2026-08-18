import React from "react";
import { Logo } from "./Logo";
import { Menu, Search, Heart, ShoppingBag } from "lucide-react";

export const HeaderMobile: React.FC = () => {
  return (
    <div className="block md:hidden w-full">
      <div 
        className="w-full bg-black text-white py-1 px-4 text-center"
        style={{
          fontFamily: "Segoe UI",
          fontWeight: 400,
          fontStyle: "normal",
          fontSize: "14px",
          lineHeight: "20px",
          letterSpacing: "0%",
        }}
      >
        Free shipping on orders over $100 | New arrivals daily
      </div>

      <header className="w-full bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <button aria-label="Menu" className="text-gray-700 focus:outline-none">
            <Menu className="w-6 h-6" />
          </button>
          <div style={{ width: "76px", height: "32px", paddingLeft: "8px", opacity: 1 }} className="flex items-center">
            <Logo variant="header" className="h-full w-full object-contain" />
          </div>
        </div>

        <div className="flex items-center space-x-3 text-gray-700">
          <button aria-label="Search" className="focus:outline-none">
            <Search className="w-5 h-5" />
          </button>
          <button aria-label="Wishlist" className="focus:outline-none">
            <Heart className="w-5 h-5" />
          </button>
          <button aria-label="Account" className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold text-gray-700 focus:outline-none">
            JD
          </button>
          <button aria-label="Cart" className="relative focus:outline-none">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              2
            </span>
          </button>
        </div>
      </header>
    </div>
  );
};