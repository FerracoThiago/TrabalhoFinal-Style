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

const CheckoutContext = createContext<CheckoutContextData | undefined>(
  undefined
);

interface CheckoutProviderProps {
  children: ReactNode;
}

export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({
  children,
}) => {
  const [shippingData, setShippingData] = useState<ShippingData>({
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
  });

  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardLastFour: '',
    expiryDate: '',
    nameOnCard: '',
    billingAddress: 'same',
  });

  /*
   * Valores atuais do pedido.
   * Depois podemos conectar esses valores diretamente
   * aos produtos do Cart.
   */
  const subtotal = 137.00;
  const savings = 81.00;
  const tax = 10.96;

  const shippingCosts: Record<ShippingMethod, number> = {
    standard: 0,
    express: 9.99,
    overnight: 24.99,
  };

  const shippingCost =
    shippingCosts[shippingData.shippingMethod];

  const total = useMemo(() => {
    return subtotal - savings + shippingCost + tax;
  }, [subtotal, savings, shippingCost, tax]);

  const clearCheckout = () => {
    setShippingData({
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
    });

    setPaymentData({
      cardLastFour: '',
      expiryDate: '',
      nameOnCard: '',
      billingAddress: 'same',
    });
  };

  return (
    <CheckoutContext.Provider
      value={{
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
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = (): CheckoutContextData => {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error(
      'useCheckout deve ser usado dentro de um CheckoutProvider'
    );
  }

  return context;
};
