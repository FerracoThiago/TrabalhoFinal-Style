import React from 'react';

import { Button } from './Button';

interface OrderSummaryProps {
  subtotalItems?: number;
  subtotal?: number;
  savings?: number;
  shipping?: number;
  total?: number;
  onCheckout?: () => void;
  onContinueShopping?: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotalItems = 0,
  subtotal = 0,
  savings = 0,
  shipping = 0,
  total = 0,
  onCheckout,
  onContinueShopping,
}) => {
  const safeSubtotalItems = Number(subtotalItems) || 0;
  const safeSubtotal = Number(subtotal) || 0;
  const safeSavings = Math.max(Number(savings) || 0, 0);
  const safeShipping = Math.max(Number(shipping) || 0, 0);
  const safeTotal = Number(total) || 0;

  return (
    <div
      className="bg-white border border-gray-100 shadow-sm rounded-xl flex flex-col w-full"
      style={{
        maxWidth: '434.66px',
        paddingTop: '25px',
        paddingRight: '20px',
        paddingBottom: '25px',
        paddingLeft: '20px',
        gap: '24px',
      }}
    >
      <h2
        className="text-black"
        style={{
          fontFamily: 'Segoe UI',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '24px',
          letterSpacing: '-0.6px',
        }}
      >
        Order Summary
      </h2>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">
            Subtotal ({safeSubtotalItems}{' '}
            {safeSubtotalItems === 1 ? 'item' : 'items'})
          </span>

          <span className="font-semibold text-black">
            ${safeSubtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-red-500">
            Savings
          </span>

          <span className="font-semibold text-red-500">
            -${safeSavings.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">
              Shipping
            </span>

            {safeShipping === 0 && (
              <span className="bg-gray-100 text-black text-[10px] font-semibold px-2 py-0.5 rounded">
                Free
              </span>
            )}
          </div>

          <span className="font-semibold text-black">
            ${safeShipping.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-100" />

      <div className="flex justify-between items-center">
        <span className="font-bold text-black text-base">
          Total
        </span>

        <span className="font-bold text-black text-base">
          ${safeTotal.toFixed(2)}
        </span>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        <Button
          variant="primary"
          fullWidth
          onClick={onCheckout}
          className="h-12"
        >
          Proceed to Checkout
        </Button>

        <Button
          variant="outline"
          fullWidth
          onClick={onContinueShopping}
          className="h-12"
        >
          Continue Shopping
        </Button>
      </div>

      <div className="text-center flex flex-col gap-1 mt-2">
        <p className="text-[10px] text-gray-400">
          Secure checkout with SSL encryption
        </p>

        <p className="text-[10px] text-gray-400">
          30-day return policy - Free returns
        </p>
      </div>
    </div>
  );
};