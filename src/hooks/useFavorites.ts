import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useToast } from '@/context/ToastProvider';
import { useProfile } from '@/context/ProfileProvider';

interface Favorite {
    id: string;
    targetType: 'product' | 'artist';
    targetId: string;
    profileId: string;
}

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState(false);
    const { showSuccess, showError } = useToast();
    const profile = useProfile();
    const router = useRouter();

    // Récupérer les favoris de l'utilisateur
    const fetchFavorites = async () => {
        if (!profile?.id) {
            setFavorites([]);
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/api/favoris/${profile.id}`, {
                headers: { 'accept': '*/*' }
            });
            
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des favoris');
            }
            
            const data = await response.json();
            setFavorites(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des favoris:', error);
            showError('Erreur lors de la récupération des favoris');
            setFavorites([]);
        } finally {
            setLoading(false);
        }
    };

    // Vérifier si un produit est en favoris
    const isProductFavorite = (productId: string | number): boolean => {
        const id = String(productId);
        return favorites.some(fav => fav.targetType === 'product' && fav.targetId === id);
    };

    // Ajouter un produit aux favoris
    const addToFavorites = async (productId: string | number) => {
        if (!profile?.id) {
            showError('Vous devez être connecté pour ajouter aux favoris');
            router.push('/login');
            return;
        }

        try {
            setLoading(true);
            
            const response = await fetch('http://localhost:3000/api/favoris', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    targetType: 'product',
                    targetId: String(productId),
                    profileId: profile.id
                })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout aux favoris');
            }

            // Récupérer les favoris mis à jour depuis le serveur
            await fetchFavorites();
            showSuccess('Produit ajouté aux favoris');
        } catch (error) {
            console.error('Erreur lors de l\'ajout aux favoris:', error);
            showError('Erreur lors de l\'ajout aux favoris');
        } finally {
            setLoading(false);
        }
    };

    // Supprimer un produit des favoris
    const removeFromFavorites = async (productId: string | number) => {
        if (!profile?.id) {
            showError('Vous devez être connecté pour retirer des favoris');
            router.push('/login');
            return;
        }

        try {
            setLoading(true);
            
            const response = await fetch('http://localhost:3000/api/favoris', {
                method: 'DELETE',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    targetType: 'product',
                    targetId: String(productId),
                    profileId: profile.id
                })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression des favoris');
            }

            // Récupérer les favoris mis à jour depuis le serveur
            await fetchFavorites();
            showSuccess('Produit retiré des favoris');
        } catch (error) {
            console.error('Erreur lors de la suppression des favoris:', error);
            showError('Erreur lors de la suppression des favoris');
        } finally {
            setLoading(false);
        }
    };

    // Toggle favoris (ajouter/supprimer)
    const toggleFavorite = async (productId: string | number) => {
        if (isProductFavorite(productId)) {
            await removeFromFavorites(productId);
        } else {
            await addToFavorites(productId);
        }
    };

    // Fonction handleAddToFavorites pour compatibilité avec les composants existants
    const handleAddToFavorites = async (e: React.MouseEvent, productId: string | number) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (loading) return; // Éviter les clics multiples pendant le chargement
        
        await addToFavorites(productId);
    };

    // Charger les favoris au montage du composant et quand le profil change
    useEffect(() => {
        fetchFavorites();
    }, [profile?.id]);

    return {
        favorites,
        loading,
        isProductFavorite,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        handleAddToFavorites,
        fetchFavorites
    };
}; 