import React from 'react';
import { ChevronDown } from 'lucide-react';

const ProductSorting = ({ sortBy, setSortBy }) => {
    const sortOptions = [
        { value: 'featured', label: 'En vedette' },
        { value: 'newest', label: 'Plus récents' },
        { value: 'oldest', label: 'Plus anciens' },
        { value: 'price-low', label: 'Prix croissant' },
        { value: 'price-high', label: 'Prix décroissant' },
        { value: 'rating', label: 'Mieux notés' },
        { value: 'name', label: 'Nom A-Z' }
    ];

    return (
        <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600 whitespace-nowrap">
        Trier par:
      </span>
            <div className="relative">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
        </div>
    );
};

export default ProductSorting;