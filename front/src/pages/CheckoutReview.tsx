import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutSteps } from '../components/Checkout/CheckoutSteps';
import { CheckoutOrderSummary } from '../components/Checkout/CheckoutOrderSummary';
import { useCheckout } from '../components/Checkout/CheckoutContext';
import { ArrowLeft, Lock } from 'lucide-react';

export const CheckoutReview: React.FC = () => {
  const navigate = useNavigate();

  const {
    shippingData,
    paymentData,
    shippingCost,
  } = useCheckout();

  const currentStep = 3;

  const handlePlaceOrder = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Verifica se os dados de Shipping existem
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
        (field) => !field || !field.trim()
      );

    if (hasEmptyShippingField) {
      navigate('/checkout');
      return;
    }

    // Verifica se os dados de Payment existem
    const hasEmptyPaymentField =
      !paymentData.cardLastFour ||
      !paymentData.expiryDate ||
      !paymentData.nameOnCard;

    if (hasEmptyPaymentField) {
      navigate('/checkout-payment');
      return;
    }

    // Pedido finalizado
    window.alert('Order placed successfully!');

    navigate('/home');
  };

  const getShippingMethodLabel = () => {
    switch (shippingData.shippingMethod) {
      case 'express':
        return 'Express Shipping - 2-3 business days';

      case 'overnight':
        return 'Overnight Shipping - Next business day';

      case 'standard':
      default:
        return 'Standard Shipping - 5-7 business days';
    }
  };

  const maskedCardNumber =
    paymentData.cardLastFour &&
    paymentData.cardLastFour.length > 0
      ? `•••• •••• •••• ${paymentData.cardLastFour}`
      : 'Card information not available';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="w-full border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-4 py-4 flex items-center">
          <button
            type="button"
            onClick={() => navigate('/checkout-payment')}
            className="p-1 text-black hover:opacity-70 transition-opacity flex items-center cursor-pointer outline-none focus:outline-none"
            aria-label="Voltar para Payment"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <h1 className="text-xl font-bold text-black ml-3">
            Checkout
          </h1>
        </div>
      </div>

      {/* Steps */}
      <div className="w-full flex justify-center py-4">
        <div className="w-full max-w-[360px] px-4">
          <CheckoutSteps currentStep={currentStep} />
        </div>
      </div>

      {/* Conteúdo */}
      <main className="flex-1 w-full pb-16 px-4">
        <div className="max-w-[1120px] mx-auto lg:grid lg:grid-cols-[1fr_420px] lg:gap-12 items-start">
          {/* Review */}
          <form
            onSubmit={handlePlaceOrder}
            className="space-y-6"
          >
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
              <h2 className="text-sm font-bold text-black pb-2 border-b border-gray-100">
                Review Your Order
              </h2>

              <div className="space-y-6 text-xs text-black">
                {/* Shipping Address */}
                <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                  <div className="space-y-1">
                    <p className="font-bold text-black text-sm">
                      Shipping Address
                    </p>

                    <p className="text-gray-600">
                      {shippingData.firstName}{' '}
                      {shippingData.lastName}
                    </p>

                    <p className="text-gray-600">
                      {shippingData.address}
                    </p>

                    {shippingData.apartment && (
                      <p className="text-gray-600">
                        {shippingData.apartment}
                      </p>
                    )}

                    <p className="text-gray-600">
                      {shippingData.city},{' '}
                      {shippingData.state}{' '}
                      {shippingData.zipCode}
                    </p>

                    <p className="text-gray-600">
                      {shippingData.email}
                    </p>

                    {shippingData.phone && (
                      <p className="text-gray-600">
                        {shippingData.phone}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate('/checkout')}
                    className="font-medium text-black hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>

                {/* Payment Method */}
                <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                  <div className="space-y-1">
                    <p className="font-bold text-black text-sm">
                      Payment Method
                    </p>

                    <p className="text-gray-600">
                      {maskedCardNumber}
                    </p>

                    <p className="text-gray-600">
                      Credit Card
                    </p>

                    <p className="text-gray-600">
                      {paymentData.nameOnCard}
                    </p>

                    <p className="text-gray-600">
                      Expiry: {paymentData.expiryDate}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      navigate('/checkout-payment')
                    }
                    className="font-medium text-black hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>

                {/* Shipping Method */}
                <div className="space-y-1">
                  <p className="font-bold text-black text-sm">
                    Shipping Method
                  </p>

                  <p className="text-gray-600">
                    {getShippingMethodLabel()}
                  </p>

                  <p className="text-gray-600">
                    Shipping cost:{' '}
                    {shippingCost === 0
                      ? 'Free'
                      : `$${shippingCost.toFixed(2)}`}
                  </p>
                </div>
              </div>

              {/* Finalizar */}
              <button
                type="submit"
                className="w-full h-12 bg-black text-white rounded-xl font-medium text-sm flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer mt-6 outline-none focus:outline-none space-x-2"
              >
                <Lock className="w-4 h-4" />

                <span>
                  Place Order
                </span>
              </button>
            </div>
          </form>

          {/* Order Summary */}
          <div className="mt-6 lg:mt-0 lg:sticky lg:top-6">
            <CheckoutOrderSummary
              shippingMethod={shippingData.shippingMethod}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
