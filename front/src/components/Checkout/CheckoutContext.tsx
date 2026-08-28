import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';

type ShippingMethod = 'standard' | 'express' | 'overnight';

interface ShippingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  shippingMethod: ShippingMethod;
}

interface PaymentData {
  cardLastFour: string;
  expiryDate: string;
  nameOnCard: string;
  billingAddress: 'same' | 'different';
}

interface CheckoutContextData {
  shippingData: ShippingData;
  paymentData: PaymentData;
  subtotal: number;
  savings: number;
  tax: number;
  shippingCost: number;
  total: number;
  setShippingData: (data: ShippingData) => void;
  setPaymentData: (data: PaymentData) => void;
  clearCheckout: () => void;
}

interface CheckoutProviderProps {
  children: ReactNode;
}

const initialShippingData: ShippingData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  apartment: '',
  city: '',
  state: '',
  zipCode: '',
  shippingMethod: 'standard',
};

const initialPaymentData: PaymentData = {
  cardLastFour: '',
  expiryDate: '',
  nameOnCard: '',
  billingAddress: 'same',
};

const shippingCosts: Record<ShippingMethod, number> = {
  standard: 0,
  express: 9.99,
  overnight: 24.99,
};

const CheckoutContext = createContext<
  CheckoutContextData | undefined
>(undefined);

export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({
  children,
}) => {
  const [shippingData, setShippingData] =
    useState<ShippingData>(initialShippingData);

  const [paymentData, setPaymentData] =
    useState<PaymentData>(initialPaymentData);

  /*
   * Valores atuais do pedido.
   * Posteriormente podemos conectar esses valores
   * diretamente aos produtos do Cart.
   */
  const subtotal = 137.00;
  const savings = 81.00;
  const tax = 10.96;

  const shippingCost =
    shippingCosts[shippingData.shippingMethod];

  const total = useMemo(() => {
    return subtotal - savings + shippingCost + tax;
  }, [shippingCost]);

  const clearCheckout = () => {
    setShippingData({
      ...initialShippingData,
    });

    setPaymentData({
      ...initialPaymentData,
    });
  };

  const value = useMemo(
    () => ({
      shippingData,
      paymentData,
      subtotal,
      savings,
      tax,
      shippingCost,
      total,
      setShippingData,
      setPaymentData,
      clearCheckout,
    }),
    [
      shippingData,
      paymentData,
      shippingCost,
      total,
    ]
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = (): CheckoutContextData => {
  const context = useContext(CheckoutContext);

  if (context === undefined) {
    throw new Error(
      'useCheckout deve ser usado dentro de um CheckoutProvider'
    );
  }

  return context;
};
