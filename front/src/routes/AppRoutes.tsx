import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from '../components/Header';

import { Cadastro } from '../pages/Cadastro';
import { Login } from '../pages/Login';
import { Cart } from '../pages/Cart';
import { Home } from '../pages/Home';

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

          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />
        </Routes>
      </main>
    </div>
  );
};
