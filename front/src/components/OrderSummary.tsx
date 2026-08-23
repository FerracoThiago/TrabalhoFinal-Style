import React from 'react';

interface OrderSummaryProps {
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  onCheckout,
  onContinueShopping,
}) => {
  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 flex flex-col w-full" style={{ gap: '20px' }}>
      <h2 
        className="text-black"
        style={{ 
          fontFamily: 'Segoe UI', 
          fontWeight: 600, 
          fontSize: '24px', 
          lineHeight: '24px', 
          letterSpacing: '-0.6px' 
        }}
      >
        Order Summary
      </h2>

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal (2 items)</span>
          <span className="font-semibold text-black">$186.00</span>
        </div>
        <div className="flex justify-between text-red-600">
          <span>Savings</span>
          <span className="font-semibold">-$121.00</span>
        </div>
        <div className="flex justify-between text-gray-600 items-center">
          <span>Shipping</span>
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded font-medium">Free</span>
        </div>
      </div>

      <hr className="border-gray-100" />

      <div className="flex justify-between text-base font-bold text-black">
        <span>Total</span>
        <span>$186.00</span>
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <button
          type="button"
          onClick={onCheckout}
          className="w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm"
        >
          Proceed to Checkout
        </button>

        <button
          type="button"
          onClick={onContinueShopping}
          className="w-full bg-white border border-gray-200 text-black font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          Continue Shopping
        </button>
      </div>

      <div className="text-center text-[10px] text-gray-400 mt-1 flex flex-col gap-0.5">
        <span>Secure checkout with SSL encryption</span>
        <span>30-day return policy · Free returns</span>
      </div>
    </div>
  );
};