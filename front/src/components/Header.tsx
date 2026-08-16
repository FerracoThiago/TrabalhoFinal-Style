import React from 'react';
import { HeaderDesktop } from './HeaderDesktop';
import { HeaderMobile } from './HeaderMobile';

export const Header: React.FC = () => {
  return (
    <header className="w-full">
      <HeaderDesktop />
      <HeaderMobile />
    </header>
  );
};