import React from 'react';
import Image from 'next/image';
import { Search, Check, Truck, Phone, CreditCard, RotateCcw, Disc3, Shield, Headphones, Mail, Gift } from 'lucide-react';
import Cover from '@/assets/cover.png'
import Dovinyl from '@/assets/dovinyl.png'

import PopularCategories from '@/components/home/PopularCategories';
import ListeningSection from '@/components/home/ListeningSection';
import RecommendedVinyl from '@/components/home/RecommendedVinyl';
import WeeklyNovelty from '@/components/home/WeeklyNovelty';


const Index: React.FC = () => {

    return (
        <>
            <section className="pt-8 pb-8">
                <Image src={Cover} alt="Cover DoVinyl" className='w-full h-130 object-cover'/>
            </section>


            <PopularCategories />

            <ListeningSection />

            <RecommendedVinyl />

            <WeeklyNovelty />

            {/* Why Choose Us */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2">
                            <div className="relative">
                                <Image src={Dovinyl} alt="Devanture DoVinyl" className='w-full h-auto'/>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-bold mb-8">Pourquoi choisir DoVinyl ?</h2>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Disc3 className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Vinyles de Qualité Exceptionnelle</h3>
                                        <p className="text-gray-600">Nous sélectionnons minutieusement chaque vinyle pour vous garantir un son authentique et une qualité d&apos;écoute incomparable. Chaque disque est vérifié avant expédition.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Search className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Catalogue Riche et Varié</h3>
                                        <p className="text-gray-600">Explorez notre vaste collection allant des classiques intemporels aux dernières sorties. Du rock au jazz, en passant par le blues et le gospel, trouvez votre bonheur musical.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Shield className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Emballage Sécurisé</h3>
                                        <p className="text-gray-600">Vos vinyles sont précieusement emballés dans des protections spécialisées pour garantir une livraison sans dommage. Votre passion mérite le meilleur soin.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-16 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <Mail className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold mb-4">Restez connecté à l&apos;univers du vinyle</h2>
                        <p className="text-gray-300 text-lg">Recevez nos dernières nouveautés, offres exclusives et conseils d&apos;experts</p>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                        <div className="lg:w-1/3 text-center">
                            <Gift className="w-12 h-12 text-orange-500 mx-auto mb-3" />
                            <h3 className="font-semibold mb-2">Offres Exclusives</h3>
                            <p className="text-gray-300 text-sm">Accès prioritaire aux promotions et éditions limitées</p>
                        </div>
                        <div className="lg:w-1/3 text-center">
                            <Headphones className="w-12 h-12 text-orange-500 mx-auto mb-3" />
                            <h3 className="font-semibold mb-2">Conseils d&apos;Experts</h3>
                            <p className="text-gray-300 text-sm">Découvrez nos recommandations et guides d&apos;écoute</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-8 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-2">
                                <Check className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-sm font-medium">Meilleurs prix garantis</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-2">
                                <Truck className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-sm font-medium">Livraison gratuite</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-2">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-sm font-medium">Support client 7j/7</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-2">
                                <CreditCard className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-sm font-medium">Paiement sécurisé</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-2">
                                <RotateCcw className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-sm font-medium">Retours faciles</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Index;