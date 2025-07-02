// src/components/Register.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { User, Eye, EyeOff, Loader2 } from 'lucide-react';
import Gramophone from '@/assets/gramophone.png';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastProvider';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    verifyPassword: '',
    phoneNumber: '',
    address: '',
    city: '',
    postCode: '',
    country: '',
    regionState: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const router = useRouter();
  const { register } = useAuth();
  const { showSuccess, showError, showInfo } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { email, password, verifyPassword } = formData;

    if (!email || !password || !verifyPassword) {
      showError('Veuillez remplir tous les champs obligatoires');
      return false;
    }

    if (password !== verifyPassword) {
      showError('Les mots de passe ne correspondent pas');
      return false;
    }

    if (password.length < 6) {
      showError('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }

    if (!acceptTerms) {
      showError('Veuillez accepter les conditions générales');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await register(formData.email, formData.password, formData.verifyPassword);

      if (result.success) {
        showSuccess('Inscription réussie ! Vérifiez votre email pour activer votre compte.');
        showInfo('Un email de vérification a été envoyé à votre adresse email.');
      } else {
        showError(result.message);
      }
    } catch (error) {
      showError('Une erreur est survenue lors de l\'inscription');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fil d'Ariane */}
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

      {/* Formulaire d'inscription */}
      <div className="py-16">
        <div className="max-w-lg mx-auto">
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
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Prénom et Nom */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Prénom</label>
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
                  <label className="block text-sm text-gray-600 mb-2">Nom</label>
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

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">E-mail *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Entrez votre adresse e-mail"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                  required
                />
              </div>

              {/* Mot de passe */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Mot de passe *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Entrez votre mot de passe"
                    className="w-full px-4 py-3 border border-gray-300 rounded pr-12 focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
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
                <p className="text-xs text-gray-500 mt-1">Minimum 6 caractères</p>
              </div>

              {/* Confirmation du mot de passe */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Confirmer le mot de passe *</label>
                <div className="relative">
                  <input
                    type={showVerifyPassword ? 'text' : 'password'}
                    name="verifyPassword"
                    value={formData.verifyPassword}
                    onChange={handleInputChange}
                    placeholder="Confirmez votre mot de passe"
                    className="w-full px-4 py-3 border border-gray-300 rounded pr-12 focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
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

              {/* Téléphone */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Téléphone</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Entrez votre numéro de téléphone"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                />
              </div>

              {/* Adresse */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Adresse</label>
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
                  <label className="block text-sm text-gray-600 mb-2">Ville</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Votre ville"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
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
                  <label className="block text-sm text-gray-600 mb-2">Pays</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Votre pays"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Région / État</label>
                  <input
                    type="text"
                    name="regionState"
                    value={formData.regionState}
                    onChange={handleInputChange}
                    placeholder="Région ou État"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                  />
                </div>
              </div>

              {/* Conditions */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                  className="mt-1"
                />
                <span className="text-sm text-gray-600">
                  J'accepte les <a href="#" className="text-orange-500 underline">conditions générales</a>.
                </span>
              </div>

              {/* Bouton d'envoi */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded font-medium flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  S'inscrire
                </button>
                <Link href="/login" className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                  <User className="w-4 h-4 mr-1" />
                  Se connecter
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
