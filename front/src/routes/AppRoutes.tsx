import React from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import Header from '../components/Header';

import { Cadastro } from '../pages/Cadastro';

import { Login } from '../pages/Login';

import { Cart } from '../pages/Cart';

import { Home } from '../pages/Home';

import { CheckoutShipping } from '../pages/CheckoutShipping';

import { CheckoutPayment } from '../pages/CheckoutPayment';

import { CheckoutReview } from '../pages/CheckoutReview';

import { CheckoutProvider } from '../components/Checkout/CheckoutContext';

export const AppRoutes: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <CheckoutProvider>
          <Routes>
            {/* Página inicial */}
            <Route
              path="/"
              element={<Navigate to="/login" replace />}
            />

            {/* Autenticação */}
            <Route
              path="/cadastro"
              element={<Cadastro />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            {/* Home */}
            <Route
              path="/home"
              element={<Home />}
            />

            {/* Carrinho */}
            <Route
              path="/cart"
              element={<Cart />}
            />

            {/* Checkout - Step 1: Shipping */}
            <Route
              path="/checkout"
              element={<CheckoutShipping />}
            />

            <Route
              path="/checkout-shipping"
              element={<CheckoutShipping />}
            />

            {/* Checkout - Step 2: Payment */}
            <Route
              path="/checkout-payment"
              element={<CheckoutPayment />}
            />

            {/* Checkout - Step 3: Review */}
            <Route
              path="/checkout-review"
              element={<CheckoutReview />}
            />

            {/* Rota não encontrada */}
            <Route
              path="*"
              element={<Navigate to="/login" replace />}
            />
          </Routes>
        </CheckoutProvider>
      </main>
    </div>
  );
};
