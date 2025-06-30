import React from 'react';
import { Shield } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Shield className="w-14 h-14 text-orange-500 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
              Politique de <span className="text-orange-500">confidentialité</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chez DoVinyl, la protection de vos données personnelles est une priorité. Découvrez comment nous collectons, utilisons et protégeons vos informations.
            </p>
          </div>
        </section>
        {/* Sections principales */}
        <section className="space-y-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Quelles données sont collectées ?</h2>
            <p className="text-gray-600">Nous collectons uniquement les informations nécessaires à la gestion de votre commande et à l'amélioration de nos services : nom, adresse, email, numéro de téléphone, historique d'achats, préférences musicales, et données de navigation (cookies).</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Comment sont utilisées vos données ?</h2>
            <p className="text-gray-600">Vos données servent à traiter vos commandes, personnaliser votre expérience, vous envoyer des informations sur nos nouveautés et offres, et garantir la sécurité de vos transactions. Nous ne partageons jamais vos informations avec des tiers à des fins commerciales.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Cookies & suivi</h2>
            <p className="text-gray-600">Nous utilisons des cookies pour faciliter la navigation, analyser l'audience du site et personnaliser le contenu. Vous pouvez à tout moment gérer vos préférences via les paramètres de votre navigateur.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Vos droits</h2>
            <p className="text-gray-600">Conformément à la réglementation, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition sur vos données. Pour exercer vos droits, contactez-nous à l'adresse ci-dessous.</p>
          </div>
        </section>
        {/* Contact */}
        <section className="bg-white rounded-lg shadow-md p-8 text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact</h2>
          <p className="text-gray-600">Pour toute question ou demande concernant vos données personnelles, écrivez-nous à <a href="mailto:contact@dovinyl.fr" className="text-orange-500 hover:underline">contact@dovinyl.fr</a></p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage; 