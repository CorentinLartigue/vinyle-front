import React from 'react';
import Link from 'next/link';
import { Music, Guitar, Piano, Mic2, Drum, Disc3, ChevronRight } from 'lucide-react';
import categoriesData from '@data/categories.json';
import * as LucideIcons from 'lucide-react';

const Categories: React.FC = () => {
    return (
        <>
            {/* Header */}
            <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Nos <span className="text-orange-500">Catégories</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Explorez notre collection organisée par genres musicaux
                        </p>
                    </div>
                </div>
            </section>

            {/* Categories List */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categoriesData.map((category, idx) => {
                            const IconComponent = (LucideIcons as any)[category.icon] || LucideIcons.Music;
                            return (
                                <Link href={`/categories/${category.id}`} key={idx}>
                                    <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className={`w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center`}>
                                                    <IconComponent className="w-6 h-6 text-white" />
                                                </div>
                                                <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                                    {category.count} articles
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-orange-600 transition-colors">
                                                {category.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4">
                                                {category.description}
                                            </p>
                                            <div className="flex items-center text-orange-500 text-sm font-semibold group-hover:text-orange-600">
                                                <span>Découvrir</span>
                                                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Categories;