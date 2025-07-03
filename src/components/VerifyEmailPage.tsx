aé  // src/pages/verify-email.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';
import Gramophone from '@/assets/gramophone.png';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastProvider';

const VerifyEmailPage: React.FC = () => {
  const router = useRouter();
  const { token } = router.query;
  const { verifyEmail, resendVerifyEmail, user } = useAuth();
  const { showSuccess, showError, showInfo } = useToast();

  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [email, setEmail] = useState('');

  // Vérification automatique si un token est présent dans l'URL
  useEffect(() => {
    if (token && typeof token === 'string') {
      handleVerifyEmail(token);
    }
  }, [token]);

  const handleVerifyEmail = async (verificationToken: string) => {
    setIsVerifying(true);
    try {
      const result = await verifyEmail(verificationToken);
      
      if (result.success) {
        setVerificationStatus('success');
        showSuccess('Email vérifié avec succès !');
        
        // Redirection après quelques secondes
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setVerificationStatus('error');
        showError(result.message);
      }
    } catch (error) {
      setVerificationStatus('error');
      showError('Une erreur est survenue lors de la vérification');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      showError('Veuillez entrer votre adresse email');
      return;
    }

    setIsResending(true);
    try {
      const result = await resendVerifyEmail(email);
      
      if (result.success) {
        showSuccess('Un nouvel email de vérification a été envoyé !');
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

            {/* État de vérification en cours */}
            {isVerifying && (
              <div className="text-center">
                <Loader2 className="w-16 h-16 text-orange-500 mx-auto mb-4 animate-spin" />
                <h3 className="text-lg font-semibold mb-4">Vérification en cours...</h3>
                <p className="text-gray-600">Veuillez patienter pendant que nous vérifions votre email.</p>
              </div>
            )}

            {/* Vérification réussie */}
            {verificationStatus === 'success' && !isVerifying && (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-600 mb-4">Email vérifié !</h3>
                <p className="text-gray-600 mb-6">
                  Votre adresse email a été vérifiée avec succès. Vous pouvez maintenant vous connecter à votre compte.
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
            )}

            {/* Erreur de vérification */}
            {verificationStatus === 'error' && !isVerifying && (
              <div className="text-center">
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-600 mb-4">Erreur de vérification</h3>
                <p className="text-gray-600 mb-6">
                  Le lien de vérification est invalide ou a expiré. Vous pouvez demander un nouveau lien de vérification.
                </p>
                
                {/* Formulaire pour renvoyer un email */}
                <div className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Entrez votre adresse email"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                    />
                  </div>
                  <button
                    onClick={handleResendVerification}
                    disabled={isResending}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 px-6 rounded font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    {isResending && <Loader2 className="w-4 h-4 animate-spin" />}
                    <RefreshCw className="w-4 h-4" />
                    <span>{isResending ? 'Envoi...' : 'Renvoyer le lien'}</span>
                  </button>
                  <Link 
                    href="/login"
                    className="block text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Retour à la connexion
                  </Link>
                </div>
              </div>
            )}

            {/* État initial (pas de token) */}
            {verificationStatus === 'idle' && !isVerifying && !token && (
              <div className="text-center">
                <Mail className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-4">Vérifiez votre email</h3>
                <p className="text-gray-600 mb-6">
                  Pour accéder à votre compte, vous devez d'abord vérifier votre adresse email. 
                  Vérifiez votre boîte de réception et cliquez sur le lien de vérification.
                </p>
                
                {/* Formulaire pour renvoyer un email */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Adresse email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Entrez votre adresse email"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                    />
                  </div>
                  <button
                    onClick={handleResendVerification}
                    disabled={isResending}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 px-6 rounded font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    {isResending && <Loader2 className="w-4 h-4 animate-spin" />}
                    <RefreshCw className="w-4 h-4" />
                    <span>{isResending ? 'Envoi...' : 'Renvoyer le lien de vérification'}</span>
                  </button>
                  <div className="space-y-2">
                    <Link 
                      href="/login"
                      className="block text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      J'ai déjà vérifié mon email
                    </Link>
                    <Link 
                      href="/"
                      className="block text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Retour à l'accueil
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;