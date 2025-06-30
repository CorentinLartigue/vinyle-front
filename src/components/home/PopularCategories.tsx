import React from 'react';
import { useRouter } from 'next/router';
import { Guitar, Music, Music2, Music3, Mic } from 'lucide-react';

const PopularCategories: React.FC = () => {
    const router = useRouter();

    const categories = [
        { name: 'Rock', count: '234 articles', icon: Guitar },
        { name: 'Classique', count: '156 articles', icon: Music },
        { name: 'Jazz', count: '89 articles', icon: Music2 },
        { name: 'Blues', count: '123 articles', icon: Music3 },
        { name: 'Gospel', count: '67 articles', icon: Mic }
    ];

    const handleCategoryClick = (categoryName: string) => {
        router.push(`/products?category=${categoryName.toLowerCase()}`);
    };

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Catégories Populaires</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="text-center group cursor-pointer"
                            onClick={() => handleCategoryClick(category.name)}
                        >
                            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <category.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-800 group-hover:text-orange-500 transition-colors">{category.name}</h3>
                            <p className="text-sm text-gray-600">{category.count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularCategories;
