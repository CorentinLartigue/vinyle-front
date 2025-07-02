import React from 'react';
import Gramophone from '@/assets/gramophone.png'
import Image from 'next/image';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-8 mb-8">
            <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
              <div className="flex items-center space-x-2 mb-4">
                <Image
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    src={Gramophone}
                    alt="Logo DoVinyl"
                />
                <span className="text-xl font-bold">DoVinyl</span>
              </div>
              <p className="text-gray-400 mb-4 text-center md:text-left">Votre boutique de vinyles en ligne de confiance</p>
              <div className="flex space-x-4 justify-center md:justify-start">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-pink-600 rounded flex items-center justify-center cursor-pointer hover:bg-pink-700 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <h3 className="font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-2 text-gray-400 text-center">
                <li><Link href="/about" className="hover:text-white transition-colors">À propos de nous</Link></li>
                <li><Link href="/delivery" className="hover:text-white transition-colors">Informations de livraison</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Politique de confidentialité</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Conditions générales</Link></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <h3 className="font-semibold mb-4">S&apos;abonner à notre newsletter</h3>
              <div className="space-y-4 w-full">
                <div className="flex w-full">
                  <input
                      type="email"
                      placeholder="Votre adresse email"
                      className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-l-lg focus:outline-none focus:bg-gray-600"
                  />
                  <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-r-lg transition-colors">
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 DoVinyl. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
