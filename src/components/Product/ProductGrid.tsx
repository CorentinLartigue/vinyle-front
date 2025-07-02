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
            <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucun produit trouvé
                </h3>
                <p className="text-gray-600 mb-4">
                    Essayez de modifier vos filtres pour voir plus de résultats.
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