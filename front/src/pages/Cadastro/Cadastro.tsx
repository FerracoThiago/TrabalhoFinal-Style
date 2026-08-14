// src/pages/Cadastro/Cadastro.tsx
import React, { useState } from 'react';
import { User, Mail, Lock, Eye, Check } from 'lucide-react';
import logoCadastro from '../../assets/images/logo-style-header.svg';
import googleIcon from '../../assets/icons/google.svg';
import facebookIcon from '../../assets/icons/facebook.svg';

export const Cadastro: React.FC = () => {
  // Estado para controlar as opções (segunda marcada por padrão conforme o protótipo)
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [newsletterAccepted, setNewsletterAccepted] = useState(true);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start py-8 px-4">
      {/* Logo principal de cadastro e subtítulo */}
      <div className="flex flex-col items-center mb-8">
        <img 
          src={logoCadastro} 
          alt="Style Logo" 
          className="h-8 object-contain mb-3"
        />
        <p className="text-sm text-gray-500 font-normal text-center">
          Create your account and start shopping
        </p>
      </div>

      {/* Card principal de cadastro */}
      <div className="w-full max-w-[480px] bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* Cabeçalho do Card */}
        <div className="flex flex-col items-center mb-6 text-center">
          <h1 className="text-2xl font-bold text-black mb-1">
            Create Account
          </h1>
          <p className="text-sm text-gray-500">
            Join our community and discover amazing fashion
          </p>
        </div>

        {/* Botões de Login Social */}
        <div className="flex flex-col space-y-3 mb-6">
          <button
            type="button"
            className="w-full h-12 border border-gray-300 rounded-xl flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-black"
          >
            <img src={googleIcon} alt="Google" className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            className="w-full h-12 border border-gray-300 rounded-xl flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-black"
          >
            <img src={facebookIcon} alt="Facebook" className="w-5 h-5" />
            <span>Continue with Facebook</span>
          </button>
        </div>

        {/* Divisor */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative bg-white px-4 text-[11px] font-medium tracking-wider text-gray-400 uppercase">
            OR CREATE WITH EMAIL
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {/* Nome e Sobrenome */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-black mb-1">
                First name
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full h-11 pl-9 pr-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-black transition-colors text-black placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-black mb-1">
                Last name
              </label>
              <input
                type="text"
                placeholder="Last name"
                className="w-full h-11 px-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-black transition-colors text-black placeholder-gray-400"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-medium text-black mb-1">
              Email address
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full h-11 pl-9 pr-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-black transition-colors text-black placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-black mb-1">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full h-11 pl-9 pr-10 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-black transition-colors text-black placeholder-gray-400"
              />
              <button
                type="button"
                aria-label="Toggle password visibility"
                className="absolute right-3 text-gray-400 hover:text-black"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              Must be at least 8 characters long
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-medium text-black mb-1">
              Confirm password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full h-11 pl-9 pr-10 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-black transition-colors text-black placeholder-gray-400"
              />
              <button
                type="button"
                aria-label="Toggle confirm password visibility"
                className="absolute right-3 text-gray-400 hover:text-black"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Checkboxes idênticos ao protótipo */}
          <div className="space-y-3 pt-2">
            {/* Opção 1: Termos */}
            <div 
              onClick={() => setTermsAccepted(!termsAccepted)}
              className="flex items-start space-x-3 cursor-pointer select-none"
            >
              <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0 ${termsAccepted ? 'bg-black border-black text-white' : 'border-gray-300 bg-white'}`}>
                {termsAccepted && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className="text-xs text-black leading-tight">
                I agree to the Terms of Service and Privacy Policy
              </span>
            </div>

            {/* Opção 2: Newsletter */}
            <div 
              onClick={() => setNewsletterAccepted(!newsletterAccepted)}
              className="flex items-start space-x-3 cursor-pointer select-none"
            >
              <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0 ${newsletterAccepted ? 'bg-black border-black text-white' : 'border-gray-300 bg-white'}`}>
                {newsletterAccepted && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className="text-xs text-black leading-tight">
                Subscribe to our newsletter for exclusive offers and updates
              </span>
            </div>
          </div>

          {/* Botão de Submissão Principal */}
          <button
            type="submit"
            className="w-full h-12 bg-black text-white font-medium text-sm rounded-xl hover:bg-gray-900 transition-colors mt-4"
          >
            Create Account
          </button>
        </form>

        {/* Rodapé / Link para Sign in */}
        <div className="mt-6 text-center text-xs text-black">
          Already have an account?{' '}
          <a href="#signin" className="font-semibold text-black underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};