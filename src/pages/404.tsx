import React from 'react';
import Link from 'next/link';
import { Home, Search, ArrowLeft, Disc3 } from 'lucide-react';

const Custom404 = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Left side - Visual */}
                        <div className="lg:w-1/2">
                            <div className="relative">
                                <div className="w-full h-80 bg-gradient-to-br from-red-400 to-orange-500 rounded-lg overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-80"></div>
                                    <div className="relative z-10 p-8">
                                        <div className="text-center">
                                            <h3 className="text-6xl font-bold text-white mb-4">404</h3>
                                            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center">
                                                <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                                                    <Disc3 className="w-12 h-12 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Content */}
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <h1 className="text-4xl font-bold mb-6">Page non trouvée</h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Oops ! Il semblerait que cette page n&apos;existe pas dans notre collection de vinyles.
                            </p>
                            <p className="text-gray-600 mb-8">
                                La page que vous recherchez a peut-être été déplacée, supprimée ou n&apos;a jamais existé.
                            </p>

                            {/* Action buttons */}
                            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center lg:justify-start">
                                <Link href="/" className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors">
                                    <Home className="w-5 h-5 mr-2" />
                                    Retour à l&apos;accueil
                                </Link>
                                <Link href="/products" className="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors">
                                    <Search className="w-5 h-5 mr-2" />
                                    Parcourir les vinyles
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Suggestions */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-12">Que souhaitez-vous faire ?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Home className="w-8 h-8 text-orange-500" />
                            </div>
                            <h3 className="font-semibold mb-2">Page d&apos;accueil</h3>
                            <p className="text-gray-600 text-sm mb-4">Découvrez nos dernières nouveautés et albums recommandés</p>
                            <Link href="/" className="text-orange-500 hover:text-orange-600 font-medium">
                                Aller à l&apos;accueil →
                            </Link>
                        </div>

                        <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-orange-500" />
                            </div>
                            <h3 className="font-semibold mb-2">Rechercher</h3>
                            <p className="text-gray-600 text-sm mb-4">Trouvez vos vinyles préférés dans notre catalogue</p>
                            <Link href="/products" className="text-orange-500 hover:text-orange-600 font-medium">
                                Rechercher →
                            </Link>
                        </div>

                        <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Disc3 className="w-8 h-8 text-orange-500" />
                            </div>
                            <h3 className="font-semibold mb-2">Catégories</h3>
                            <p className="text-gray-600 text-sm mb-4">Explorez par genre musical : Rock, Jazz, Blues...</p>
                            <Link href="/#categories" className="text-orange-500 hover:text-orange-600 font-medium">
                                Voir les catégories →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Back button */}
            <section className="py-8 bg-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <button 
                        onClick={() => window.history.back()} 
                        className="inline-flex items-center text-gray-600 hover:text-orange-500 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour à la page précédente
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Custom404;