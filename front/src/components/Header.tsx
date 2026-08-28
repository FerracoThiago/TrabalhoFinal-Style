import React, { useCallback, useEffect, useState } from 'react';

import {
  Menu,
  Search,
  Heart,
  ShoppingBag,
  User,
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

import { Logo } from './Logo';

import { SearchBar } from './SearchBar';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [userInitials, setUserInitials] = useState('');

  const loadCartCount = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setCartCount(0);
        return;
      }

      const response = await fetch(
        'http://localhost:3333/cart',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.error('Erro ao buscar carrinho');
        return;
      }

      const data = await response.json();

      const totalItems =
        data.items?.reduce(
          (
            total: number,
            item: { quantity: number }
          ) => total + item.quantity,
          0
        ) ?? 0;

      setCartCount(totalItems);
    } catch (error) {
      console.error(
        'Erro ao carregar quantidade do carrinho:',
        error
      );
    }
  }, []);

  const loadUserInitials = useCallback(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setUserInitials('');
      return;
    }

    try {
      const storedUser = localStorage.getItem('user');

      if (!storedUser) {
        setUserInitials('');
        return;
      }

      const user = JSON.parse(storedUser);

      const name =
        user.name ||
        user.fullName ||
        user.nome ||
        '';

      const nameParts = name
        .trim()
        .split(/\s+/)
        .filter(Boolean);

      /*
       * O usuário precisa ter pelo menos
       * nome e sobrenome.
       *
       * Exemplo:
       * Marcos Luiz Mendes Junior
       * -> MJ
       */
      if (nameParts.length < 2) {
        setUserInitials('');
        return;
      }

      const firstName = nameParts[0];
      const lastName =
        nameParts[nameParts.length - 1];

      const initials = (
        firstName.charAt(0) +
        lastName.charAt(0)
      ).toUpperCase();

      setUserInitials(initials);
    } catch (error) {
      console.error(
        'Erro ao carregar dados do usuário:',
        error
      );

      setUserInitials('');
    }
  }, []);

  useEffect(() => {
    loadCartCount();
    loadUserInitials();

    const handleCartUpdated = () => {
      loadCartCount();
    };

    const handleAuthUpdated = () => {
      loadUserInitials();
      loadCartCount();
    };

    window.addEventListener(
      'cart:updated',
      handleCartUpdated
    );

    window.addEventListener(
      'auth:updated',
      handleAuthUpdated
    );

    return () => {
      window.removeEventListener(
        'cart:updated',
        handleCartUpdated
      );

      window.removeEventListener(
        'auth:updated',
        handleAuthUpdated
      );
    };
  }, [loadCartCount, loadUserInitials]);

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <header className="w-full">

      {/* MOBILE */}
      <div className="block md:hidden w-full">

        <div className="w-full bg-black text-white py-1.5 px-4 text-center text-sm">
          Free shipping on orders over $100 | New arrivals daily
        </div>

        <div className="w-full bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between">

          <div className="flex items-center gap-5 text-gray-700">

            <button
              type="button"
              aria-label="Menu"
              className="text-gray-700"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div
              style={{
                width: '76px',
                height: '32px',
              }}
            >
              <Logo
                variant="header"
                className="h-full w-full object-contain"
              />
            </div>

          </div>

          <div className="flex items-center gap-8 space-x-3 text-gray-700">

            <Search className="w-5 h-5" />

            <Heart className="w-5 h-5" />

            {/* PERFIL */}
            <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold">

              {userInitials ? (
                userInitials
              ) : (
                <User className="w-4 h-4 text-gray-500" />
              )}

            </div>

            {/* CARRINHO */}
            <button
              type="button"
              aria-label="Abrir carrinho"
              onClick={handleCartClick}
              className="relative cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />

              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount > 99
                    ? '99+'
                    : cartCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block w-full bg-white border-b border-gray-200">

        <div className="w-full bg-black text-white py-1.5 px-4 text-center text-sm">
          Free shipping on orders over $100 | New arrivals daily
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">

          <div
            className="cursor-pointer shrink-0"
            onClick={() => navigate('/home')}
            style={{
              width: '76px',
              height: '32px',
              paddingLeft: '8px',
            }}
          >
            <Logo
              variant="header"
              className="h-full w-full object-contain"
            />
          </div>

          <nav className="flex items-center space-x-8 text-sm font-medium text-black shrink-0">

            <button
              type="button"
              onClick={() => navigate('/new-in')}
            >
              New In
            </button>

            <button
              type="button"
              onClick={() => navigate('/women')}
            >
              Women
            </button>

            <button
              type="button"
              onClick={() => navigate('/men')}
            >
              Men
            </button>

            <button
              type="button"
              onClick={() => navigate('/sale')}
            >
              Sale
            </button>

          </nav>

          <div className="flex-1 max-w-md mx-4">
            <SearchBar
              placeholder="Search for products..."
              value=""
              onChange={() => {}}
            />
          </div>

          <div className="flex items-center space-x-6 shrink-0">

            <Heart className="w-5 h-5 cursor-pointer" />

            {/* PERFIL */}
            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold">

              {userInitials ? (
                userInitials
              ) : (
                <User className="w-4 h-4 text-gray-500" />
              )}

            </div>

            {/* CARRINHO */}
            <button
              type="button"
              aria-label="Abrir carrinho"
              onClick={handleCartClick}
              className="relative cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount > 99
                    ? '99+'
                    : cartCount}
                </span>
              )}

            </button>

          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;
