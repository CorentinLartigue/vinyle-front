import { useState } from 'react';
import { useRouter } from 'next/router';
import { useToast } from '@/context/ToastProvider';
import { useAuth } from '@/context/AuthContext';

interface Favorite {
    id: string;
    targetType: 'product' | 'artist';
    targetId: string;
    profileId: string;
}

interface ProductFavoris {
    id: string;
    isFavoris: boolean;
    favorisId?: string;
}

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState(false);
    const { showSuccess, showError } = useToast();
    const { user: profile } = useAuth();
    const router = useRouter();

    // Nouvelle méthode centralisée pour les carrousels
    const toggleProductFavoris = async (
        product: { id: string; isFavoris: boolean; favorisId?: string },
        updateProductCallback: (newFavoris: { isFavoris: boolean; favorisId?: string }) => void
    ) => {
        if (!profile?.id) {
            showError('Vous devez être connecté pour gérer les favoris');
            router.push('/login');
            return;
        }
        setLoading(true);
        try {
            if (product.isFavoris) {
                // DELETE
                console.log(product.favorisId);
                await fetch(`http://localhost:3000/api/favoris/${product.favorisId}`, {
                    method: 'DELETE',
                    headers: { 'accept': '*/*' },
                });
                updateProductCallback({ isFavoris: false, favorisId: undefined });
                showSuccess('Retiré des favoris');
            } else {
                // POST
                const res = await fetch('http://localhost:3000/api/favoris', {
                    method: 'POST',
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        productId: product.id,
                        profileId: profile.id,
                        isFavoris: true,
                    }),
                });
                if (res.ok) {
                    const data = await res.json();
                    updateProductCallback({ isFavoris: true, favorisId: data.id || data.favorisId });
                    showSuccess('Ajouté aux favoris');
                } else {
                    showError('Erreur lors de l\'ajout aux favoris');
                }
            }
        } catch (e) {
            showError('Erreur lors de la gestion du favori');
        } finally {
            setLoading(false);
        }
    };

    // --- Ancienne logique globale (pour compatibilité) ---
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
            setFavorites([]);
        } finally {
            setLoading(false);
        }
    };

    const isProductFavorite = (productId: string | number): boolean => {
        const id = String(productId);
        return favorites.some(fav => fav.targetType === 'product' && fav.targetId === id);
    };

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
                    productId: String(productId),
                    profileId: profile.id,
                    isFavoris: true
                })
            });
            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout aux favoris');
            }
            await fetchFavorites();
            showSuccess('Produit ajouté aux favoris');
        } catch (error) {
            showError('Erreur lors de l\'ajout aux favoris');
        } finally {
            setLoading(false);
        }
    };

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
            await fetchFavorites();
            showSuccess('Produit retiré des favoris');
        } catch (error) {
            showError('Erreur lors de la suppression des favoris');
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = async (productId: string | number) => {
        if (isProductFavorite(productId)) {
            await removeFromFavorites(productId);
        } else {
            await addToFavorites(productId);
        }
    };

    const handleAddToFavorites = async (e: React.MouseEvent, productId: string | number) => {
        e.preventDefault();
        e.stopPropagation();
        if (loading) return;
        await addToFavorites(productId);
    };

    return {
        favorites,
        loading,
        isProductFavorite,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        handleAddToFavorites,
        fetchFavorites,
        toggleProductFavoris, // nouvelle méthode centralisée
        showSuccess,
        showError
    };
}; 