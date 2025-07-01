import React from 'react';
import { useRouter } from 'next/router';
import { Heart } from 'lucide-react';
import Link from 'next/link';

interface Product {
    id: number;
    title: string;
    artist: string;
    price: number;
    image: string;
    category: string;
    description: string;
    favoris: boolean;
}

const WeeklyNovelty: React.FC = () => {
    const router = useRouter();
    
    const newReleases: Product[] = [
        { id: 5, title: 'Dark Side of the Moon', artist: 'Pink Floyd', price: 27.99, image: '/api/placeholder/200/200', category: 'Rock', description: 'Un album emblématique de Pink Floyd.', favoris: false },
        { id: 6, title: 'Kind of Blue', artist: 'Miles Davis', price: 31.99, image: '/api/placeholder/200/200', category: 'Jazz', description: 'Le chef-d\'œuvre du jazz.', favoris: false },
        { id: 7, title: 'The Blues Collection', artist: 'B.B. King', price: 25.99, image: '/api/placeholder/200/200', category: 'Blues', description: 'Un classique du blues.', favoris: false },
        { id: 8, title: 'Amazing Grace', artist: 'Aretha Franklin', price: 28.99, image: '/api/placeholder/200/200', category: 'Gospel', description: 'Un album gospel puissant.', favoris: false }
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
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Nouveauté de la semaine</h2>
                    <Link href="/product" className="text-red-500 hover:text-red-600">Voir tout →</Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {newReleases.map((product) => (
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
                            <h3 className="font-semibold mb-1 group-hover:text-orange-500 transition-colors">{product.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{product.artist}</p>
                            <div className="flex items-center space-x-2">
                                <span className="font-bold text-orange-500">{product.price}€</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{product.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WeeklyNovelty;
