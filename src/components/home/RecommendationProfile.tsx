import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Music, Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/context/ToastProvider';
import { useAuth } from '@/context/AuthContext';

interface Product {
    id: string;
    productName: string;
    artists: Array<{ name: string; bio?: string }>;
    categoryNames: string[];
    date: string;
    price: number;
    imagePath: string;
    description: string;
    isFavoris: boolean;
    favorisId?: string;
}

const PRODUCTS_PER_PAGE = 2;

const RecommendationProfile: React.FC = () => {
    const router = useRouter();
    const { handleAddToFavorites, toggleProductFavoris, loading: loadingFav } = useFavorites();
    const { showError } = useToast();
    const [products, setProducts] = useState<Product[]>([]);
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState(0);

    const handleProductClick = (productId: string) => {
        router.push(`/product/${productId}`);
    };

    // Pagination logic
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = products.slice(currentPage * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE + PRODUCTS_PER_PAGE);

    const handlePrev = () => setCurrentPage((prev) => prev === 0 ? totalPages - 1 : prev - 1);
    const handleNext = () => setCurrentPage((prev) => prev === totalPages - 1 ? 0 : prev + 1);

    if (!user) return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-1/3">
                        <h2 className="text-2xl font-bold mb-6">Pour écouter :</h2>
                        <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg p-6 text-white">
                            <div className="w-16 h-16 bg-yellow-400 rounded-full mb-4 flex items-center justify-center">
                                <Music className="w-8 h-8 text-gray-800" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">DoVinyl</h3>
                            <p className="text-sm opacity-90">Votre destination pour les vinyles de qualité</p>
                        </div>
                    </div>
                    <div className="lg:w-2/3 flex items-center justify-center">
                        <div className="w-full flex justify-center">
                            <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl shadow-md px-8 py-8 flex flex-col items-center max-w-xl">
                                <Music className="h-10 w-10 mb-3 text-orange-400" />
                                <div className="text-center text-gray-700 text-lg font-medium">
                                    Connectez-vous pour découvrir vos recommandations personnalisées !
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

    return (
        <section className="py-16 bg-gradient-to-br from-white to-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-1/3">
                        <h2 className="text-2xl font-bold mb-6">Pour écouter :</h2>
                        <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg p-6 text-white">
                            <div className="w-16 h-16 bg-yellow-400 rounded-full mb-4 flex items-center justify-center">
                                <Music className="w-8 h-8 text-gray-800" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">DoVinyl</h3>
                            <p className="text-sm opacity-90">Votre destination pour les vinyles de qualité</p>
                        </div>
                    </div>
                    <div className="lg:w-2/3">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-700">Vos recommandations</h3>
                            <div className="flex space-x-2">
                                <button onClick={handlePrev} className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-blue-400 bg-white text-blue-500 hover:bg-blue-100 transition`}>
                                    <span className="text-xl">&#8592;</span>
                                </button>
                                <button onClick={handleNext} className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-blue-400 bg-white text-blue-500 hover:bg-blue-100 transition`}>
                                    <span className="text-xl">&#8594;</span>
                                </button>
                            </div>
                        </div>
                        {loadingFav ? (
                            <div className="text-center py-8 text-gray-500">Chargement...</div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">Aucun produit disponible.</div>
                        ) : (
                            <div className="flex flex-wrap justify-center gap-8">
                                {paginatedProducts.map((product, idx) => {
                                    const artistName = product.artists && product.artists.length > 0 
                                        ? product.artists[0].name 
                                        : 'Artiste inconnu';
                                    return (
                                        <div 
                                            key={product.id} 
                                            className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all w-80 p-5 flex flex-col items-center group cursor-pointer border border-gray-200 hover:border-blue-300"
                                            onClick={() => handleProductClick(product.id)}
                                        >
                                            <div className="relative mb-4 w-28 h-28 flex items-center justify-center">
                                                <div className="w-28 h-28 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                                                    {product.imagePath ? (
                                                        <img
                                                            src={`https://ltwhfwsovkxhbfjzdfet.supabase.co/storage/v1/object/public/images/${product.imagePath}.png`}
                                                            alt={product.productName}
                                                            className="object-cover w-24 h-24 rounded-full border-4 border-white shadow"
                                                        />
                                                    ) : (
                                                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                                                            <Music className="w-8 h-8 text-blue-400" />
                                                        </div>
                                                    )}
                                                </div>
                                                <button 
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        toggleProductFavoris(product, (newFav) => {
                                                            setProducts(prev => {
                                                                const copy = [...prev];
                                                                copy[idx + currentPage * PRODUCTS_PER_PAGE] = { ...product, ...newFav };
                                                                return copy;
                                                            });
                                                        });
                                                    }}
                                                    className={`absolute bottom-0 right-0 w-9 h-9 rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10 transition-all
                                                        ${product.isFavoris ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white text-red-500 border-2 border-red-500 hover:bg-red-50'}`}
                                                >
                                                    <Heart className={`w-4 h-4 ${product.isFavoris ? 'fill-current' : ''}`} />
                                                </button>
                                            </div>
                                            <h4 className="font-semibold text-base mb-1 group-hover:text-blue-500 transition-colors text-center">{product.productName}</h4>
                                            <p className="text-xs text-gray-600 mb-2 text-center">{artistName}</p>
                                            <span className="font-bold text-blue-500 text-base">{product.price}€</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {/* Pagination info */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-6 space-x-1">
                                {Array.from({ length: totalPages }).map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentPage(idx)}
                                        className={`w-3 h-3 rounded-full border-2 ${currentPage === idx ? 'bg-blue-500 border-blue-500' : 'bg-white border-blue-300'} mx-1`}
                                        aria-label={`Page ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecommendationProfile;
