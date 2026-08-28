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

export const AppRoutes: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />

          <Route
            path="/cadastro"
            element={<Cadastro />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/home"
            element={<Home />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* Checkout - Step 1: Shipping */}
          <Route
            path="/checkout"
            element={<CheckoutShipping />}
          />

          {/* Checkout - Step 1: Shipping - rota alternativa */}
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

          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />
        </Routes>
      </main>
    </div>
  );
};
