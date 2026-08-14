import React from 'react';

export const TopBar: React.FC = () => {
  return (
    <div className="w-full bg-black text-white text-center py-2 px-4 text-xs font-normal tracking-normal">
      {/* // TODO: confirmar tipografia e tamanho exato se necessário */}
      Free shipping on orders over $100 | New arrivals daily
    </div>
  );
};