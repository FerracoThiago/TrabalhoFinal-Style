import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutSteps } from '../components/Checkout/CheckoutSteps';
import { CheckoutOrderSummary } from '../components/Checkout/CheckoutOrderSummary';
import { ArrowLeft, Lock } from 'lucide-react';

export const CheckoutReview: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep] = useState<number>(3);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/checkout-success');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => navigate('/checkout-payment')}
            className="p-1 text-black hover:opacity-70 transition-opacity flex items-center cursor-pointer outline-none focus:outline-none"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-black ml-3">Checkout</h1>
        </div>
      </div>

      <div className="w-full flex justify-center py-4">
        <div className="w-full max-w-[360px] px-4">
          <CheckoutSteps currentStep={currentStep} />
        </div>
      </div>

      <main className="flex-1 w-full pb-16 px-4">
        <div className="max-w-[1120px] mx-auto lg:grid lg:grid-cols-[1fr_420px] lg:gap-12 items-start">
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
              <h2 className="text-sm font-bold text-black pb-2 border-b border-gray-100">
                Review Your Order
              </h2>

              <div className="space-y-6 text-xs text-black">
                <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                  <div className="space-y-1">
                    <p className="font-bold text-black text-sm">Shipping Address</p>
                    <p className="text-gray-600">Gabriel Ayres</p>
                    <p className="text-gray-600">Rua Piauí, 405</p>
                    <p className="text-gray-600">234</p>
                    <p className="text-gray-600">São João de Meriti, TX 25515-180</p>
                    <p className="text-gray-600">gabrielar.fort@gmail.com</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/checkout-shipping')}
                    className="font-medium text-black hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>

                <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                  <div className="space-y-1">
                    <p className="font-bold text-black text-sm">Payment Method</p>
                    <p className="text-gray-600">•••• •••• •••• 4234</p>
                    <p className="text-gray-600">432</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/checkout-payment')}
                    className="font-medium text-black hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>

                <div className="space-y-1">
                  <p className="font-bold text-black text-sm">Shipping Method</p>
                  <p className="text-gray-600">Standard Shipping - 5-7 business days</p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-black text-white rounded-xl font-medium text-sm flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer mt-6 outline-none focus:outline-none space-x-2"
              >
                <Lock className="w-4 h-4" />
                <span>Place Order - $147.96</span>
              </button>
            </div>
          </form>

          <div className="mt-6 lg:mt-0 lg:sticky lg:top-6">
            <CheckoutOrderSummary shippingMethod="standard" />
          </div>
        </div>
      </main>
    </div>
  );
};