import React from 'react';

import { Lock, RotateCcw } from 'lucide-react';

interface CheckoutOrderItem {
  id: number;
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  oldPrice?: number;
  image?: string;
}

interface CheckoutOrderSummaryProps {
  items?: CheckoutOrderItem[];
  subtotal?: number;
  savings?: number;
  tax?: number;
  shippingMethod: 'standard' | 'express' | 'overnight';
}

export const CheckoutOrderSummary: React.FC<
  CheckoutOrderSummaryProps
> = ({
  items = [],
  subtotal = 0,
  savings = 0,
  tax = 0,
  shippingMethod,
}) => {
  const shippingCosts = {
    standard: 0,
    express: 9.99,
    overnight: 24.99,
  };

  const shipping = shippingCosts[shippingMethod];

  const total = subtotal - savings + shipping + tax;

  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <h2 className="text-lg font-bold text-black mb-4">
        Order Summary
      </h2>

      <div className="space-y-4 mb-6">
        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-3"
            >
              <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-xs font-medium">
                    Img
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold text-black truncate">
                  {item.name}
                </h4>

                <p className="text-[11px] text-gray-500">
                  {item.size} • {item.color} • Qty: {item.quantity}
                </p>

                <div className="flex items-center space-x-2 mt-0.5">
                  <span className="text-xs font-bold text-black">
                    ${item.price.toFixed(2)}
                  </span>

                  {item.oldPrice !== undefined &&
                    item.oldPrice > item.price && (
                      <span className="text-[11px] text-gray-400 line-through">
                        ${item.oldPrice.toFixed(2)}
                      </span>
                    )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-xs text-gray-500 text-center py-4">
            Nenhum produto no pedido.
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 pt-4 space-y-2 text-xs">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>

          <span className="font-medium text-black">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-emerald-600">
          <span>Savings</span>

          <span className="font-medium">
            -${Math.abs(savings).toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>

          <span className="font-medium text-black">
            {shipping === 0
              ? 'Free'
              : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Tax</span>

          <span className="font-medium text-black">
            ${tax.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
        <span className="text-sm font-bold text-black">
          Total
        </span>

        <span className="text-base font-bold text-black">
          ${total.toFixed(2)}
        </span>
      </div>

      <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-gray-50 text-[11px] text-gray-400">
        <div className="flex items-center space-x-1.5">
          <Lock className="w-3.5 h-3.5" />
          <span>Secure</span>
        </div>

        <div className="flex items-center space-x-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Free Returns</span>
        </div>
      </div>
    </div>
  );
};