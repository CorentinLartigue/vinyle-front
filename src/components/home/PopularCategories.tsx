import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Guitar, Music, Music2, Music3, Mic } from 'lucide-react';
import { useToast } from '@/context/ToastProvider';

interface Category {
    id: string;
    createdAt: string;
    updatedAt: string;
    categoryName: string;
}

const PopularCategories: React.FC = () => {
    const router = useRouter();
    const { showError } = useToast();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    // Icônes disponibles pour les catégories
    const availableIcons = [Guitar, Music, Music2, Music3, Mic];

    useEffect(() => {
        fetch('http://localhost:3000/api/categories', {
            headers: { 'accept': '*/*' }
        })
            .then(res => {
                if (!res.ok) throw new Error('Erreur lors de la récupération des catégories');
                return res.json();
            })
            .then((data: Category[]) => {
                // Prendre les 5 premières catégories pour l'affichage
                setCategories(data.slice(0, 5));
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

    const handleCategoryClick = (category: Category) => {
        router.push('/category');
    };

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Catégories Populaires</h2>
                {loading ? (
                    <div className="text-center py-8 text-gray-500">Chargement...</div>
                ) : categories.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">Aucune catégorie disponible.</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {categories.map((category) => {
                            const IconComponent = getIconForCategory(category.id);
                            return (
                                <div
                                    key={category.id}
                                    className="text-center group cursor-pointer"
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-gray-800 group-hover:text-orange-500 transition-colors">{category.categoryName}</h3>
                                    <p className="text-sm text-gray-600">Catégorie</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default PopularCategories;
