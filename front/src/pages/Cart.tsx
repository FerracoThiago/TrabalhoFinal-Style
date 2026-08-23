import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { CartItem } from '../components/CartItem';
import { OutOfStockItem } from '../components/OutOfStockItem';
import { PromoCode } from '../components/PromoCode';
import { OrderSummary } from '../components/OrderSummary';

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
      {/* Container Principal do Carrinho (O Header já deve estar renderizado no App.tsx ou Layout global) */}
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        
        {/* Título e Botão Voltar */}
        <div className="flex items-center justify-between w-full mx-auto px-1">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => navigate('/login')}
              aria-label="Go back"
              className="text-black hover:opacity-70 transition-opacity flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-black" style={{ fontFamily: 'Segoe UI', fontWeight: 700, fontSize: '24px', lineHeight: '30px' }}>
              Shopping Cart
            </h1>
          </div>

          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0">
            3 items
          </span>
        </div>

        {/* Layout Grid Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start w-full">
          
          {/* Coluna da Esquerda */}
          <div className="flex flex-col gap-6 md:col-span-2 w-full">
            <div 
              className="bg-white border border-gray-100 shadow-sm flex flex-col w-full max-w-[358px] md:max-w-none mx-auto md:mx-0" 
              style={{ 
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

              <div className="flex flex-col w-full" style={{ gap: '24px' }}>
                <CartItem
                  image={tshirtImage}
                  name="Premium Cotton T-Shirt"
                  style="STYLE Premium"
                  size="M"
                  color="Black"
                  price="$29"
                  oldPrice="$49"
                  savings="$20"
                  quantity={tshirtQty}
                  maxQuantity={10}
                  onDecrease={handleDecreaseTshirt}
                  onIncrease={handleIncreaseTshirt}
                  showDivider={true}
                />

                <CartItem
                  image={jeansImage}
                  name="Designer Jeans"
                  style="STYLE Premium"
                  size="32"
                  color="Dark Blue"
                  price="$79"
                  oldPrice="$120"
                  savings="$41"
                  quantity={jeansQty}
                  maxQuantity={5}
                  onDecrease={handleDecreaseJeans}
                  onIncrease={handleIncreaseJeans}
                  showDivider={false}
                />
              </div>
            </div>

            <div className="w-full max-w-[358px] md:max-w-none mx-auto md:mx-0">
              <OutOfStockItem
                image={summerDressImage}
                name="Summer Dress"
                style="STYLE Collection"
                price="$49"
                size="S"
                color="Floral"
              />
            </div>
          </div>

          {/* Coluna da Direita */}
          <div className="flex flex-col gap-6 w-full max-w-[358px] md:max-w-none mx-auto md:mx-0">
            <PromoCode />
            <OrderSummary
              onCheckout={() => {}}
              onContinueShopping={() => navigate('/')}
            />
          </div>

        </div>

      </div>
    </div>
  );
};