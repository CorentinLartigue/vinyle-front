import React from 'react';
import { useRouter } from 'next/router';
import categoriesData from '@data/categories.json';
import * as LucideIcons from 'lucide-react';

const PopularCategories: React.FC = () => {
    const router = useRouter();

    const handleCategoryClick = (categoryName: string) => {
        router.push(`/category`);
    };

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Catégories Populaires</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    {categoriesData.map((category, index) => {
                        const Icon = (LucideIcons as any)[category.icon] || LucideIcons.Music;
                        return (
                            <div
                                key={index}
                                className="text-center group cursor-pointer"
                                onClick={() => handleCategoryClick(category.name)}
                            >
                                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="font-semibold text-gray-800 group-hover:text-orange-500 transition-colors">{category.name}</h3>
                                <p className="text-sm text-gray-600">{category.count} articles</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PopularCategories;
