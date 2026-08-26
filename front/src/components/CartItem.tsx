import React from 'react';

import { Heart, Trash2 } from 'lucide-react';

interface CartItemProps {
  image: string;
  name: string;
  style: string;
  size: string;
  color: string;
  price: string;
  oldPrice: string;
  savings: string;
  quantity: number;
  maxQuantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  onSaveForLater?: () => void;
  onRemove?: () => void;
  showDivider?: boolean;
}

export const CartItem: React.FC<CartItemProps> = ({
  image,
  name,
  style,
  size,
  color,
  price,
  oldPrice,
  savings,
  quantity,
  maxQuantity,
  onDecrease,
  onIncrease,
  onSaveForLater,
  onRemove,
  showDivider = true,
}) => {
  const customTypography = {
    fontFamily: 'Segoe UI',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0%',
  };

  return (
    <div className="flex flex-col w-full min-w-0">
      {/* MOBILE */}
      <div className="md:hidden flex flex-col w-full min-w-0">
        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col w-full min-w-0 mt-3">
          <h3
            className="text-black w-full break-words"
            style={{
              fontFamily: 'Segoe UI',
              fontWeight: 600,
              fontSize: '18px',
              lineHeight: '28px',
            }}
          >
            {name}
          </h3>

          <p
            style={{
              ...customTypography,
              color: 'rgba(107, 114, 128, 1)',
            }}
          >
            {style}
          </p>

          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            <span className="text-base font-bold text-black">
              {price}
            </span>

            {oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                {oldPrice}
              </span>
            )}
          </div>

          {savings && (
            <span
              className="font-bold text-white bg-red-600 inline-flex items-center justify-center mt-1 self-start"
              style={{
                width: '71px',
                height: '22px',
                padding: '3px 11px',
                borderRadius: '9999px',
                fontSize: '11px',
                lineHeight: '16px',
              }}
            >
              Save {savings}
            </span>
          )}

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <span
              style={customTypography}
              className="text-gray-600"
            >
              Size: <strong className="text-black">{size}</strong>
            </span>

            <span
              style={customTypography}
              className="text-gray-600"
            >
              Color: <strong className="text-black">{color}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <div
            className="flex items-center justify-between border border-gray-200 bg-white shadow-sm shrink-0"
            style={{
              width: '100px',
              height: '34px',
              paddingLeft: '12px',
              paddingRight: '12px',
              borderRadius: '8px',
            }}
          >
            <button
              type="button"
              onClick={onDecrease}
              className="text-gray-700 hover:text-black font-semibold flex items-center justify-center select-none shrink-0"
              style={{
                fontSize: '15px',
                lineHeight: '1',
                width: '16px',
                height: '16px',
              }}
            >
              −
            </button>

            <span
              className="font-semibold text-black text-center flex-1 select-none"
              style={{
                fontSize: '13px',
                lineHeight: '1',
              }}
            >
              {quantity}
            </span>

            <button
              type="button"
              onClick={onIncrease}
              className="text-gray-700 hover:text-black font-semibold flex items-center justify-center select-none shrink-0"
              style={{
                fontSize: '15px',
                lineHeight: '1',
                width: '16px',
                height: '16px',
              }}
            >
              +
            </button>
          </div>

          <span className="text-[10px] text-gray-400 leading-tight shrink-0">
            Max
            <br />
            {maxQuantity}
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-black font-medium mt-4 w-full">
          <button
            type="button"
            onClick={onSaveForLater}
            className="flex items-center gap-1.5 shrink-0 whitespace-nowrap"
            style={{
              height: '24px',
            }}
          >
            <span
              className="flex-none flex items-center justify-center"
              style={{
                width: '20px',
                height: '20px',
                minWidth: '20px',
                minHeight: '20px',
                overflow: 'visible',
              }}
            >
              <Heart
                size={16}
                strokeWidth={2}
                color="#000000"
                style={{
                  width: '16px',
                  height: '16px',
                  minWidth: '16px',
                  minHeight: '16px',
                  display: 'block',
                  flexShrink: 0,
                  overflow: 'visible',
                }}
              />
            </span>

            <span className="shrink-0">
              Save for Later
            </span>
          </button>

          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1.5 shrink-0 whitespace-nowrap"
            style={{
              height: '24px',
            }}
          >
            <span
              className="flex-none flex items-center justify-center"
              style={{
                width: '20px',
                height: '20px',
                minWidth: '20px',
                minHeight: '20px',
                overflow: 'visible',
              }}
            >
              <Trash2
                size={16}
                strokeWidth={2}
                color="#000000"
                style={{
                  width: '16px',
                  height: '16px',
                  minWidth: '16px',
                  minHeight: '16px',
                  display: 'block',
                  flexShrink: 0,
                  overflow: 'visible',
                }}
              />
            </span>

            <span className="shrink-0">
              Remove
            </span>
          </button>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex gap-4 w-full min-w-0">
        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex justify-between items-start gap-4">
            <div className="min-w-0">
              <h3
                className="text-black"
                style={{
                  fontFamily: 'Segoe UI',
                  fontWeight: 600,
                  fontSize: '18px',
                  lineHeight: '28px',
                }}
              >
                {name}
              </h3>

              <p
                style={{
                  ...customTypography,
                  color: 'rgba(107, 114, 128, 1)',
                }}
              >
                {style}
              </p>
            </div>

            <div className="text-right flex flex-col items-end shrink-0">
              <div className="whitespace-nowrap">
                <span className="text-base font-bold text-black">
                  {price}
                </span>

                {oldPrice && (
                  <span className="text-xs text-gray-400 line-through ml-1.5">
                    {oldPrice}
                  </span>
                )}
              </div>

              {savings && (
                <span
                  className="font-bold text-white bg-red-600 inline-flex items-center justify-center mt-1"
                  style={{
                    width: '71px',
                    height: '22px',
                    padding: '3px 11px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    lineHeight: '16px',
                  }}
                >
                  Save {savings}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <span
              style={customTypography}
              className="text-gray-600"
            >
              Size: <strong className="text-black">{size}</strong>
            </span>

            <span
              style={customTypography}
              className="text-gray-600"
            >
              Color: <strong className="text-black">{color}</strong>
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 mt-3 w-full min-w-0">
            <div className="flex items-center gap-3 shrink-0">
              <div
                className="flex items-center justify-between border border-gray-200 bg-white shadow-sm shrink-0"
                style={{
                  width: '100px',
                  height: '34px',
                  paddingLeft: '12px',
                  paddingRight: '12px',
                  borderRadius: '8px',
                }}
              >
                <button
                  type="button"
                  onClick={onDecrease}
                  className="text-gray-700 hover:text-black font-semibold flex items-center justify-center select-none shrink-0"
                  style={{
                    fontSize: '15px',
                    lineHeight: '1',
                    width: '16px',
                    height: '16px',
                  }}
                >
                  −
                </button>

                <span
                  className="font-semibold text-black text-center flex-1 select-none"
                  style={{
                    fontSize: '13px',
                    lineHeight: '1',
                  }}
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={onIncrease}
                  className="text-gray-700 hover:text-black font-semibold flex items-center justify-center select-none shrink-0"
                  style={{
                    fontSize: '15px',
                    lineHeight: '1',
                    width: '16px',
                    height: '16px',
                  }}
                >
                  +
                </button>
              </div>

              <span className="text-[10px] text-gray-400 leading-tight shrink-0">
                Max
                <br />
                {maxQuantity}
              </span>
            </div>

            <div className="flex items-center gap-5 text-xs text-black font-medium shrink-0 whitespace-nowrap">
              <button
                type="button"
                onClick={onSaveForLater}
                className="flex items-center gap-1.5 hover:opacity-75 transition-opacity shrink-0 whitespace-nowrap"
                style={{
                  minWidth: '112px',
                  height: '24px',
                  overflow: 'visible',
                }}
              >
                <span
                  className="flex-none"
                  style={{
                    width: '20px',
                    height: '20px',
                    minWidth: '20px',
                    minHeight: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'visible',
                  }}
                >
                  <Heart
                    size={16}
                    strokeWidth={2}
                    color="#000000"
                    style={{
                      width: '16px',
                      height: '16px',
                      minWidth: '16px',
                      minHeight: '16px',
                      display: 'block',
                      flexShrink: 0,
                      overflow: 'visible',
                    }}
                  />
                </span>

                <span className="shrink-0">
                  Save for Later
                </span>
              </button>

              <button
                type="button"
                onClick={onRemove}
                className="flex items-center gap-1.5 hover:opacity-75 transition-opacity shrink-0 whitespace-nowrap"
                style={{
                  minWidth: '75px',
                  height: '24px',
                  overflow: 'visible',
                }}
              >
                <span
                  className="flex-none"
                  style={{
                    width: '20px',
                    height: '20px',
                    minWidth: '20px',
                    minHeight: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'visible',
                  }}
                >
                  <Trash2
                    size={16}
                    strokeWidth={2}
                    color="#000000"
                    style={{
                      width: '16px',
                      height: '16px',
                      minWidth: '16px',
                      minHeight: '16px',
                      display: 'block',
                      flexShrink: 0,
                      overflow: 'visible',
                    }}
                  />
                </span>

                <span className="shrink-0">
                  Remove
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDivider && (
        <div className="my-6 border-b border-gray-100 w-full" />
      )}
    </div>
  );
};
