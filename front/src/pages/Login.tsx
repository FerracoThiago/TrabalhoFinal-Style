import React from 'react';
import { Mail, Lock } from 'lucide-react';
import { Logo } from '../components/Logo';
import { Input } from '../components/Input';
import { SubmitButton } from '../components/SubmitButton';
import googleIcon from '../assets/icons/google.svg';
import facebookIcon from '../assets/icons/facebook.svg';

export const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start py-8 px-4">
      <div className="flex flex-col items-center mb-8">
        <Logo className="h-8 mb-3" />
        <p className="text-sm text-gray-500 font-normal text-center">
          Welcome back! Please enter your details
        </p>
      </div>

      <div className="w-full max-w-120 bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col items-center mb-6 text-center">
          <h1 className="text-2xl font-bold text-black mb-1">
            Sign In
          </h1>
          <p className="text-sm text-gray-500">
            Access your account to continue shopping
          </p>
        </div>

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

        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative bg-white px-4 text-[11px] font-medium tracking-wider text-gray-400 uppercase">
            OR SIGN IN WITH EMAIL
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <Input 
            label="Email address" 
            type="email" 
            placeholder="Enter your email" 
            icon={<Mail className="w-4 h-4" />} 
          />

          <Input 
            label="Password" 
            isPassword={true} 
            placeholder="Enter your password" 
            icon={<Lock className="w-4 h-4" />} 
          />

          <SubmitButton>Sign In</SubmitButton>
        </form>

        <div className="mt-6 text-center text-xs text-black">
          Don't have an account?{' '}
          <a href="/cadastro" className="font-semibold text-black underline">
            Create account
          </a>
        </div>
      </div>
    </div>
  );
};