import React from 'react';
import { useRouter } from 'next/router';
import { Heart } from 'lucide-react';

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


const RecommendedVinyl: React.FC = () => {
    const router = useRouter();
    
    const featuredProducts: Product[] = [
        { id: 1, title: 'Rumours', artist: 'Fleetwood Mac', price: 24.99, image: '/api/placeholder/200/200', category: 'Rock', description: 'Un classique de Fleetwood Mac.', favoris: false },
        { id: 2, title: 'A Love Supreme', artist: 'John Coltrane', price: 19.99, image: '/api/placeholder/200/200', category: 'Jazz', description: 'Un chef-d\'œuvre du jazz.', favoris: false },
        { id: 3, title: 'Electric Mud', artist: 'Muddy Waters', price: 29.99, image: '/api/placeholder/200/200', category: 'Blues', description: 'Un album incontournable de Muddy Waters.', favoris: false },
        { id: 4, title: 'Symphonie n°9', artist: 'Beethoven', price: 22.99, image: '/api/placeholder/200/200', category: 'Classic', description: 'La célèbre 9ème symphonie.', favoris: false }
    ];

    const handleProductClick = (productId: number) => {
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredProducts.slice(0, 3).map((product) => (
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
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log(`Added product ${product.id} to favorites`);
                                    }}
                                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Heart className="w-4 h-4" />
                                </button>
                            </div>
                            <h3 className="font-semibold mb-1 group-hover:text-orange-500 transition-colors">{product.title}</h3>
                            <p className="text-sm text-gray-600">{product.artist}</p>
                            <p className="text-xs text-gray-500 mt-1">{product.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecommendedVinyl;
