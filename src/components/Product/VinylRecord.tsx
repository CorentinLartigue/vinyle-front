import React, { useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';

const VinylRecord = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const handleToggleLike = (e) => {
        e.preventDefault();
        setIsLiked(!isLiked);
    };

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
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full uppercase font-medium">
                        {product.category}
                    </span>

                    <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                            {product.name}
                        </h3>
                        <p className="text-xs text-gray-600">{product.artist}</p>
                        <p className="text-xs text-gray-500">{product.releaseYear}</p>
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg font-bold text-green-600">
                            €{product.price}
                        </span>
                    </div>
                </div>
            </Link>

            {/* Bouton favori hors du lien */}
            <button
                onClick={handleToggleLike}
                className={`absolute top-2 right-2 p-2 rounded-full shadow-sm transition-colors ${
                    isLiked
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-white text-gray-400 hover:bg-gray-50 hover:text-red-500'
                }`}
            >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
        </div>
    );
};

export default VinylRecord;
