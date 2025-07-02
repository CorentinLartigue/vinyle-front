// src/components/Login.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { User, Eye, EyeOff, Loader2 } from 'lucide-react';
import Gramophone from '@/assets/gramophone.png';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastProvider';

const LoginSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [souvenirDeMoi, setSouvenirDeMoi] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const router = useRouter();
  const { login, resetPassword } = useAuth();
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !motDePasse) {
      showError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await login(email, motDePasse);
      
      if (result.success) {
        showSuccess('Connexion réussie !');
        router.push('/');
      } else {
        showError(result.message);
      }
    } catch (error) {
      showError('Une erreur est survenue lors de la connexion');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetEmail) {
      showError('Veuillez entrer votre adresse email');
      return;
    }

    setIsResettingPassword(true);
    
    try {
      const result = await resetPassword(resetEmail);
      
      if (result.success) {
        showSuccess('Un email de réinitialisation a été envoyé !');
        setShowForgotPassword(false);
        setResetEmail('');
      } else {
        showError(result.message);
      }
    } catch (error) {
      showError('Une erreur est survenue lors de l\'envoi de l\'email');
    } finally {
      setIsResettingPassword(false);
    }
  };



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Bandeau breadcrumb */}
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 h-[70px]">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">
          <h1 className="font-bold text-white text-[19px]">Connexion</h1>
          <div className="text-white/90 text-sm">
            <span className="hover:text-white cursor-pointer">Accueil</span>
            <span className="mx-2">-</span>
            <span className="text-white/70">Connexion</span>
          </div>
        </div>
      </div>

      {/* Formulaire de connexion */}
      <div className="py-16">
        <div className="max-w-sm mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Image
                  src={Gramophone}
                  alt="Logo DoVinyl"
                  className="w-auto h-8 mr-2"
                />
                <h2 className="text-xl font-bold text-gray-800">DoVinyl</h2>
              </div>
            </div>

            {!showForgotPassword ? (
              /* Formulaire de connexion */
              <>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Champ email */}
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-600 mb-2">
                      Adresse e-mail *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Entrez votre adresse e-mail"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                      required
                    />
                  </div>

                  {/* Champ mot de passe */}
                  <div>
                    <label htmlFor="motDePasse" className="block text-sm text-gray-600 mb-2">
                      Mot de passe *
                    </label>
                    <div className="relative">
                      <input
                        id="motDePasse"
                        type={showPassword ? 'text' : 'password'}
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                        placeholder="Entrez votre mot de passe"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Souvenir et lien mot de passe */}
                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={souvenirDeMoi}
                        onChange={(e) => setSouvenirDeMoi(e.target.checked)}
                        className="w-4 h-4 text-orange-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>

                  {/* Boutons */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-2 px-6 rounded font-medium transition-colors flex items-center space-x-2"
                    >
                      {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                      <span>{isSubmitting ? 'Connexion...' : 'Se connecter'}</span>
                    </button>
                    <Link
                      href="/register"
                      className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span className="hidden lg:block text-sm">Créer un compte</span>
                    </Link>
                  </div>
                </form>
              </>
            ) : (
              /* Formulaire de réinitialisation */
              <form onSubmit={handleForgotPassword} className="space-y-5">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Mot de passe oublié ?</h3>
                  <p className="text-sm text-gray-600">
                    Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                  </p>
                </div>

                <div>
                  <label htmlFor="resetEmail" className="block text-sm text-gray-600 mb-2">
                    Adresse e-mail *
                  </label>
                  <input
                    id="resetEmail"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Entrez votre adresse e-mail"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                    required
                  />
                </div>

                <div className="flex items-center justify-between pt-2 space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    ← Retour
                  </button>
                  <button
                    type="submit"
                    disabled={isResettingPassword}
                    className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-2 px-6 rounded font-medium transition-colors flex items-center space-x-2"
                  >
                    {isResettingPassword && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>{isResettingPassword ? 'Envoi...' : 'Envoyer'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;