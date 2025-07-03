import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '../../context/ToastProvider';
import { useFavorites } from '@/hooks/useFavorites';
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

const ALBUMS_PER_PAGE = 4;

const NewProduct: React.FC = () => {
    const router = useRouter();
    const { showError } = useToast();
    const { handleAddToFavorites, toggleProductFavoris, loading: loadingFav } = useFavorites();
    const { user } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
            const url = token ? 'http://localhost:3000/api/products/with-favoris-status/me' : 'http://localhost:3000/api/products';
            const headers: Record<string, string> = { 'accept': '*/*' };
            if (token) headers['Authorization'] = `Bearer ${token}`;
            try {
                const res = await fetch(url, { headers });
                if (!res.ok) throw new Error('Erreur lors de la récupération des produits');
                const data = await res.json();
                // Filtrer les produits à venir (date > aujourd'hui)
                const now = new Date();
                const filtered = data.filter((prod: any) => {
                    const dateStr = prod.date;
                    if (!dateStr) return false;
                    const d = new Date(dateStr);
                    return d.getTime() > now.getTime();
                });
                setProducts(filtered);
                setLoading(false);
            } catch (err) {
                setProducts([]);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleProductClick = (productId: string) => {
        router.push(`/product/${productId}`);
    };

    const handlePrev = () => {
        if (products.length <= ALBUMS_PER_PAGE) return;
        setCurrentIndex((prev) => prev === 0 ? Math.max(products.length - (products.length % ALBUMS_PER_PAGE || ALBUMS_PER_PAGE), 0) : prev - ALBUMS_PER_PAGE);
    };

    const handleNext = () => {
        if (products.length <= ALBUMS_PER_PAGE) return;
        setCurrentIndex((prev) => {
            const nextIndex = prev + ALBUMS_PER_PAGE;
            if (nextIndex >= products.length) return 0;
            return nextIndex;
        });
    };

    const visibleProducts = products.slice(currentIndex, currentIndex + ALBUMS_PER_PAGE);

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Nouveauté à venir</h2>
                </div>
                {loading ? (
                    <div className="text-center py-8 text-gray-500">Chargement...</div>
                ) : products.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">Aucune nouveauté à venir.</div>
                ) : (
                    <div>
                        <div className="flex justify-end items-center mb-4">
                            {products.length > ALBUMS_PER_PAGE && (
                                <div className="flex space-x-2">
                                    <button
                                        onClick={handlePrev}
                                        className="px-3 py-1 rounded bg-orange-500 text-white hover:bg-orange-600"
                                    >
                                        ←
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="px-3 py-1 rounded bg-orange-500 text-white hover:bg-orange-600"
                                    >
                                        →
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {visibleProducts.map((product, idx) => {
                                const artistName = product.artistInfos && product.artistInfos.length > 0
                                    ? product.artistInfos[0].name
                                    : 'Artiste inconnu';

                                return (
                                    <div
                                        key={product.id}
                                        className="group cursor-pointer"
                                        onClick={() => handleProductClick(product.id)}
                                    >
                                        <div className="relative mb-4">
                                            <div className="w-full aspect-square bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                                                {product.imagePath ? (
                                                    <img
                                                        src={`https://ltwhfwsovkxhbfjzdfet.supabase.co/storage/v1/object/public/images/${product.imagePath}.png`}
                                                        alt={product.productName}
                                                        className="object-cover w-full h-full rounded-lg"
                                                    />
                                                ) : (
                                                    <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                                                        <div className="w-6 h-6 bg-black rounded-full"></div>
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    toggleProductFavoris(product, (newFav) => {
                                                        setProducts(prev => {
                                                            const copy = [...prev];
                                                            copy[idx + currentIndex] = { ...product, ...newFav };
                                                            return copy;
                                                        });
                                                    });
                                                }}
                                                className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10 transition-all
                                                    ${product.isFavoris ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white text-red-500 border-2 border-red-500 hover:bg-red-50'}`}
                                            >
                                                <Heart className={`w-4 h-4 ${product.isFavoris ? 'fill-current' : ''}`} />
                                            </button>
                                        </div>
                                        <h3 className="font-semibold mb-1 group-hover:text-orange-500 transition-colors">{product.productName}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{artistName}</p>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span className="font-bold text-orange-500">{product.price}€</span>
                                        </div>
                                        <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default NewProduct;
