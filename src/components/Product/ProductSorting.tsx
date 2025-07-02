import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ProductSortingProps {
    sortBy: string;
    setSortBy: (value: string) => void;
}

const ProductSorting: React.FC<ProductSortingProps> = ({ sortBy, setSortBy }) => {
    const sortOptions = [
        { value: 'featured', label: 'En vedette' },
        { value: 'date-desc', label: 'Plus récents' },
        { value: 'date-asc', label: 'Plus anciens' },
        { value: 'price-asc', label: 'Prix croissant' },
        { value: 'price-desc', label: 'Prix décroissant' },
        { value: 'name-asc', label: 'Nom A-Z' },
        { value: 'name-desc', label: 'Nom Z-A' }
    ];

    return (
        <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600 whitespace-nowrap">
        Trier par :
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