import React from 'react';
import Link from 'next/link';
import { Music, Guitar, Piano, Mic2, Drum, Disc3, ChevronRight } from 'lucide-react';

const Categories: React.FC = () => {
    const categories = [
        {
            id: 'rock',
            name: 'Rock',
            description: 'Des légendes du classic rock aux dernières tendances du rock moderne',
            icon: Guitar,
            color: 'from-red-500 to-red-600',
            count: '2,847'
        },
        {
            id: 'jazz',
            name: 'Jazz',
            description: 'L\'élégance du jazz classique et les innovations contemporaines',
            icon: Piano,
            color: 'from-blue-500 to-blue-600',
            count: '1,923'
        },
        {
            id: 'blues',
            name: 'Blues',
            description: 'L\'âme du blues authentique et ses racines profondes',
            icon: Guitar,
            color: 'from-indigo-500 to-indigo-600',
            count: '1,456'
        },
        {
            id: 'pop',
            name: 'Pop',
            description: 'Les hits incontournables et les nouvelles sensations pop',
            icon: Mic2,
            color: 'from-pink-500 to-pink-600',
            count: '3,124'
        },
        {
            id: 'folk',
            name: 'Folk',
            description: 'Traditions musicales et nouvelles voix du folk contemporain',
            icon: Music,
            color: 'from-green-500 to-green-600',
            count: '987'
        },
        {
            id: 'electronic',
            name: 'Électronique',
            description: 'Sons synthétiques et beats électroniques innovants',
            icon: Disc3,
            color: 'from-purple-500 to-purple-600',
            count: '2,156'
        },
        {
            id: 'classical',
            name: 'Classique',
            description: 'Chefs-d\'œuvre intemporels de la musique classique',
            icon: Piano,
            color: 'from-amber-500 to-amber-600',
            count: '1,234'
        },
        {
            id: 'funk',
            name: 'Funk',
            description: 'Grooves irrésistibles et rythmes endiablés',
            icon: Drum,
            color: 'from-orange-500 to-orange-600',
            count: '856'
        },
        {
            id: 'reggae',
            name: 'Reggae',
            description: 'Vibrations jamaïcaines et message de paix',
            icon: Music,
            color: 'from-yellow-500 to-yellow-600',
            count: '743'
        },
        {
            id: 'gospel',
            name: 'Gospel',
            description: 'Spiritualité et puissance vocale du gospel authentique',
            icon: Mic2,
            color: 'from-teal-500 to-teal-600',
            count: '623'
        },
        {
            id: 'country',
            name: 'Country',
            description: 'Histoires de l\'Amérique profonde et mélodies authentiques',
            icon: Guitar,
            color: 'from-amber-600 to-amber-700',
            count: '1,098'
        },
        {
            id: 'hip-hop',
            name: 'Hip-Hop',
            description: 'Culture urbaine et flow incontournables',
            icon: Mic2,
            color: 'from-gray-600 to-gray-700',
            count: '2,876'
        }
    ];

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
                        {categories.map((category) => {
                            const IconComponent = category.icon;
                            return (
                                <Link href={`/categories/${category.id}`} key={category.id}>
                                    <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center`}>
                                                    <IconComponent className="w-6 h-6 text-white" />
                                                </div>
                                                <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                                    {category.count}
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