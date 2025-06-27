import React from 'react';
import { useRouter } from 'next/router';
import { Music, Heart } from 'lucide-react';

interface Product {
    id: number;
    title: string;
    artist: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
}

const ListeningSection: React.FC = () => {
    const router = useRouter();
    
    const featuredProducts: Product[] = [
        { id: 1, title: 'Abbey Road', artist: 'The Beatles', price: 24.99, image: '/api/placeholder/200/200', category: 'Rock' },
        { id: 2, title: 'Blue Train', artist: 'John Coltrane', price: 19.99, image: '/api/placeholder/200/200', category: 'Jazz' },
        { id: 3, title: 'Born Under a Bad Sign', artist: 'Albert King', price: 29.99, image: '/api/placeholder/200/200', category: 'Blues' },
        { id: 4, title: 'La Traviata', artist: 'Giuseppe Verdi', price: 22.99, image: '/api/placeholder/200/200', category: 'Classic' }
    ];

    const handleProductClick = (productId: number) => {
        router.push(`/product/${productId}`);
    };

    const handleAddToFavorites = (e: React.MouseEvent, productId: number) => {
        e.stopPropagation(); // Empêche la navigation vers les détails
        // TODO: Implement favorites logic
        console.log(`Added product ${productId} to favorites`);
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
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
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
                                        <h4 className="font-semibold text-sm mb-1 group-hover:text-orange-500 transition-colors">{product.title}</h4>
                                        <p className="text-xs text-gray-600 mb-2">{product.artist}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-orange-500">{product.price}€</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ListeningSection;
