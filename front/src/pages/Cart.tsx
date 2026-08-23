import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ArrowLeft,
  Minus,
  Plus,
  Heart,
  Trash2,
  AlertCircle,
  Tag,
} from 'lucide-react';

import { Input } from '../components/Input';
import { SubmitButton } from '../components/SubmitButton';

import tshirtImage from '../assets/images/cart-tshirt.png';
import jeansImage from '../assets/images/cart-jeans.png';
import summerDressImage from '../assets/images/cart-summer-dress.png';

export const Cart: React.FC = () => {
  const navigate = useNavigate();

  const [tshirtQty, setTshirtQty] = useState(2);
  const [jeansQty, setJeansQty] = useState(1);

  const handleDecreaseTshirt = () => {
    setTshirtQty((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncreaseTshirt = () => {
    setTshirtQty((prev) => (prev < 10 ? prev + 1 : 10));
  };

  const handleDecreaseJeans = () => {
    setJeansQty((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncreaseJeans = () => {
    setJeansQty((prev) => (prev < 5 ? prev + 1 : 5));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="w-full max-w-[390px] mx-auto px-4 py-6 grid grid-cols-1 gap-6">
        
        {/* Título Shopping Cart */}
        <div className="flex items-center justify-between w-[358px] mx-auto relative px-1">
          <button
            type="button"
            onClick={() => navigate('/login')}
            aria-label="Go back"
            className="text-black hover:opacity-70 transition-opacity flex items-center justify-center z-10"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <h1 className="absolute left-0 right-0 text-center text-black" style={{ fontFamily: 'Segoe UI', fontWeight: 700, fontSize: '24px', lineHeight: '30px' }}>
            Shopping Cart
          </h1>

          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 z-10">
            3 items
          </span>
        </div>

        {/* Container Available Items */}
        <div 
          className="bg-white border border-gray-100 shadow-sm flex flex-col mx-auto justify-between" 
          style={{ 
            width: '358px', 
            height: '743px', 
            paddingTop: '25px', 
            paddingRight: '16px', 
            paddingBottom: '25px', 
            paddingLeft: '16px', 
            gap: '24px', 
            borderRadius: '12px', 
            borderWidth: '1px',
            boxSizing: 'border-box'
          }}
        >
          <div className="flex items-center space-x-2 text-lg font-bold text-black px-1">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span>Available Items (2)</span>
          </div>

          {/* Item 1: T-Shirt */}
          <div className="flex flex-col pb-6 border-b border-gray-100 px-1" style={{ gap: '16px' }}>
            <div className="flex justify-between items-start">
              <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                <img src={tshirtImage} alt="Premium Cotton T-Shirt" className="w-full h-full object-cover" />
              </div>

              <div className="text-right flex flex-col items-end flex-shrink-0">
                <div>
                  <span className="text-sm font-bold text-black">$29</span>
                  <span className="text-xs text-gray-400 line-through ml-1">$49</span>
                </div>
                <div className="mt-1">
                  <span className="inline-block bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    Save $20
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-sm font-bold text-black leading-tight">Premium Cotton T-Shirt</h3>
              <p className="text-xs text-gray-400 mt-0.5">STYLE Premium</p>
              <p className="text-xs text-gray-500 mt-1">Size: M &nbsp;·&nbsp; Color: Black</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gray-200 rounded-lg px-2.5 py-1.5 space-x-3 bg-white">
                  <button type="button" onClick={handleDecreaseTshirt} className="text-black hover:opacity-75">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-semibold text-black">{tshirtQty}</span>
                  <button type="button" onClick={handleIncreaseTshirt} className="text-black hover:opacity-75">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-[10px] text-gray-400 leading-tight">
                  <div>Max</div>
                  <div>10</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-xs font-medium text-black">
                <button type="button" className="flex items-center space-x-1.5 hover:opacity-75">
                  <Heart className="w-4 h-4" />
                  <span>Save for Later</span>
                </button>
                <button type="button" className="flex items-center space-x-1.5 hover:opacity-75">
                  <Trash2 className="w-4 h-4" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>

          {/* Item 2: Jeans */}
          <div className="flex flex-col px-1" style={{ gap: '16px' }}>
            <div className="flex justify-between items-start">
              <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border border-purple-200">
                <img src={jeansImage} alt="Designer Jeans" className="w-full h-full object-cover" />
              </div>

              <div className="text-right flex flex-col items-end flex-shrink-0">
                <div>
                  <span className="text-sm font-bold text-black">$79</span>
                  <span className="text-xs text-gray-400 line-through ml-1">$120</span>
                </div>
                <div className="mt-1">
                  <span className="inline-block bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    Save $41
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-sm font-bold text-black leading-tight">Designer Jeans</h3>
              <p className="text-xs text-gray-400 mt-0.5">STYLE Premium</p>
              <p className="text-xs text-gray-500 mt-1">Size: 32 &nbsp;·&nbsp; Color: Dark Blue</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gray-200 rounded-lg px-2.5 py-1.5 space-x-3 bg-white">
                  <button type="button" onClick={handleDecreaseJeans} className="text-black hover:opacity-75">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-semibold text-black">{jeansQty}</span>
                  <button type="button" onClick={handleIncreaseJeans} className="text-black hover:opacity-75">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-[10px] text-gray-400 leading-tight">
                  <div>Max</div>
                  <div>5</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-xs font-medium text-black">
                <button type="button" className="flex items-center space-x-1.5 hover:opacity-75">
                  <Heart className="w-4 h-4" />
                  <span>Save for Later</span>
                </button>
                <button type="button" className="flex items-center space-x-1.5 hover:opacity-75">
                  <Trash2 className="w-4 h-4" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Out of Stock Container */}
        <div 
          className="bg-white border border-red-100 shadow-sm flex flex-col mx-auto w-[358px]" 
          style={{ borderRadius: '12px', borderWidth: '1px', padding: '25px', gap: '16px' }}
        >
          <div className="flex items-center space-x-2 text-red-600">
            <AlertCircle className="w-6 h-6" />
            <span style={{ fontFamily: 'Segoe UI', fontWeight: 600, fontSize: '24px', lineHeight: '24px', letterSpacing: '-0.6px' }}>
              Out of Stock (1)
            </span>
          </div>

          <div className="flex space-x-3 items-start">
            <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 relative">
              <img src={summerDressImage} alt="Summer Dress" className="w-full h-full object-cover opacity-60 absolute inset-0" />
              <div className="absolute inset-0 flex items-center justify-center p-1 z-10">
                <span className="bg-red-500 text-white text-[9px] font-semibold px-2 py-0.5 rounded-md shadow-sm">
                  Out of Stock
                </span>
              </div>
            </div>

            <div className="flex-1 flex justify-between items-start">
              <div className="flex flex-col">
                <h3 className="text-gray-800" style={{ fontFamily: 'Segoe UI', fontWeight: 600, fontSize: '18px', lineHeight: '28px' }}>
                  Summer Dress
                </h3>
                <p className="text-xs text-gray-400">STYLE Collection</p>
              </div>
              <span className="text-sm font-bold text-gray-800">$49</span>
            </div>
          </div>

          <div>
            <button
              type="button"
              className="border border-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Notify When Available
            </button>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-4 text-xs font-medium text-black">
              <button type="button" className="flex items-center space-x-1.5 hover:opacity-75">
                <Heart className="w-4 h-4" />
                <span>Save for Later</span>
              </button>
              <button type="button" className="flex items-center space-x-1.5 hover:opacity-75">
                <Trash2 className="w-4 h-4" />
                <span>Remove</span>
              </button>
            </div>
          </div>

          <div className="text-xs text-gray-400">
            Size: S &nbsp;·&nbsp; Color: Floral
          </div>
        </div>

        {/* Promo Code Container */}
        <div 
          className="bg-white border border-gray-100 shadow-sm flex flex-col mx-auto w-[358px]" 
          style={{ borderRadius: '12px', borderWidth: '1px', padding: '25px', gap: '12px' }}
        >
          <div className="flex items-center space-x-2 text-lg font-bold text-black">
            <Tag className="w-6 h-6 text-gray-700" strokeWidth={2.5} />
            <span className="text-black font-extrabold text-lg">Promo Code</span>
          </div>

          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                placeholder="Enter promo code"
                value=""
                onChange={() => {}}
              />
            </div>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white text-xs font-semibold px-5 rounded-xl transition-colors h-11"
            >
              Apply
            </button>
          </div>

          <p className="text-[11px] text-gray-400">
            Try: SAVE10, WELCOME20, STUDENT15
          </p>
        </div>

        {/* Order Summary Container */}
        <div 
          className="bg-white border border-gray-100 shadow-sm flex flex-col mx-auto w-[358px]" 
          style={{ borderRadius: '12px', borderWidth: '1px', padding: '25px', gap: '16px' }}
        >
          <h2 className="text-lg font-bold text-black">Order Summary</h2>

          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal (2 items)</span>
              <span className="font-semibold text-black">$186.00</span>
            </div>
            <div className="flex justify-between">
              <span>Savings</span>
              <span className="font-semibold text-emerald-600">-$121.00</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span>Shipping</span>
                <span className="bg-gray-100 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded-md">
                  Free
                </span>
              </div>
              <span className="font-semibold text-black">$0.00</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3 flex justify-between items-center text-sm">
            <span className="font-bold text-black">Total</span>
            <span className="font-bold text-black text-base">$186.00</span>
          </div>

          <div className="space-y-3 pt-2">
            <SubmitButton>
              Proceed to Checkout
            </SubmitButton>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full h-12 border border-gray-300 rounded-xl text-sm font-medium text-black bg-white hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              Continue Shopping
            </button>
          </div>

          <div className="text-center pt-2 space-y-1">
            <p className="text-[11px] text-gray-400">
              Secure checkout with SSL encryption
            </p>
            <p className="text-[11px] text-gray-400">
              30-day return policy · Free returns
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};