import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="w-full bg-gray-50 py-16 sm:py-24 px-4">
      <div className="max-w-[390px] sm:max-w-md mx-auto text-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-black mb-4">
          Style Redefined
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mb-8">
          Discover the latest trends in fashion. Premium quality, sustainable materials, timeless designs.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            className="w-full sm:w-auto h-12 px-6 bg-[#030711] text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            Shop Now
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="w-full sm:w-auto h-12 px-6 bg-white text-black font-medium text-sm rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            View Collection
          </button>
        </div>
      </div>
    </section>
  );
};