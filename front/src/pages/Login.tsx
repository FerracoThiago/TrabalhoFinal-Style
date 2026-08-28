import React, { useState } from 'react';

import { Mail, Lock } from 'lucide-react';

import { Link, useNavigate } from 'react-router-dom';

import { Logo } from '../components/Logo';

import { Input } from '../components/Input';

import { SubmitButton } from '../components/SubmitButton';

import googleIcon from '../assets/icons/google.svg';

import facebookIcon from '../assets/icons/facebook.svg';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const getUserFromToken = (token: string) => {
    try {
      const parts = token.split('.');

      if (parts.length !== 3) {
        return null;
      }

      const base64 = parts[1]
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const paddedBase64 =
        base64 + '='.repeat((4 - (base64.length % 4)) % 4);

      const payload = JSON.parse(atob(paddedBase64));

      return {
        firstName:
          payload.firstName ||
          payload.firstname ||
          payload.first_name ||
          payload.nome ||
          '',

        lastName:
          payload.lastName ||
          payload.lastname ||
          payload.last_name ||
          payload.sobrenome ||
          '',

        name:
          payload.name ||
          payload.fullName ||
          payload.full_name ||
          '',
      };
    } catch {
      return null;
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError('');

    try {
      const response = await fetch(
        'http://localhost:3333/auth/login',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (response.status === 200) {
        const data = await response.json();

        const token = data.token;

        if (!token) {
          setError(
            'Token de autenticação não encontrado.'
          );

          return;
        }

        localStorage.setItem('token', token);

        const tokenUser = getUserFromToken(token);

        const firstName =
          data.user?.firstName ||
          data.user?.firstname ||
          data.user?.first_name ||
          data.firstName ||
          data.firstname ||
          data.first_name ||
          tokenUser?.firstName ||
          '';

        const lastName =
          data.user?.lastName ||
          data.user?.lastname ||
          data.user?.last_name ||
          data.lastName ||
          data.lastname ||
          data.last_name ||
          tokenUser?.lastName ||
          '';

        const fullName =
          data.user?.name ||
          data.user?.fullName ||
          data.user?.full_name ||
          data.name ||
          data.fullName ||
          data.full_name ||
          tokenUser?.name ||
          [firstName, lastName]
            .filter(Boolean)
            .join(' ');

        if (firstName || lastName || fullName) {
          localStorage.setItem(
            'user',
            JSON.stringify({
              firstName,
              lastName,
              name: fullName,
            })
          );
        }

        window.dispatchEvent(
          new Event('auth:updated')
        );

        navigate('/home');

        return;
      }

      if (response.status === 401) {
        setError('Email ou senha inválidos.');

        return;
      }

      setError(
        'Não foi possível realizar o login.'
      );
    } catch {
      setError(
        'Erro ao conectar com o servidor.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start py-8 md:py-20 px-4">
      <div className="flex flex-col items-center mb-8">
        <Logo className="h-8 mb-3" />

        <p className="text-md text-gray-500 font-normal text-center">
          Welcome back! Please enter your details
        </p>
      </div>

      <div className="w-full max-w-120 bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-md">
        <div className="flex flex-col items-center mb-6 text-center">
          <h1 className="text-2xl font-bold text-black mb-1">
            Sign In
          </h1>

          <p className="text-md text-gray-500">
            Enter your credentials to access your account
          </p>
        </div>

        <div className="flex flex-col space-y-3 mb-6">
          <button
            type="button"
            className="w-full h-12 border border-gray-300 rounded-xl flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-black"
          >
            <img
              src={googleIcon}
              alt="Google"
              className="w-5 h-5"
            />

            <span>
              Continue with Google
            </span>
          </button>

          <button
            type="button"
            className="w-full h-12 border border-gray-300 rounded-xl flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-black"
          >
            <img
              src={facebookIcon}
              alt="Facebook"
              className="w-5 h-5"
            />

            <span>
              Continue with Facebook
            </span>
          </button>
        </div>

        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>

          <div className="relative bg-white px-4 text-[11px] font-medium tracking-wider text-gray-400 uppercase">
            OR CONTINUE IN WITH EMAIL
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Input
            label="Email address"
            type="email"
            placeholder="Enter your email"
            icon={<Mail className="w-4 h-4" />}
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <Input
            label="Password"
            isPassword={true}
            placeholder="Enter your password"
            icon={<Lock className="w-4 h-4" />}
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          <SubmitButton onClick={() => navigate("/home")}>
            Sign In
          </SubmitButton>
        </form>

        <div className="mt-6 text-center text-xs text-black">
          Don't have an account?{' '}

          <Link
            to="/cadastro"
            className="font-semibold text-black underline"
          >
            Sign UP
          </Link>
        </div>
      </div>
    </div>
  );
};
