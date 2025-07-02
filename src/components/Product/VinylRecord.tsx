import React, { useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

interface ArtistInfo {
    name: string;
    bio?: string;
}

interface Product {
    id: string;
    productName: string;
    date?: string;
    price?: number;
    description: string;
    imagePath?: string;
    artistInfos: ArtistInfo[];
    categoryNames: string[];
}

interface VinylRecordProps {
    product: Product;
}

const VinylRecord: React.FC<VinylRecordProps> = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { isProductFavorite, toggleFavorite, loading } = useFavorites();

    const handleToggleLike = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (loading) return; // Éviter les clics multiples pendant le chargement
        
        await toggleFavorite(product.id);
    };

    // Extraire l'année de la date
    const releaseYear = product.date ? new Date(product.date).getFullYear() : '';
    const artistName = product.artistInfos && product.artistInfos.length > 0 ? product.artistInfos[0].name : 'Artiste inconnu';
    const isFavorite = isProductFavorite(product.id);

    return (
        <div
            className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 p-4 group relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link
                href={`/product/${product.id}`}
                className="block cursor-pointer"
            >
                <div className={`relative mb-4`}>
                    {/* Vinyle avec animation */}
                    <div className={`w-full h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center relative overflow-hidden transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}>
                        <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                            <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center">
                                <div className="w-3 h-3 bg-black rounded-full"></div>
                            </div>
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute border border-gray-700 rounded-full opacity-30"
                                    style={{
                                        width: `${20 + i * 15}px`,
                                        height: `${20 + i * 15}px`
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Informations du produit */}
                <div className="text-center space-y-2">
                    {/* Affichage de toutes les catégories */}
                    <div className="flex flex-wrap justify-center gap-1">
                        {product.categoryNames && product.categoryNames.length > 0 ? (
                            product.categoryNames.map((category, index) => (
                                <span 
                                    key={index}
                                    className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full uppercase font-medium"
                                >
                                    {category}
                                </span>
                            ))
                        ) : (
                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full uppercase font-medium">
                                Catégorie
                            </span>
                        )}
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                            {product.productName}
                        </h3>
                        <p className="text-xs text-gray-600">
                            {artistName}
                        </p>
                        <p className="text-xs text-gray-500">{releaseYear}</p>
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg font-bold text-green-600">
                            €{product.price || 'Prix non disponible'}
                        </span>
                    </div>
                </div>
            </Link>

            {/* Bouton favori hors du lien */}
            <button
                onClick={handleToggleLike}
                disabled={loading}
                className={`absolute top-2 right-2 p-2 rounded-full shadow-sm transition-all duration-200 ${
                    isFavorite
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-white text-gray-400 hover:bg-gray-50 hover:text-red-500'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
        </div>
    );
};

export default VinylRecord;
