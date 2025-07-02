// src/pages/reset-password.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff, Loader2, CheckCircle, XCircle, Key } from 'lucide-react';
import Gramophone from '@/assets/gramophone.png';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastProvider';

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetStatus, setResetStatus] = useState<'form' | 'success' | 'invalid'>('form');

  const router = useRouter();
  const { token } = router.query;
  const { modifyPassword } = useAuth();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    if (router.isReady && !token) {
      setResetStatus('invalid');
    }
  }, [token, router.isReady]);

  const validatePasswords = () => {
    if (!newPassword || !verifyPassword) {
      showError('Veuillez remplir tous les champs');
      return false;
    }

    if (newPassword.length < 6) {
      showError('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }

    if (newPassword !== verifyPassword) {
      showError('Les mots de passe ne correspondent pas');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswords() || typeof token !== 'string') {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await modifyPassword(token, newPassword, verifyPassword);
      
      if (result.success) {
        setResetStatus('success');
        showSuccess('Mot de passe modifié avec succès !');
      } else {
        showError(result.message);
      }
    } catch (error) {
      showError('Une erreur est survenue lors de la modification du mot de passe');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    switch (resetStatus) {
      case 'form':
        return (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-center mb-6">
              <Key className="w-12 h-12 text-orange-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Nouveau mot de passe</h3>
              <p className="text-sm text-gray-600">
                Choisissez un nouveau mot de passe sécurisé pour votre compte.
              </p>
            </div>

            {/* Nouveau mot de passe */}
            <div>
              <label htmlFor="newPassword" className="block text-sm text-gray-600 mb-2">
                Nouveau mot de passe *
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Entrez votre nouveau mot de passe"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum 6 caractères</p>
            </div>

            {/* Confirmation du mot de passe */}
            <div>
              <label htmlFor="verifyPassword" className="block text-sm text-gray-600 mb-2">
                Confirmer le mot de passe *
              </label>
              <div className="relative">
                <input
                  id="verifyPassword"
                  type={showVerifyPassword ? 'text' : 'password'}
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  placeholder="Confirmez votre nouveau mot de passe"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowVerifyPassword(!showVerifyPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showVerifyPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Indicateur de force du mot de passe */}
            {newPassword && (
              <div className="space-y-2">
                <div className="text-xs text-gray-600">Force du mot de passe :</div>
                <div className="flex space-x-1">
                  <div className={`h-2 w-1/4 rounded ${newPassword.length >= 6 ? 'bg-red-400' : 'bg-gray-200'}`}></div>
                  <div className={`h-2 w-1/4 rounded ${newPassword.length >= 8 ? 'bg-yellow-400' : 'bg-gray-200'}`}></div>
                  <div className={`h-2 w-1/4 rounded ${newPassword.length >= 10 && /[A-Z]/.test(newPassword) ? 'bg-blue-400' : 'bg-gray-200'}`}></div>
                  <div className={`h-2 w-1/4 rounded ${newPassword.length >= 12 && /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword) && /[^A-Za-z0-9]/.test(newPassword) ? 'bg-green-400' : 'bg-gray-200'}`}></div>
                </div>
              </div>
            )}

            {/* Bouton de soumission */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 px-6 rounded font-medium transition-colors flex items-center justify-center space-x-2"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{isSubmitting ? 'Modification...' : 'Modifier le mot de passe'}</span>
              </button>
            </div>

            <div className="text-center pt-4">
              <Link 
                href="/login"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Retour à la connexion
              </Link>
            </div>
          </form>
        );

      case 'success':
        return (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-green-600">Mot de passe modifié !</h2>
            <p className="text-gray-600 mb-6">
              Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
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

      case 'invalid':
        return (
          <div className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-red-600">Lien invalide</h2>
            <p className="text-gray-600 mb-6">
              Ce lien de réinitialisation est invalide ou a expiré. Veuillez demander un nouveau lien de réinitialisation.
            </p>
            <div className="space-y-3">
              <Link 
                href="/login"
                className="block bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded font-medium transition-colors"
              >
                Demander un nouveau lien
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

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Bandeau breadcrumb */}
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 h-[70px]">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">
          <h1 className="font-bold text-white text-[19px]">Réinitialisation du mot de passe</h1>
          <div className="text-white/90 text-sm">
            <span className="hover:text-white cursor-pointer">Accueil</span>
            <span className="mx-2">-</span>
            <span className="text-white/70">Réinitialisation</span>
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

export default ResetPassword;