import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '../../context/ToastProvider';
import { useFavorites } from '@/hooks/useFavorites';

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

const NewProductMonth: React.FC = () => {
    const router = useRouter();
    const { showError } = useToast();
    const { handleAddToFavorites } = useFavorites();
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
                // Filtrer les produits sortis ce mois-ci (champ 'date')
                const now = new Date();
                const currentMonth = now.getMonth();
                const currentYear = now.getFullYear();
                const filtered = data.filter(prod => {
                    if (prod.date) {
                        // prod.date est au format 'YYYY-MM-DD'
                        const productDate = new Date(prod.date);
                        return productDate.getMonth() === currentMonth && productDate.getFullYear() === currentYear;
                    }
                    return false;
                });
                setProducts(filtered);
            })
            .catch(err => {
                showError('Erreur lors de la récupération des nouveautés : ' + err);
            })
            .finally(() => setLoading(false));
    }, [showError]);

    const handleProductClick = (productId: string) => {
        router.push(`/product/${productId}`);
    };

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Nouveauté du mois</h2>
                    <Link href="/product" className="text-red-500 hover:text-red-600">Voir tout →</Link>
                </div>
                {loading ? (
                    <div className="text-center py-8 text-gray-500">Chargement...</div>
                ) : products.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">Aucune nouveauté ce mois-ci.</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {products.map((product) => {
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
                )}
            </div>
        </section>
    );
};

export default NewProductMonth;
