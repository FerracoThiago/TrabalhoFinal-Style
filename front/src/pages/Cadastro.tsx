import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import { Logo } from '../components/Logo';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import { SubmitButton } from '../components/SubmitButton';
import googleIcon from '../assets/icons/google.svg';
import facebookIcon from '../assets/icons/facebook.svg';

export const Cadastro: React.FC = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [newsletterAccepted, setNewsletterAccepted] = useState(true);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start py-8 px-4">
      {/* Logo principal e subtítulo */}
      <div className="flex flex-col items-center mb-8">
        <Logo className="h-8 mb-3" />
        <p className="text-sm text-gray-500 font-normal text-center">
          Create your account and start shopping
        </p>
      </div>

      {/* Card principal */}
      <div className="w-full max-w-120 bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col items-center mb-6 text-center">
          <h1 className="text-2xl font-bold text-black mb-1">
            Create Account
          </h1>
          <p className="text-sm text-gray-500">
            Join our community and discover amazing fashion
          </p>
        </div>

        {/* Login Social */}
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
          <div className="grid grid-cols-2 gap-3">
            <Input 
              label="First name" 
              placeholder="First name" 
              icon={<User className="w-4 h-4" />} 
            />
            <Input 
              label="Last name" 
              placeholder="Last name" 
            />
          </div>

          <Input 
            label="Email address" 
            type="email" 
            placeholder="Enter your email" 
            icon={<Mail className="w-4 h-4" />} 
          />

          <div>
            <Input 
              label="Password" 
              isPassword={true} 
              placeholder="Create a password" 
              icon={<Lock className="w-4 h-4" />} 
            />
            <p className="text-[11px] text-gray-500 mt-1">
              Must be at least 8 characters long
            </p>
          </div>

          <Input 
            label="Confirm password" 
            isPassword={true} 
            placeholder="Confirm your password" 
            icon={<Lock className="w-4 h-4" />} 
          />

          {/* Checkboxes */}
          <div className="space-y-3 pt-2">
            <Checkbox
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              label="I agree to the Terms of Service and Privacy Policy"
            />
            <Checkbox
              checked={newsletterAccepted}
              onChange={() => setNewsletterAccepted(!newsletterAccepted)}
              label="Subscribe to our newsletter for exclusive offers and updates"
            />
          </div>

          <SubmitButton>Create Account</SubmitButton>
        </form>

        <div className="mt-6 text-center text-xs text-black">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-black underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};