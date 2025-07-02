import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Music, Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/context/ToastProvider';

interface Product {
    id: string;
    productName: string;
    artistInfos: Array<{ name: string; bio?: string }>;
    categoryNames: string[];
    date: string;
    price: number;
    imagePath: string;
    description: string;
}

const RecommendationProfile: React.FC = () => {
    const router = useRouter();
    const { handleAddToFavorites } = useFavorites();
    const { showError } = useToast();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/api/products', {
            headers: { 'accept': '*/*' }
        })
            .then(res => {
                if (!res.ok) throw new Error('Erreur lors de la récupération des produits');
                return res.json();
            })
            .then((data: Product[]) => {
                // Prendre les 4 premiers produits pour l'affichage
                setProducts(data.slice(0, 4));
            })
            .catch(err => {
                showError('Erreur lors de la récupération des produits : ' + err);
            })
            .finally(() => setLoading(false));
    }, [showError]);

    const handleProductClick = (productId: string) => {
        router.push(`/product/${productId}`);
    };

    return (
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
                    <div className="lg:w-2/3">
                        {loading ? (
                            <div className="text-center py-8 text-gray-500">Chargement...</div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">Aucun produit disponible.</div>
                        ) : (
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                {products.map((product) => {
                                    const artistName = product.artistInfos && product.artistInfos.length > 0 
                                        ? product.artistInfos[0].name 
                                        : 'Artiste inconnu';
                                    
                                    return (
                                        <div 
                                            key={product.id} 
                                            className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer"
                                            onClick={() => handleProductClick(product.id)}
                                        >
                                            <div className="relative">
                                                <div className="w-full h-32 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                                                    <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                                                        <div className="w-6 h-6 bg-black rounded-full"></div>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={(e) => handleAddToFavorites(e, product.id)}
                                                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                                >
                                                    <Heart className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-semibold text-sm mb-1 group-hover:text-orange-500 transition-colors">{product.productName}</h4>
                                                <p className="text-xs text-gray-600 mb-2">{artistName}</p>
                                                <div className="flex justify-between items-center">
                                                    <span className="font-bold text-orange-500">{product.price}€</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecommendationProfile;
