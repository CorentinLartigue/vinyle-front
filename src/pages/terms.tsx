import React from 'react';
import { FileText } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <FileText className="w-14 h-14 text-orange-500 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
              Conditions <span className="text-orange-500">générales de vente</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Retrouvez ici les règles qui encadrent vos achats sur DoVinyl. Nous nous engageons à vous offrir une expérience transparente et sécurisée.
            </p>
          </div>
        </section>
        {/* Sections principales */}
        <section className="space-y-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Objet</h2>
            <p className="text-gray-600">Les présentes conditions régissent les ventes de vinyles sur le site DoVinyl. Toute commande implique l'acceptation pleine et entière de ces conditions.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Commande</h2>
            <p className="text-gray-600">Vous pouvez commander nos produits en ligne 24h/24. La validation de la commande intervient après confirmation du paiement. Un email récapitulatif vous sera envoyé.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Paiement</h2>
            <p className="text-gray-600">Le paiement s'effectue en ligne via Stripe, par carte bancaire. Les transactions sont sécurisées et vos données protégées.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Livraison</h2>
            <p className="text-gray-600">Livraison à domicile en France métropolitaine, Corse, Belgique et Luxembourg. Délais de 2 à 4 jours ouvrés. Livraison offerte dès 30€ d'achat, sinon 3,90€.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Retours</h2>
            <p className="text-gray-600">Vous disposez de 14 jours après réception pour retourner un vinyle non ouvert. Remboursement ou échange rapide, sans frais cachés.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Responsabilité</h2>
            <p className="text-gray-600">DoVinyl ne saurait être tenu responsable des dommages indirects liés à l'utilisation du site ou à l'achat de produits. En cas de litige, une solution amiable sera recherchée en priorité.</p>
          </div>
        </section>
        {/* Contact */}
        <section className="bg-white rounded-lg shadow-md p-8 text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact</h2>
          <p className="text-gray-600">Pour toute question sur nos conditions, contactez-nous à <a href="mailto:contact@dovinyl.fr" className="text-orange-500 hover:underline">contact@dovinyl.fr</a></p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage; 