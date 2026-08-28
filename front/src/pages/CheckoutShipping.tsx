import React from 'react';

import { useNavigate } from 'react-router-dom';

import { CheckoutSteps } from '../components/Checkout/CheckoutSteps';

import { CheckoutOrderSummary } from '../components/Checkout/CheckoutOrderSummary';

import { Input } from '../components/Input';

import { Checkbox } from '../components/Checkbox';

import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Globe,
} from 'lucide-react';

import { useCheckout } from '../components/Checkout/CheckoutContext';

export const CheckoutShipping: React.FC = () => {
  const navigate = useNavigate();

  const {
    shipping,
    setShipping,
    shippingMethod,
    setShippingMethod,
  } = useCheckout();

  const currentStep = 1;

  const handleContinueToPayment = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const requiredFields = [
      shipping.firstName,
      shipping.lastName,
      shipping.email,
      shipping.address,
      shipping.city,
      shipping.state,
      shipping.zipCode,
    ];

    const hasEmptyField = requiredFields.some(
      (field) => !field.trim()
    );

    if (hasEmptyField) {
      window.alert(
        'Preencha todos os campos obrigatórios antes de continuar.'
      );
      return;
    }

    navigate('/checkout-payment');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header do Checkout */}
      <div className="w-full border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-4 py-4 flex items-center">
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="p-1 text-black hover:opacity-70 transition-opacity flex items-center cursor-pointer outline-none focus:outline-none"
            aria-label="Voltar para o carrinho"
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
          {/* Shipping */}
          <form
            onSubmit={handleContinueToPayment}
            className="space-y-6"
          >
            {/* Shipping Information */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
                <MapPin className="w-4 h-4 text-black" />

                <h2 className="text-sm font-bold text-black">
                  Shipping Information
                </h2>
              </div>

              {/* Nome */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name *"
                  placeholder="First name"
                  icon={<User className="w-4 h-4" />}
                  value={shipping.firstName}
                  onChange={(e) =>
                    setShipping({
                      ...shipping,
                      firstName: e.target.value,
                    })
                  }
                />

                <Input
                  label="Last Name *"
                  placeholder="Last name"
                  value={shipping.lastName}
                  onChange={(e) =>
                    setShipping({
                      ...shipping,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>

              {/* Email */}
              <Input
                label="Email Address *"
                type="email"
                placeholder="Enter your email"
                icon={<Mail className="w-4 h-4" />}
                value={shipping.email}
                onChange={(e) =>
                  setShipping({
                    ...shipping,
                    email: e.target.value,
                  })
                }
              />

              {/* Telefone */}
              <Input
                label="Phone Number"
                placeholder="Phone number"
                icon={<Phone className="w-4 h-4" />}
                value={shipping.phone}
                onChange={(e) =>
                  setShipping({
                    ...shipping,
                    phone: e.target.value,
                  })
                }
              />

              {/* Endereço */}
              <Input
                label="Address *"
                placeholder="Street address"
                icon={<MapPin className="w-4 h-4" />}
                value={shipping.address}
                onChange={(e) =>
                  setShipping({
                    ...shipping,
                    address: e.target.value,
                  })
                }
              />

              {/* Apartamento */}
              <Input
                label="Apartment, suite, etc. (optional)"
                placeholder="Apartment, suite, unit, etc."
                icon={<Building className="w-4 h-4" />}
                value={shipping.apartment}
                onChange={(e) =>
                  setShipping({
                    ...shipping,
                    apartment: e.target.value,
                  })
                }
              />

              {/* Cidade / Estado / CEP */}
              <div className="grid grid-cols-3 gap-4">
                <Input
                  label="City *"
                  placeholder="City"
                  value={shipping.city}
                  onChange={(e) =>
                    setShipping({
                      ...shipping,
                      city: e.target.value,
                    })
                  }
                />

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    State *
                  </label>

                  <div className="relative">
                    <select
                      value={shipping.state}
                      onChange={(e) =>
                        setShipping({
                          ...shipping,
                          state: e.target.value,
                        })
                      }
                      className="w-full h-11 px-3 bg-white border border-gray-300 rounded-xl text-sm text-black focus:outline-none focus:ring-0 appearance-none"
                    >
                      <option value="">
                        Select state
                      </option>

                      <option value="NY">
                        New York
                      </option>

                      <option value="CA">
                        California
                      </option>

                      <option value="TX">
                        Texas
                      </option>
                    </select>

                    <Globe className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <Input
                  label="ZIP Code *"
                  placeholder="ZIP code"
                  value={shipping.zipCode}
                  onChange={(e) =>
                    setShipping({
                      ...shipping,
                      zipCode: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-black">
                Shipping Method
              </h3>

              <div className="space-y-3">
                {/* Standard */}
                <button
                  type="button"
                  onClick={() =>
                    setShippingMethod('standard')
                  }
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer transition-all select-none bg-white text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        shippingMethod === 'standard'
                          ? 'border-black bg-black'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {shippingMethod === 'standard' && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-black">
                        Standard Shipping
                      </p>

                      <p className="text-[11px] text-gray-500">
                        5-7 business days
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-black">
                    Free
                  </span>
                </button>

                {/* Express */}
                <button
                  type="button"
                  onClick={() =>
                    setShippingMethod('express')
                  }
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer transition-all select-none bg-white text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        shippingMethod === 'express'
                          ? 'border-black bg-black'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {shippingMethod === 'express' && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-black">
                        Express Shipping
                      </p>

                      <p className="text-[11px] text-gray-500">
                        2-3 business days
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-black">
                    $9.99
                  </span>
                </button>

                {/* Overnight */}
                <button
                  type="button"
                  onClick={() =>
                    setShippingMethod('overnight')
                  }
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer transition-all select-none bg-white text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        shippingMethod === 'overnight'
                          ? 'border-black bg-black'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {shippingMethod === 'overnight' && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-black">
                        Overnight Shipping
                      </p>

                      <p className="text-[11px] text-gray-500">
                        Next business day
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-black">
                    $24.99
                  </span>
                </button>
              </div>

              {/* Salvar informações */}
              <div className="pt-2">
                <Checkbox
                  checked={shipping.saveInfo}
                  onChange={() =>
                    setShipping({
                      ...shipping,
                      saveInfo: !shipping.saveInfo,
                    })
                  }
                  label="Save this information for next time"
                />
              </div>

              {/* Continuar */}
              <button
                type="submit"
                className="w-full h-12 bg-black text-white rounded-xl font-medium text-sm flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer mt-4 outline-none focus:outline-none"
              >
                Continue to Payment
              </button>
            </div>
          </form>

          {/* Order Summary */}
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