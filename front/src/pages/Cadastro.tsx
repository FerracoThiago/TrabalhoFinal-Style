import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

import { Logo } from '../components/Logo';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import { SubmitButton } from '../components/SubmitButton';

import googleIcon from '../assets/icons/google.svg';
import facebookIcon from '../assets/icons/facebook.svg';

export const Cadastro: React.FC = () => {
  const navigate = useNavigate();

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [newsletterAccepted, setNewsletterAccepted] = useState(true);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!termsAccepted) {
      setError(
        'Você precisa aceitar os Termos de Serviço e a Política de Privacidade.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    // Garantimos explicitamente que seja boolean
    const notifications = Boolean(newsletterAccepted);

    const data = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password,
      notifications,
    };

    console.log('Dados enviados para o cadastro:', data);
    console.log('notifications é boolean?', typeof data.notifications);

    try {
      const response = await fetch('http://localhost:3333/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json().catch(() => null);

      if (response.status === 201) {
        navigate('/login');
        return;
      }

      if (response.status === 409) {
        setError('Usuário já cadastrado.');
        return;
      }

      if (response.status === 400) {
        console.error('Erro de validação:', responseData);
        setError(
          responseData?.errors?.[0]?.message ||
            'Os dados enviados são inválidos.'
        );
        return;
      }

      console.error('Erro no cadastro:', responseData);
      setError(
        responseData?.message || 'Não foi possível realizar o cadastro.'
      );
    } catch (error) {
      console.error('Erro ao conectar com o servidor:', error);
      setError('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start py-8 px-4">
      <div className="flex flex-col items-center mb-8">
        <Logo className="h-8 mb-3" />

        <p className="text-sm text-gray-500 font-normal text-center">
          Create your account and start shopping
        </p>
      </div>

      <div className="w-full max-w-120 bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col items-center mb-6 text-center">
          <h1 className="text-2xl font-bold text-black mb-1">
            Create Account
          </h1>

          <p className="text-sm text-gray-500">
            Join our community and discover amazing fashion
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
            <div className="w-full border-t border-gray-200" />
          </div>

          <div className="relative bg-white px-4 text-[11px] font-medium tracking-wider text-gray-400 uppercase">
            OR CREATE WITH EMAIL
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First name"
              placeholder="First name"
              icon={<User className="w-4 h-4" />}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <Input
              label="Last name"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <Input
            label="Email address"
            type="email"
            placeholder="Enter your email"
            icon={<Mail className="w-4 h-4" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div>
            <Input
              label="Password"
              isPassword
              placeholder="Create a password"
              icon={<Lock className="w-4 h-4" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <p className="text-[11px] text-gray-500 mt-1">
              Must be at least 6 characters long
            </p>
          </div>

          <Input
            label="Confirm password"
            isPassword
            placeholder="Confirm your password"
            icon={<Lock className="w-4 h-4" />}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="space-y-3 pt-2">
            <Checkbox
              checked={termsAccepted}
              onChange={() => setTermsAccepted((prev) => !prev)}
              label="I agree to the Terms of Service and Privacy Policy"
            />

            <Checkbox
              checked={newsletterAccepted}
              onChange={() => setNewsletterAccepted((prev) => !prev)}
              label="Subscribe to our newsletter for exclusive offers and updates"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          <SubmitButton>
            Create Account
          </SubmitButton>
        </form>

        <div className="mt-6 text-center text-md text-black">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-black underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
