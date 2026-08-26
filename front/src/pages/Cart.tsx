import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { CartItem } from '../components/CartItem';
import { PromoCode } from '../components/PromoCode';
import { OrderSummary } from '../components/OrderSummary';

import tshirtImage from '../assets/images/cart-tshirt.png';
import jeansImage from '../assets/images/cart-jeans.png';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number | null;
  avgReview: number | null;
  specification: string;
  tags: string[];
  category: string;
  inStock: boolean;
  variants: {
    id: number;
    size: string;
    color: string;
    stock: number;
    productId: number;
  }[];
  images: string[];
}

interface CartItemData {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  product: Product;
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

export const Cart: React.FC = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const imageMap: Record<number, string> = {
    1: tshirtImage,
    2: jeansImage,
  };

  /**
   * Busca o carrinho do usuário.
   */
  const loadCart = async () => {
    try {
      if (!token) {
        console.error('Token não encontrado');
        return;
      }

      const response = await fetch('http://localhost:3333/cart', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        return;
      }

      console.log('Carrinho carregado:', data);

      setCart(data);
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  /**
   * Adiciona ou diminui UMA unidade.
   */
  const updateQuantity = async (
    productId: number,
    operation: 'add' | 'remove'
  ) => {
    try {
      if (!token) {
        console.error('Token não encontrado');
        return;
      }

      const response = await fetch('http://localhost:3333/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
          operation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        return;
      }

      console.log('Carrinho atualizado:', data);

      setCart(data);
    } catch (error) {
      console.error('Erro ao atualizar carrinho:', error);
    }
  };

  /**
   * Remove o produto completamente.
   *
   * Usamos o mesmo endpoint atual do carrinho,
   * enviando a quantidade atual do item para zerá-lo.
   */
  const removeItem = async (
    productId: number,
    currentQuantity: number
  ) => {
    try {
      if (!token) {
        console.error('Token não encontrado');
        return;
      }

      const response = await fetch('http://localhost:3333/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: currentQuantity,
          operation: 'remove',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        return;
      }

      console.log('Produto removido do carrinho:', data);

      setCart(data);
    } catch (error) {
      console.error('Erro ao remover produto:', error);
    }
  };

  /**
   * Quantidade total de unidades.
   */
  const totalItems =
    cart?.items.reduce(
      (total, item) => total + item.quantity,
      0
    ) ?? 0;

  /**
   * Subtotal.
   */
  const calculatedSubtotal =
    cart?.items.reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0
    ) ?? 0;

  /**
   * Economia.
   */
  const calculatedSavings =
    cart?.items.reduce((total, item) => {
      const discount = item.product.discount ?? 0;

      return total + discount * item.quantity;
    }, 0) ?? 0;

  /**
   * Frete.
   */
  const calculatedShipping = cart?.shipping ?? 0;

  /**
   * Total.
   */
  const calculatedTotal =
    calculatedSubtotal -
    calculatedSavings +
    calculatedShipping;

  /**
   * Produtos disponíveis.
   */
  const availableItems =
    cart?.items.filter(
      (item) => item.product.inStock
    ) ?? [];

  /**
   * Produtos fora de estoque.
   */
  const outOfStockItems =
    cart?.items.filter(
      (item) => !item.product.inStock
    ) ?? [];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <span>Carregando carrinho...</span>
      </div>
    );
  }

  if (!cart) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <span>Carrinho não encontrado.</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">

        {/* HEADER */}
        <div className="flex items-center justify-between w-full mx-auto px-1">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => navigate('/login')}
              aria-label="Go back"
              className="text-black hover:opacity-70 transition-opacity flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <h1
              className="text-black"
              style={{
                fontFamily: 'Segoe UI',
                fontWeight: 700,
                fontSize: '24px',
                lineHeight: '30px',
              }}
            >
              Shopping Cart
            </h1>
          </div>

          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0">
            {totalItems}{' '}
            {totalItems === 1 ? 'item' : 'items'}
          </span>
        </div>

        {/* CONTEÚDO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start w-full">

          {/* PRODUTOS */}
          <div className="flex flex-col gap-6 md:col-span-2 w-full">

            {/* DISPONÍVEIS */}
            {availableItems.length > 0 && (
              <div
                className="bg-white border border-gray-100 shadow-sm flex flex-col w-full max-w-[358px] md:max-w-none mx-auto md:mx-0"
                style={{
                  paddingTop: '25px',
                  paddingRight: '16px',
                  paddingBottom: '25px',
                  paddingLeft: '16px',
                  gap: '24px',
                  borderRadius: '12px',
                  borderWidth: '1px',
                  boxSizing: 'border-box',
                }}
              >
                <div className="flex items-center space-x-2 px-1">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />

                  <span
                    className="text-black"
                    style={{
                      fontFamily: 'Segoe UI',
                      fontWeight: 600,
                      fontSize: '24px',
                      lineHeight: '24px',
                      letterSpacing: '-0.6px',
                    }}
                  >
                    Available Items ({availableItems.length})
                  </span>
                </div>

                <div
                  className="flex flex-col w-full"
                  style={{ gap: '24px' }}
                >
                  {availableItems.map((item, index) => {
                    const product = item.product;
                    const variant = product.variants?.[0];

                    const image =
                      product.images?.[0] ||
                      imageMap[product.id] ||
                      tshirtImage;

                    const maxQuantity =
                      variant?.stock ?? 99;

                    return (
                      <CartItem
                        key={item.id}
                        image={image}
                        name={product.name}
                        style={`STYLE ${
                          product.category || 'Collection'
                        }`}
                        size={variant?.size || 'N/A'}
                        color={variant?.color || 'N/A'}
                        price={`$${product.price.toFixed(2)}`}
                        oldPrice=""
                        savings=""
                        quantity={item.quantity}
                        maxQuantity={maxQuantity}

                        /*
                         * IMPORTANTE:
                         * Só diminui se a quantidade for maior que 1.
                         *
                         * 3 -> 2
                         * 2 -> 1
                         * 1 -> não faz nada
                         */
                        onDecrease={() => {
                          if (item.quantity > 1) {
                            updateQuantity(
                              item.productId,
                              'remove'
                            );
                          }
                        }}

                        onIncrease={() =>
                          updateQuantity(
                            item.productId,
                            'add'
                          )
                        }

                        /*
                         * A lixeira remove o produto inteiro.
                         */
                        onRemove={() =>
                          removeItem(
                            item.productId,
                            item.quantity
                          )
                        }

                        showDivider={
                          index < availableItems.length - 1
                        }
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* FORA DE ESTOQUE */}
            {outOfStockItems.length > 0 && (
              <div className="w-full max-w-[358px] md:max-w-none mx-auto md:mx-0">

                <div className="flex items-center space-x-2 mb-4">
                  <span className="w-3 h-3 rounded-full bg-gray-400" />

                  <span
                    className="text-black"
                    style={{
                      fontFamily: 'Segoe UI',
                      fontWeight: 600,
                      fontSize: '24px',
                      lineHeight: '24px',
                    }}
                  >
                    Out of Stock ({outOfStockItems.length})
                  </span>
                </div>

                <div className="flex flex-col gap-6">
                  {outOfStockItems.map((item) => {
                    const product = item.product;
                    const variant =
                      product.variants?.[0];

                    const image =
                      product.images?.[0] ||
                      imageMap[product.id] ||
                      tshirtImage;

                    return (
                      <CartItem
                        key={item.id}
                        image={image}
                        name={product.name}
                        style={`STYLE ${
                          product.category || 'Collection'
                        }`}
                        size={variant?.size || 'N/A'}
                        color={variant?.color || 'N/A'}
                        price={`$${product.price.toFixed(2)}`}
                        oldPrice=""
                        savings=""
                        quantity={item.quantity}
                        maxQuantity={
                          variant?.stock ?? 99
                        }

                        onDecrease={() => {
                          if (item.quantity > 1) {
                            updateQuantity(
                              item.productId,
                              'remove'
                            );
                          }
                        }}

                        onIncrease={() =>
                          updateQuantity(
                            item.productId,
                            'add'
                          )
                        }

                        onRemove={() =>
                          removeItem(
                            item.productId,
                            item.quantity
                          )
                        }

                        showDivider={false}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* CARRINHO VAZIO */}
            {cart.items.length === 0 && (
              <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-8 text-center">
                <p className="text-gray-500">
                  Seu carrinho está vazio.
                </p>
              </div>
            )}
          </div>

          {/* RESUMO */}
          <div className="flex flex-col gap-6 w-full max-w-[358px] md:max-w-none mx-auto md:mx-0">

            <PromoCode />

            <OrderSummary
              subtotalItems={totalItems}
              subtotal={`$${calculatedSubtotal.toFixed(2)}`}
              savings={`-$${calculatedSavings.toFixed(2)}`}
              shipping={`$${calculatedShipping.toFixed(2)}`}
              total={`$${calculatedTotal.toFixed(2)}`}
              onCheckout={() => {}}
              onContinueShopping={() => navigate('/')}
            />

          </div>
        </div>
      </div>
    </div>
  );
};