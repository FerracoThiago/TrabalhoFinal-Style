import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';

type ShippingMethod =
  | 'standard'
  | 'express'
  | 'overnight';

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

interface ProductImage {
  id?: number;
  fileName: string;
  productId?: number;
}

interface ProductVariant {
  id: number;
  size: string;
  color: string;
  stock: number;
  productId: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  discount: number | null;
  category: string;
  images: ProductImage[];
  variants: ProductVariant[];
}

interface CartItemData {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  price?: number;
  product?: Product;
}

interface CartData {
  id: number;
  total: number;
  subtotal: number;
  savings: number;
  shipping: number;
  promoCode: string | null;
  userId: number;
  items: CartItemData[];
}

export interface CheckoutCartItem {
  id: number;
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  oldPrice?: number;
  image?: string;
}

interface CheckoutContextData {
  shippingData: ShippingData;
  paymentData: PaymentData;
  cartItems: CheckoutCartItem[];
  subtotalItems: number;
  subtotal: number;
  savings: number;
  tax: number;
  shippingCost: number;
  total: number;
  setShippingData: (data: ShippingData) => void;
  setPaymentData: (data: PaymentData) => void;
  refreshCart: () => Promise<void>;
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

const shippingCosts: Record<
  ShippingMethod,
  number
> = {
  standard: 0,
  express: 9.99,
  overnight: 24.99,
};

const CheckoutContext = createContext<
  CheckoutContextData | undefined
>(undefined);

export const CheckoutProvider: React.FC<
  CheckoutProviderProps
> = ({ children }) => {
  const [shippingData, setShippingData] =
    useState<ShippingData>(initialShippingData);

  const [paymentData, setPaymentData] =
    useState<PaymentData>(initialPaymentData);

  const [cart, setCart] =
    useState<CartData | null>(null);

  const getProductImage = useCallback(
    (product?: Product): string | undefined => {
      if (!product) {
        return undefined;
      }

      const fileName =
        product.images?.[0]?.fileName;

      if (!fileName) {
        return undefined;
      }

      if (
        fileName.startsWith('http://') ||
        fileName.startsWith('https://')
      ) {
        return fileName;
      }

      const cleanFileName = fileName
        .replace(/^\/+/, '')
        .replace(/^uploads\/+/, 'uploads/');

      return `http://localhost:3333/${cleanFileName}`;
    },
    []
  );

  const enrichCartWithProducts = useCallback(
    async (
      cartData: CartData
    ): Promise<CartData> => {
      const itemsWithProducts =
        await Promise.all(
          cartData.items.map(async (item) => {
            if (item.product) {
              return item;
            }

            try {
              const response = await fetch(
                `http://localhost:3333/product/${item.productId}`
              );

              if (!response.ok) {
                return item;
              }

              const productData: Product =
                await response.json();

              return {
                ...item,
                product: productData,
              };
            } catch (error) {
              console.error(
                `Erro ao buscar produto ${item.productId}:`,
                error
              );

              return item;
            }
          })
        );

      return {
        ...cartData,
        items: itemsWithProducts,
      };
    },
    []
  );

  const refreshCart = useCallback(async () => {
    try {
      const token =
        localStorage.getItem('token');

      if (!token) {
        setCart(null);
        return;
      }

      const response = await fetch(
        'http://localhost:3333/cart',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.error(
          'Erro ao buscar carrinho para o checkout.'
        );
        return;
      }

      const data: CartData =
        await response.json();

      const enrichedCart =
        await enrichCartWithProducts(data);

      setCart(enrichedCart);
    } catch (error) {
      console.error(
        'Erro ao carregar carrinho no checkout:',
        error
      );
    }
  }, [enrichCartWithProducts]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  useEffect(() => {
    const handleCartUpdated = () => {
      refreshCart();
    };

    window.addEventListener(
      'cart:updated',
      handleCartUpdated
    );

    return () => {
      window.removeEventListener(
        'cart:updated',
        handleCartUpdated
      );
    };
  }, [refreshCart]);

  const cartItems = useMemo<
    CheckoutCartItem[]
  >(() => {
    if (!cart) {
      return [];
    }

    return cart.items.map((item) => {
      const product = item.product;

      const variant =
        product?.variants?.[0];

      const price =
        item.price ??
        product?.price ??
        0;

      const oldPrice =
        product &&
        product.price > price
          ? product.price
          : undefined;

      return {
        id: item.id,

        name:
          product?.name ??
          `Produto ${item.productId}`,

        size:
          variant?.size ??
          'N/A',

        color:
          variant?.color ??
          'N/A',

        quantity: item.quantity,

        price,

        oldPrice,

        image:
          getProductImage(product),
      };
    });
  }, [cart, getProductImage]);

  const subtotalItems = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total +
        item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const savings = useMemo(() => {
    return cartItems.reduce(
      (total, item) => {
        if (
          item.oldPrice !== undefined &&
          item.oldPrice > item.price
        ) {
          return (
            total +
            (item.oldPrice - item.price) *
              item.quantity
          );
        }

        return total;
      },
      0
    );
  }, [cartItems]);

  const tax = 0;

  const shippingCost = useMemo(() => {
    return shippingCosts[
      shippingData.shippingMethod
    ];
  }, [shippingData.shippingMethod]);

  const total = useMemo(() => {
    return (
      subtotal +
      shippingCost
    );
  }, [subtotal, shippingCost]);

  const clearCheckout = useCallback(() => {
    setShippingData({
      ...initialShippingData,
    });

    setPaymentData({
      ...initialPaymentData,
    });

    setCart(null);
  }, []);

  const value = useMemo(
    () => ({
      shippingData,
      paymentData,
      cartItems,
      subtotalItems,
      subtotal,
      savings,
      tax,
      shippingCost,
      total,
      setShippingData,
      setPaymentData,
      refreshCart,
      clearCheckout,
    }),
    [
      shippingData,
      paymentData,
      cartItems,
      subtotalItems,
      subtotal,
      savings,
      tax,
      shippingCost,
      total,
      refreshCart,
      clearCheckout,
    ]
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout =
  (): CheckoutContextData => {
    const context =
      useContext(CheckoutContext);

    if (context === undefined) {
      throw new Error(
        'useCheckout deve ser usado dentro de um CheckoutProvider'
      );
    }

    return context;
  };
