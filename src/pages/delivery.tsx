import React from 'react';
import { Truck, MapPin, Clock, RotateCcw, Phone, CheckCircle } from 'lucide-react';

const DeliveryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Truck className="w-14 h-14 text-orange-500 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
              Informations <span className="text-orange-500">de livraison</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez tout ce qu'il faut savoir sur la livraison de vos vinyles DoVinyl : délais, frais, zones desservies, suivi et retours. Notre équipe met tout en œuvre pour que votre expérience soit simple, rapide et sécurisée.
            </p>
          </div>
        </section>
        {/* Infos principales */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center">
            <Clock className="w-10 h-10 text-green-500 mb-3" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Délais de livraison</h2>
            <p className="text-gray-600">Expédition sous 24h ouvrées. Livraison à domicile sous 2 à 4 jours ouvrés en France métropolitaine.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center">
            <MapPin className="w-10 h-10 text-green-500 mb-3" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Zones desservies</h2>
            <p className="text-gray-600">Livraison à domicile partout en France métropolitaine, Corse, Belgique et Luxembourg. Autres destinations sur demande.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center">
            <CheckCircle className="w-10 h-10 text-green-500 mb-3" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Frais de port</h2>
            <p className="text-gray-600">Livraison à domicile offerte dès 30€ d'achat. Sinon, frais fixes de 3,90€.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center">
            <RotateCcw className="w-10 h-10 text-green-500 mb-3" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Retours & échanges</h2>
            <p className="text-gray-600">Vous disposez de 14 jours après réception pour retourner un vinyle non ouvert. Remboursement ou échange rapide, sans frais cachés.</p>
          </div>
        </section>
        {/* Suivi & contact */}
        <section className="bg-white rounded-lg shadow-md p-8 text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Suivi de commande</h2>
          <p className="text-gray-600 mb-4">Un email de suivi vous est envoyé dès l'expédition. Vous pouvez suivre votre colis à tout moment via votre espace client ou le lien de suivi fourni.</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Besoin d'aide ?</h2>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-2 text-gray-700 justify-center">
              <Phone className="w-5 h-5 text-orange-500" />
              <span>Service client : <a href="tel:+33123456789" className="text-orange-500 hover:underline">01 23 45 67 89</a></span>
            </div>
            <div className="text-gray-700">Ou par email : <a href="mailto:contact@dovinyl.fr" className="text-orange-500 hover:underline">contact@dovinyl.fr</a></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DeliveryPage; 