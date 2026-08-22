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
      <div className="w-full max-w-[390px] mx-auto px-4 py-6 flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => navigate('/login')}
              aria-label="Go back"
              className="text-black hover:opacity-70 transition-opacity"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-black">Shopping Cart</h1>
          </div>
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">
            3 items
          </span>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-6">
          <div className="flex items-center space-x-2 text-sm font-semibold text-black">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Available Items (2)</span>
          </div>

          <div className="flex flex-col space-y-4 pb-6 border-b border-gray-100">
            <div className="flex space-x-3">
              <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                <img src={tshirtImage} alt="Premium Cotton T-Shirt" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-black">Premium Cotton T-Shirt</h3>
                    <div className="text-right">
                      <span className="text-sm font-bold text-black">$29</span>
                      <span className="text-xs text-gray-400 line-through ml-1.5">$49</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">STYLE Premium</p>
                  <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                    <span>Size: M</span>
                    <span>Color: Black</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="inline-block bg-red-50 text-red-500 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    Save $20
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gray-200 rounded-lg px-2.5 py-1 space-x-3 bg-white">
                  <button type="button" onClick={handleDecreaseTshirt} className="text-gray-500 hover:text-black">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-semibold text-black">{tshirtQty}</span>
                  <button type="button" onClick={handleIncreaseTshirt} className="text-gray-500 hover:text-black">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-gray-400">Max 10</span>
              </div>

              <div className="flex items-center space-x-4 text-xs font-medium text-gray-700">
                <button type="button" className="flex items-center space-x-1 hover:text-black">
                  <Heart className="w-3.5 h-3.5" />
                  <span>Save for Later</span>
                </button>
                <button type="button" className="flex items-center space-x-1 text-gray-400 hover:text-red-500">
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex space-x-3">
              <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border border-purple-200">
                <img src={jeansImage} alt="Designer Jeans" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-black">Designer Jeans</h3>
                    <div className="text-right">
                      <span className="text-sm font-bold text-black">$79</span>
                      <span className="text-xs text-gray-400 line-through ml-1.5">$120</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">STYLE Premium</p>
                  <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                    <span>Size: 32</span>
                    <span>Color: Dark Blue</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="inline-block bg-red-50 text-red-500 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    Save $41
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gray-200 rounded-lg px-2.5 py-1 space-x-3 bg-white">
                  <button type="button" onClick={handleDecreaseJeans} className="text-gray-500 hover:text-black">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-semibold text-black">{jeansQty}</span>
                  <button type="button" onClick={handleIncreaseJeans} className="text-gray-500 hover:text-black">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-gray-400">Max 5</span>
              </div>

              <div className="flex items-center space-x-4 text-xs font-medium text-gray-700">
                <button type="button" className="flex items-center space-x-1 hover:text-black">
                  <Heart className="w-3.5 h-3.5" />
                  <span>Save for Later</span>
                </button>
                <button type="button" className="flex items-center space-x-1 text-gray-400 hover:text-red-500">
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-red-100 rounded-2xl p-4 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-sm font-semibold text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span>Out of Stock (1)</span>
          </div>

          <div className="flex space-x-3">
            <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 relative">
              <img src={summerDressImage} alt="Summer Dress" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center p-1">
                <span className="bg-red-400 text-white text-[9px] font-semibold px-2 py-0.5 rounded-md shadow-sm">
                  Out of Stock
                </span>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-gray-800">Summer Dress</h3>
                  <span className="text-sm font-bold text-gray-800">$49</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">STYLE Collection</p>
                <div className="flex items-center space-x-3 text-xs text-gray-400 mt-1">
                  <span>Size: S</span>
                  <span>Color: Floral</span>
                </div>
              </div>

              <div className="mt-2">
                <button
                  type="button"
                  className="border border-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Notify When Available
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 text-xs font-medium text-gray-700 pt-2 border-t border-gray-100">
            <button type="button" className="flex items-center space-x-1 hover:text-black">
              <Heart className="w-3.5 h-3.5" />
              <span>Save for Later</span>
            </button>
            <button type="button" className="flex items-center space-x-1 text-gray-400 hover:text-red-500">
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-sm font-semibold text-black">
            <Tag className="w-4 h-4 text-gray-500" />
            <span>Promo Code</span>
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
            Try: SAVE19, WELCOME29, STUDENT15
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-black">Order Summary</h2>

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