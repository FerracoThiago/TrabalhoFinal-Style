import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
  
    console.log('Subscribe:', email);
  };

  return (
    <footer className="w-full bg-[#030711] text-white py-10 px-4">
      <div className="max-w-[390px] sm:max-w-md mx-auto text-center">
        <h2 className="text-lg font-bold mb-2">Stay in Style</h2>
        <p className="text-xs text-gray-300 mb-6">
          Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and style tips.
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full sm:flex-1 h-11 px-3 text-sm rounded-xl bg-white border border-gray-200 text-black placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full sm:w-auto sm:px-8 h-11 bg-white text-black font-medium text-sm rounded-xl hover:bg-gray-100 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </footer>
  );
};