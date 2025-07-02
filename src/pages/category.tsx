import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
    Music, Guitar, Piano, Mic2, Drum, Disc3, ChevronRight, Headphones, Radio, Speaker, Volume2, 
    Disc, Disc2, Music2, Music3, Music4, ChevronLeft, ChevronRight as ChevronRightIcon,
    Mic, Volume1, VolumeX, SkipBack, SkipForward, Play, Pause, Repeat, Shuffle,
    RadioTower, Waves, Ear, EarOff, HeadphonesIcon,
    Disc as DiscIcon, Disc2 as Disc2Icon, Disc3 as Disc3Icon, Music as MusicIcon,
    Music2 as Music2Icon, Music3 as Music3Icon, Music4 as Music4Icon
} from 'lucide-react';
import { useToast } from '@/context/ToastProvider';

interface Category {
    id: string;
    createdAt: string;
    updatedAt: string;
    categoryName: string;
}

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const { showError } = useToast();
    const router = useRouter();

    const CATEGORIES_PER_PAGE = 12;

    // Toutes les icônes musicales disponibles
    const availableIcons = [
        Music, Guitar, Piano, Mic2, Drum, Disc3, 
        Headphones, Radio, Speaker, Volume2, 
        Disc, Disc2, Music2, Music3, Music4,
        Mic, Volume1, VolumeX, SkipBack, SkipForward, 
        Play, Pause, Repeat, Shuffle, RadioTower, 
        Waves, Ear, EarOff, HeadphonesIcon, DiscIcon, 
        Disc2Icon, Disc3Icon, MusicIcon, Music2Icon, 
        Music3Icon, Music4Icon
    ];

    // Couleurs disponibles pour les fonds
    const availableColors = [
        'from-red-500 to-red-600',
        'from-blue-500 to-blue-600',
        'from-green-500 to-green-600',
        'from-yellow-500 to-yellow-600',
        'from-purple-500 to-purple-600',
        'from-pink-500 to-pink-600',
        'from-indigo-500 to-indigo-600',
        'from-orange-500 to-orange-600',
        'from-teal-500 to-teal-600',
        'from-amber-500 to-amber-600',
        'from-emerald-500 to-emerald-600',
        'from-cyan-500 to-cyan-600',
        'from-rose-500 to-rose-600',
        'from-violet-500 to-violet-600',
        'from-fuchsia-500 to-fuchsia-600',
        'from-sky-500 to-sky-600',
        'from-lime-500 to-lime-600',
        'from-stone-500 to-stone-600',
        'from-neutral-500 to-neutral-600',
        'from-zinc-500 to-zinc-600',
        'from-slate-500 to-slate-600',
        'from-gray-500 to-gray-600'
    ];

    useEffect(() => {
        fetch('http://localhost:3000/api/categories', {
            headers: { 'accept': '*/*' }
        })
            .then(res => {
                if (!res.ok) throw new Error('Erreur lors de la récupération des catégories');
                return res.json();
            })
            .then((data: Category[]) => {
                setCategories(data);
            })
            .catch(err => {
                showError('Erreur lors de la récupération des catégories : ' + err);
            })
            .finally(() => setLoading(false));
    }, [showError]);

    // Génère un index aléatoire basé sur l'ID de la catégorie pour avoir une cohérence
    const getRandomIndex = (id: string, arrayLength: number) => {
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            const char = id.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash) % arrayLength;
    };

    const getIconForCategory = (categoryId: string) => {
        const index = getRandomIndex(categoryId, availableIcons.length);
        return availableIcons[index];
    };

    const getColorForCategory = (categoryId: string) => {
        const index = getRandomIndex(categoryId, availableColors.length);
        return availableColors[index];
    };

    const handleCategoryClick = (category: Category) => {
        // Stocker la catégorie sélectionnée dans le sessionStorage
        sessionStorage.setItem('selectedCategory', category.categoryName);
        router.push('/product');
    };

    // Calculs de pagination
    const totalPages = Math.ceil(categories.length / CATEGORIES_PER_PAGE);
    const startIndex = (currentPage - 1) * CATEGORIES_PER_PAGE;
    const endIndex = startIndex + CATEGORIES_PER_PAGE;
    const currentCategories = categories.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
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

                {/* Loading state */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                            <p className="text-gray-600">Chargement des catégories...</p>
                        </div>
                    </div>
                </section>
            </>
        );
    }

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
                    {categories.length === 0 ? (
                        <div className="text-center py-12">
                            <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Aucune catégorie disponible</h3>
                            <p className="text-gray-600">Les catégories seront bientôt disponibles.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                                {currentCategories.map((category) => {
                                    const IconComponent = getIconForCategory(category.id);
                                    const colorClass = getColorForCategory(category.id);
                                    
                                    return (
                                        <div 
                                            key={category.id}
                                            onClick={() => handleCategoryClick(category)}
                                            className={`group rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden bg-gradient-to-br ${colorClass} text-white cursor-pointer`}
                                        >
                                            <div className="p-6 h-full flex flex-col">
                                                {/* Icône en haut */}
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                                        <IconComponent className="w-6 h-6 text-white" />
                                                    </div>
                                                    <span className="text-sm font-semibold bg-white/20 px-2 py-1 rounded-full">
                                                        {category.categoryName}
                                                    </span>
                                                </div>
                                                
                                                {/* Titre */}
                                                <h3 className="text-lg font-bold mb-4 group-hover:text-orange-200 transition-colors">
                                                    {category.categoryName}
                                                </h3>
                                                
                                                {/* Bouton en bas */}
                                                <div className="flex items-center text-orange-200 text-sm font-semibold group-hover:text-orange-100 mt-auto">
                                                    <span>Découvrir</span>
                                                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-8">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                        >
                                            <ChevronLeft className="w-4 h-4 mr-1" />
                                            Précédent
                                        </button>

                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => handlePageChange(i + 1)}
                                                className={`px-3 py-2 text-sm rounded-md ${
                                                    currentPage === i + 1
                                                        ? 'bg-orange-500 text-white'
                                                        : 'border border-gray-300 hover:bg-gray-50'
                                                }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                        >
                                            Suivant
                                            <ChevronRightIcon className="w-4 h-4 ml-1" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Info pagination */}
                            <div className="text-center mt-4 text-sm text-gray-600">
                                Page {currentPage} sur {totalPages} • {categories.length} catégorie{categories.length > 1 ? 's' : ''} au total
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default Categories;