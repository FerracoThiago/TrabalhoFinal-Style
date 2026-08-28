import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { CheckoutSteps } from '../components/Checkout/CheckoutSteps';

import { CheckoutOrderSummary } from '../components/Checkout/CheckoutOrderSummary';

import { Input } from '../components/Input';

import {
  ArrowLeft,
  CreditCard,
  Lock,
  User,
  ShieldCheck,
} from 'lucide-react';

import { useCheckout } from '../components/Checkout/CheckoutContext';

export const CheckoutPayment: React.FC = () => {
  const navigate = useNavigate();

  const {
    shippingData,
    paymentData,
    setPaymentData,
    refreshCart,
  } = useCheckout();

  const currentStep = 2;

  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  const shippingMethod = shippingData.shippingMethod;

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const handleReviewOrder = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError('');

    const requiredShippingFields = [
      shippingData.firstName,
      shippingData.lastName,
      shippingData.email,
      shippingData.address,
      shippingData.city,
      shippingData.state,
      shippingData.zipCode,
    ];

    const hasEmptyShippingField =
      requiredShippingFields.some(
        (field) => !field.trim()
      );

    if (hasEmptyShippingField) {
      navigate('/checkout');
      return;
    }

    const cleanCardNumber = cardNumber.replace(/\D/g, '');
    const cleanCvv = cvv.replace(/\D/g, '');

    if (
      cleanCardNumber.length < 13 ||
      cleanCardNumber.length > 19 ||
      !paymentData.expiryDate.trim() ||
      !cleanCvv ||
      !paymentData.nameOnCard.trim()
    ) {
      setError(
        'Please fill in all required payment fields.'
      );
      return;
    }

    setPaymentData({
      ...paymentData,
      cardLastFour: cleanCardNumber.slice(-4),
    });

    navigate('/checkout-review');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-4 py-4 flex items-center">
          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="p-1 text-black hover:opacity-70 transition-opacity flex items-center cursor-pointer outline-none focus:outline-none"
            aria-label="Voltar para Shipping"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <h1 className="text-xl font-bold text-black ml-3">
            Checkout
          </h1>
        </div>
      </div>

      <div className="w-full flex justify-center py-4">
        <div className="w-full max-w-[360px] px-4">
          <CheckoutSteps currentStep={currentStep} />
        </div>
      </div>

      <main className="flex-1 w-full pb-16 px-4">
        <div className="max-w-[1120px] mx-auto lg:grid lg:grid-cols-[1fr_420px] lg:gap-12 items-start">
          <form
            onSubmit={handleReviewOrder}
            className="space-y-6"
          >
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
                <CreditCard className="w-4 h-4 text-black" />

                <h2 className="text-sm font-bold text-black">
                  Payment Information
                </h2>
              </div>

              <Input
                label="Card Number *"
                placeholder="1234 5678 9012 3456"
                icon={
                  <CreditCard className="w-4 h-4" />
                }
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(e.target.value)
                }
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date *"
                  placeholder="MM/YY"
                  icon={
                    <CreditCard className="w-4 h-4" />
                  }
                  value={paymentData.expiryDate}
                  onChange={(e) =>
                    setPaymentData({
                      ...paymentData,
                      expiryDate: e.target.value,
                    })
                  }
                />

                <Input
                  label="CVV *"
                  placeholder="123"
                  icon={
                    <Lock className="w-4 h-4" />
                  }
                  value={cvv}
                  onChange={(e) =>
                    setCvv(e.target.value)
                  }
                />
              </div>

              <Input
                label="Name on Card *"
                placeholder="Name on card"
                icon={
                  <User className="w-4 h-4" />
                }
                value={paymentData.nameOnCard}
                onChange={(e) =>
                  setPaymentData({
                    ...paymentData,
                    nameOnCard: e.target.value,
                  })
                }
              />

              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-medium text-gray-700">
                  Billing Address
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    setPaymentData({
                      ...paymentData,
                      billingAddress: 'same',
                    })
                  }
                  className="w-full flex items-center space-x-3 cursor-pointer select-none text-left"
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      paymentData.billingAddress ===
                      'same'
                        ? 'border-black bg-black'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {paymentData.billingAddress ===
                      'same' && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    )}
                  </div>

                  <span className="text-xs text-black">
                    Same as shipping address
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setPaymentData({
                      ...paymentData,
                      billingAddress: 'different',
                    })
                  }
                  className="w-full flex items-center space-x-3 cursor-pointer select-none text-left"
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      paymentData.billingAddress ===
                      'different'
                        ? 'border-black bg-black'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {paymentData.billingAddress ===
                      'different' && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    )}
                  </div>

                  <span className="text-xs text-black">
                    Use a different billing address
                  </span>
                </button>
              </div>

              <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 flex items-start space-x-3 mt-4">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />

                <p className="text-xs text-emerald-800">
                  Your payment information is encrypted and secure
                </p>
              </div>

              {error && (
                <p
                  role="alert"
                  className="text-xs text-red-500"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full h-12 bg-black text-white rounded-xl font-medium text-sm flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer mt-6 outline-none focus:outline-none"
              >
                Review Order
              </button>
            </div>
          </form>

          <div className="mt-6 lg:mt-0 lg:sticky lg:top-6">
            <CheckoutOrderSummary
              shippingMethod={shippingMethod}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
