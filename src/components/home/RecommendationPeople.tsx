import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/context/ToastProvider';
import { useAuth } from '@/context/AuthContext';

interface Product {
    id: string;
    productName: string;
    artistInfos: Array<{ name: string; bio?: string }>;
    categoryNames: string[];
    date: string;
    price: number;
    imagePath: string;
    description: string;
    isFavoris: boolean;
    favorisId?: string;
}

const PRODUCTS_PER_PAGE = 3;

const RecommendationPeople: React.FC = () => {
    const router = useRouter();
    const { handleAddToFavorites, toggleProductFavoris, loading: loadingFav } = useFavorites();
    const { showError } = useToast();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
            const url = token ? 'http://localhost:3000/api/recommendations/global/me' : 'http://localhost:3000/api/recommendations/global';
            const headers: Record<string, string> = { 'accept': '*/*' };
            if (token) headers['Authorization'] = `Bearer ${token}`;
            try {
                const res = await fetch(url, { headers });
                if (!res.ok) throw new Error('Erreur lors de la récupération des produits');
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleProductClick = (productId: string) => {
        router.push(`/product/${productId}`);
    };

    // Pagination logic
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = products.slice(currentPage * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE + PRODUCTS_PER_PAGE);

    const handlePrev = () => setCurrentPage((prev) => prev === 0 ? totalPages - 1 : prev - 1);
    const handleNext = () => setCurrentPage((prev) => prev === totalPages - 1 ? 0 : prev + 1);

    return (
        <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-100">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-orange-600">Les Vinyles incontournables</h2>
                    <div className="flex space-x-2">
                        <button onClick={handlePrev} className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-orange-400 bg-white text-orange-500 hover:bg-orange-100 transition`}>
                            <span className="text-xl">&#8592;</span>
                        </button>
                        <button onClick={handleNext} className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-orange-400 bg-white text-orange-500 hover:bg-orange-100 transition`}>
                            <span className="text-xl">&#8594;</span>
                        </button>
                    </div>
                </div>
                {loading ? (
                    <div className="text-center py-8 text-gray-500">Chargement...</div>
                ) : products.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">Aucun produit disponible.</div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-8">
                        {paginatedProducts.map((product, idx) => {
                            const artistName = product.artistInfos && product.artistInfos.length > 0 
                                ? product.artistInfos[0].name 
                                : 'Artiste inconnu';
                            return (
                                <div 
                                    key={product.id} 
                                    className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all w-80 p-6 flex flex-col items-center group cursor-pointer border-2 border-orange-100 hover:border-orange-300"
                                    onClick={() => handleProductClick(product.id)}
                                >
                                    <div className="relative mb-4 w-32 h-32 flex items-center justify-center">
                                        <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                                            {product.imagePath ? (
                                                <img
                                                    src={`https://ltwhfwsovkxhbfjzdfet.supabase.co/storage/v1/object/public/images/${product.imagePath}.png`}
                                                    alt={product.productName}
                                                    className="object-cover w-28 h-28 rounded-full border-4 border-white shadow"
                                                />
                                            ) : (
                                                <div className="w-24 h-24 bg-orange-200 rounded-full flex items-center justify-center">
                                                    <Heart className="w-10 h-10 text-orange-400" />
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
                                            className={`absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10 transition-all
                                                ${product.isFavoris ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white text-red-500 border-2 border-red-500 hover:bg-red-50'}`}
                                        >
                                            <Heart className={`w-5 h-5 ${product.isFavoris ? 'fill-current' : ''}`} />
                                        </button>
                                    </div>
                                    <h3 className="font-bold text-lg mb-1 group-hover:text-orange-500 transition-colors text-center">{product.productName}</h3>
                                    <p className="text-sm text-gray-600 mb-2 text-center">{artistName}</p>
                                    <span className="font-bold text-orange-500 text-lg">{product.price}€</span>
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
                                className={`w-3 h-3 rounded-full border-2 ${currentPage === idx ? 'bg-orange-500 border-orange-500' : 'bg-white border-orange-300'} mx-1`}
                                aria-label={`Page ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default RecommendationPeople;
