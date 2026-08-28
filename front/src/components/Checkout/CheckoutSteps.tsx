import React from 'react';
import { CheckoutStep } from './CheckoutStep';
import { MapPin, CreditCard, Check } from 'lucide-react';

interface CheckoutStepsProps {
  currentStep: number;
}

export const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Shipping', icon: <MapPin className="w-4 h-4" /> },
    { number: 2, label: 'Payment', icon: <CreditCard className="w-4 h-4" /> },
    { number: 3, label: 'Review', icon: <Check className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full flex items-center justify-center my-4">
      <div className="flex items-center justify-between w-full max-w-[320px] px-2 relative">
        {steps.map((step, index) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;

          return (
            <React.Fragment key={step.number}>
              {index > 0 && (
                <div
                  className={`flex-1 h-[2px] mx-3 transition-colors ${
                    currentStep >= step.number ? 'bg-black' : 'bg-gray-200'
                  }`}
                />
              )}
              <CheckoutStep
                number={step.number}
                label={step.label}
                icon={step.icon}
                isActive={isActive}
                isCompleted={isCompleted}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};