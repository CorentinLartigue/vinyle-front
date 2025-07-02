// src/pages/verify-email.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, XCircle, Loader2, Mail, RefreshCw } from 'lucide-react';
import Gramophone from '@/assets/gramophone.png';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastProvider';

const VerifyEmail: React.FC = () => {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error' | 'invalid'>('loading');
  const [isResending, setIsResending] = useState(false);
  const [email, setEmail] = useState('');
  const [showResendForm, setShowResendForm] = useState(false);

  const router = useRouter();
  const { token } = router.query;
  const { verifyEmail, resendVerifyEmail } = useAuth();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    if (token && typeof token === 'string') {
      handleVerifyEmail(token);
    } else if (router.isReady && !token) {
      setVerificationStatus('invalid');
    }
  }, [token, router.isReady]);

  const handleVerifyEmail = async (verificationToken: string) => {
    try {
      const result = await verifyEmail(verificationToken);
      
      if (result.success) {
        setVerificationStatus('success');
        showSuccess('Email vérifié avec succès !');
      } else {
        setVerificationStatus('error');
        showError(result.message);
      }
    } catch (error) {
      setVerificationStatus('error');
      showError('Une erreur est survenue lors de la vérification');
    }
  };

  const handleResendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      showError('Veuillez entrer votre adresse email');
      return;
    }

    setIsResending(true);
    
    try {
      const result = await resendVerifyEmail(email);
      
      if (result.success) {
        showSuccess('Email de vérification renvoyé !');
        setShowResendForm(false);
        setEmail('');
      } else {
        showError(result.message);
      }
    } catch (error) {
      showError('Une erreur est survenue lors de l\'envoi');
    } finally {
      setIsResending(false);
    }
  };

  const renderContent = () => {
    switch (verificationStatus) {
      case 'loading':
        return (
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-orange-500 mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold mb-4">Vérification en cours...</h2>
            <p className="text-gray-600">Veuillez patienter pendant que nous vérifions votre email.</p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-green-600">Email vérifié avec succès !</h2>
            <p className="text-gray-600 mb-6">
              Votre compte a été activé. Vous pouvez maintenant vous connecter et profiter de nos services.
            </p>
            <div className="space-y-3">
              <Link 
                href="/login"
                className="block bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded font-medium transition-colors"
              >
                Se connecter
              </Link>
              <Link 
                href="/"
                className="block text-gray-500 hover:text-gray-700 transition-colors"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        );

      case 'error':
        return (
          <div className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-red-600">Erreur de vérification</h2>
            <p className="text-gray-600 mb-6">
              Le lien de vérification est invalide ou a expiré. Vous pouvez demander un nouveau lien de vérification.
            </p>
            {!showResendForm ? (
              <div className="space-y-3">
                <button
                  onClick={() => setShowResendForm(true)}
                  className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded font-medium transition-colors"
                >
                  Renvoyer l'email de vérification
                </button>
                <Link 
                  href="/register"
                  className="block text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Créer un nouveau compte
                </Link>
              </div>
            ) : (
              <form onSubmit={handleResendEmail} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Entrez votre adresse email"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={isResending}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 px-6 rounded font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    {isResending && <Loader2 className="w-4 h-4 animate-spin" />}
                    <RefreshCw className="w-4 h-4" />
                    <span>{isResending ? 'Envoi...' : 'Renvoyer'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowResendForm(false)}
                    className="px-4 py-3 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            )}
          </div>
        );

      case 'invalid':
        return (
          <div className="text-center">
            <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Lien de vérification requis</h2>
            <p className="text-gray-600 mb-6">
              Cette page nécessite un lien de vérification valide. Vérifiez votre email ou demandez un nouveau lien.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setShowResendForm(true)}
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded font-medium transition-colors"
              >
                Demander un lien de vérification
              </button>
              <Link 
                href="/register"
                className="block text-gray-500 hover:text-gray-700 transition-colors"
              >
                Créer un compte
              </Link>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Bandeau breadcrumb */}
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 h-[70px]">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">
          <h1 className="font-bold text-white text-[19px]">Vérification d'email</h1>
          <div className="text-white/90 text-sm">
            <span className="hover:text-white cursor-pointer">Accueil</span>
            <span className="mx-2">-</span>
            <span className="text-white/70">Vérification</span>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="py-16">
        <div className="max-w-md mx-auto">
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

            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;