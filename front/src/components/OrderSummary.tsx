import React from 'react';
import { SubmitButton } from './SubmitButton';

interface OrderSummaryProps {
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  onCheckout,
  onContinueShopping,
}) => {
  return (
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
        <SubmitButton onClick={onCheckout}>
          Proceed to Checkout
        </SubmitButton>

        <button
          type="button"
          onClick={onContinueShopping}
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
  );
};