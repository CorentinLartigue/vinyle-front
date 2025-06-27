import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User } from 'lucide-react';
import Gramophone from '@/assets/gramophone.png';

const LoginSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [souvenirDeMoi, setSouvenirDeMoi] = useState(false);

  const handleSubmit = () => {
    console.log('Tentative de connexion :', {
      email,
      motDePasse,
      souvenirDeMoi,
    });

    // TODO : Implémenter appel API d'authentification ici
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

              {/* Formulaire */}
              <div className="space-y-5">
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
                  />
                </div>

                {/* Champ mot de passe */}
                <div>
                  <label htmlFor="motDePasse" className="block text-sm text-gray-600 mb-2">
                    Mot de passe *
                  </label>
                  <input
                      id="motDePasse"
                      type="password"
                      value={motDePasse}
                      onChange={(e) => setMotDePasse(e.target.value)}
                      placeholder="Entrez votre mot de passe"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                  />
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
                      className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>

                {/* Boutons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                      onClick={handleSubmit}
                      className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded font-medium transition-colors"
                  >
                    Se connecter
                  </button>
                  <Link
                      href="/register"
                      className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="hidden lg:block text-sm">Créer un compte</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default LoginSection;
