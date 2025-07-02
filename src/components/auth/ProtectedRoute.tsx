// src/components/auth/ProtectedRoute.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { Loader2, AlertCircle, Mail } from 'lucide-react';
import Link from 'next/link';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireEmailVerification?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireEmailVerification = false 
}) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  // Affichage du loader pendant la vérification
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  // Redirection si non connecté
  if (!isAuthenticated) {
    router.push('/login');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Redirection vers la page de connexion...</p>
        </div>
      </div>
    );
  }

  // Vérification de l'email si requis
  if (requireEmailVerification && user && !user.isEmailVerified) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="py-16">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
              <div className="text-center">
                <Mail className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-4">Email non vérifié</h2>
                <p className="text-gray-600 mb-6">
                  Vous devez vérifier votre adresse email avant de pouvoir accéder à cette page.
                </p>
                <div className="space-y-3">
                  <Link 
                    href="/verify-email"
                    className="block bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded font-medium transition-colors"
                  >
                    Vérifier mon email
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
          </div>
        </div>
      </div>
    );
  }

  // Vérification si le compte est actif
  if (user && user.isActive === false) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="py-16">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-4 text-red-600">Compte désactivé</h2>
                <p className="text-gray-600 mb-6">
                  Votre compte a été temporairement désactivé. Veuillez contacter notre support pour plus d'informations.
                </p>
                <div className="space-y-3">
                  <Link 
                    href="/contact"
                    className="block bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded font-medium transition-colors"
                  >
                    Contacter le support
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
          </div>
        </div>
      </div>
    );
  }

  // Si tout est OK, afficher le contenu
  return <>{children}</>;
};

export default ProtectedRoute;