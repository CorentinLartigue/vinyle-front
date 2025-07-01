import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User } from 'lucide-react';
import Gramophone from '@/assets/gramophone.png';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    postCode: '',
    country: '',
    regionState: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Tentative d’inscription :', formData);
    // TODO: ajouter logique d’appel API
  };

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Fil d’Ariane */}
        <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 h-[70px]">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">
            <h1 className="font-bold text-white text-[19px]">Inscription</h1>
            <div className="text-white/90 text-sm">
              <span className="hover:text-white cursor-pointer">Accueil</span>
              <span className="mx-2">-</span>
              <span className="text-white/70">Inscription</span>
            </div>
          </div>
        </div>

      {/* Register Form Section */}
      <div className="py-16">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
            {/* Logo dans le formulaire */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Image 
                  src={Gramophone}
                  alt="DoVinyl Logo"
                  className="w-auto h-8 mr-2"
                />
                <h2 className="text-xl font-bold text-gray-800">DoVinyl  </h2>
              </div>
            </div>

              {/* Formulaire */}
              <div className="space-y-5">
                {/* Prénom et Nom */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Prénom*</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Entrez votre prénom"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Nom*</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Entrez votre nom"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                    />
                  </div>
                </div>

                {/* Email et Téléphone */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">E-mail*</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Entrez votre adresse e-mail"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Téléphone*</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Entrez votre numéro de téléphone"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                    />
                  </div>
                </div>

                {/* Adresse */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Adresse*</label>
                  <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Entrez votre adresse"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                  />
                </div>

                {/* Ville et Code postal */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Ville*</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Votre ville"
                        className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Code postal</label>
                    <input
                        type="text"
                        name="postCode"
                        value={formData.postCode}
                        onChange={handleInputChange}
                        placeholder="Code postal"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                    />
                  </div>
                </div>

                {/* Pays et Région */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Pays*</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="Votre pays"
                        className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Région / État*</label>
                    <input
                        type="text"
                        name="regionState"
                        value={formData.regionState}
                        onChange={handleInputChange}
                        placeholder="Région ou État"
                        className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                    />
                  </div>
                </div>

                {/* Boutons */}
                <div className="flex items-center justify-between pt-6">
                  <button
                      onClick={handleSubmit}
                      className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded font-medium transition-colors"
                  >
                    S'inscrire
                  </button>
                  <Link
                      href="/login"
                      className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="hidden lg:block text-sm">Se connecter</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Register;
