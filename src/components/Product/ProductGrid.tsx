import React from 'react';
import VinylRecord from '@components/Product/VinylRecord';

interface ProductGridProps {
    products: any[];
    loading: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                        <div className="w-full h-48 bg-gray-300 rounded-full mb-4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-1/4 mx-auto"></div>
                            <div className="h-3 bg-gray-300 rounded w-full"></div>
                            <div className="h-3 bg-gray-300 rounded w-3/4 mx-auto"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12 flex flex-col items-center justify-center">
                <div className="w-28 h-28 mb-4 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center shadow-md">
                    <svg className="w-16 h-16 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" strokeWidth="2" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Aucun vinyle ne correspond à votre recherche
                </h3>
                <p className="text-gray-600 mb-4">
                    Essayez d'autres mots-clés ou réinitialisez vos filtres pour explorer toute la boutique.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {products.map((product) => (
                <VinylRecord key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;