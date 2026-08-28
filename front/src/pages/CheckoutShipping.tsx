import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutSteps } from '../components/Checkout/CheckoutSteps';
import { CheckoutOrderSummary } from '../components/Checkout/CheckoutOrderSummary';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import { ArrowLeft, User, Mail, Phone, MapPin, Building, Globe } from 'lucide-react';

export const CheckoutShipping: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep] = useState<number>(1);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'overnight'>('standard');
  const [saveInfo, setSaveInfo] = useState(false);

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/checkout-payment');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => navigate('/cart')}
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
        <div className="max-w-md mx-auto space-y-6">
          <form onSubmit={handleContinueToPayment} className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
                <MapPin className="w-4 h-4 text-black" />
                <h2 className="text-sm font-bold text-black">Shipping Information</h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="First Name *"
                  placeholder="First name"
                  icon={<User className="w-4 h-4" />}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  label="Last Name *"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <Input
                label="Email Address *"
                type="email"
                placeholder="Enter your email"
                icon={<Mail className="w-4 h-4" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Phone Number"
                placeholder="Phone number"
                icon={<Phone className="w-4 h-4" />}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <Input
                label="Address *"
                placeholder="Street address"
                icon={<MapPin className="w-4 h-4" />}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <Input
                label="Apartment, suite, etc. (optional)"
                placeholder="Apartment, suite, unit, etc."
                icon={<Building className="w-4 h-4" />}
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="City *"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <Input
                  label="ZIP Code *"
                  placeholder="ZIP code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">State *</label>
                <div className="relative">
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full h-11 px-3 bg-white border border-gray-300 rounded-xl text-sm text-black focus:outline-none focus:ring-0 appearance-none"
                  >
                    <option value="">Select state</option>
                    <option value="NY">New York</option>
                    <option value="CA">California</option>
                    <option value="TX">Texas</option>
                  </select>
                  <Globe className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-black">Shipping Method</h3>

              <div className="space-y-3">
                <div
                  onClick={() => setShippingMethod('standard')}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer transition-all select-none bg-white"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      shippingMethod === 'standard' ? 'border-black bg-black text-white' : 'border-gray-300 bg-white'
                    }`}>
                      {shippingMethod === 'standard' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-black">Standard Shipping</p>
                      <p className="text-[11px] text-gray-500">5-7 business days</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-black">Free</span>
                </div>

                <div
                  onClick={() => setShippingMethod('express')}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer transition-all select-none bg-white"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      shippingMethod === 'express' ? 'border-black bg-black text-white' : 'border-gray-300 bg-white'
                    }`}>
                      {shippingMethod === 'express' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-black">Express Shipping</p>
                      <p className="text-[11px] text-gray-500">2-3 business days</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-black">$9.99</span>
                </div>

                <div
                  onClick={() => setShippingMethod('overnight')}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer transition-all select-none bg-white"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      shippingMethod === 'overnight' ? 'border-black bg-black text-white' : 'border-gray-300 bg-white'
                    }`}>
                      {shippingMethod === 'overnight' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-black">Overnight Shipping</p>
                      <p className="text-[11px] text-gray-500">Next business day</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-black">$24.99</span>
                </div>
              </div>

              <div className="pt-2">
                <Checkbox
                  checked={saveInfo}
                  onChange={() => setSaveInfo(!saveInfo)}
                  label="Save this information for next time"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-black text-white rounded-xl font-medium text-sm flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer mt-4 outline-none focus:outline-none"
              >
                Continue to Payment
              </button>
            </div>
          </form>

          <CheckoutOrderSummary shippingMethod={shippingMethod} />
        </div>
      </main>
    </div>
  );
};