import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Heart } from 'lucide-react';
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

const RecommendationPeople: React.FC = () => {
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
                // Prendre les 3 premiers produits pour l'affichage
                setProducts(data.slice(0, 3));
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
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Les Vinyles incontournables</h2>
                    <div className="flex space-x-2">
                        <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                            ←
                        </button>
                        <button className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
                            →
                        </button>
                    </div>
                </div>
                {loading ? (
                    <div className="text-center py-8 text-gray-500">Chargement...</div>
                ) : products.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">Aucun produit disponible.</div>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {products.map((product) => {
                            const artistName = product.artistInfos && product.artistInfos.length > 0 
                                ? product.artistInfos[0].name 
                                : 'Artiste inconnu';
                            
                            return (
                        <div 
                            key={product.id} 
                            className="text-center group cursor-pointer"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <div className="relative mb-4">
                                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                                    <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                                        <div className="w-6 h-6 bg-black rounded-full"></div>
                                    </div>
                                </div>
                                <button 
                                    onClick={(e) => handleAddToFavorites(e, product.id)}
                                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Heart className="w-4 h-4" />
                                </button>
                            </div>
                                    <h3 className="font-semibold mb-1 group-hover:text-orange-500 transition-colors">{product.productName}</h3>
                                    <p className="text-sm text-gray-600">{artistName}</p>
                        </div>
                            );
                        })}
                </div>
                )}
            </div>
        </section>
    );
};

export default RecommendationPeople;
