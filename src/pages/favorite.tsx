import React, { useEffect, useState } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';

interface Product {
  id: string;
  productName: string;
  artistInfos: Array<{ name: string; bio?: string }>;
  categoryNames: string[];
  date: string;
  price: number;
  imagePath: string;
  description: string;
  isFavoris: boolean;
  favorisId: string;
}

const FavoritePage: React.FC = () => {
  const { removeFromFavorites, loading: loadingFav } = useFavorites();
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    // Attendre que l'authentification soit complètement chargée
    if (isLoading) {
      return;
    }
    
    if (!user) {
      router.push('/login');
      return;
    }
    
    const fetchFavoritesProducts = async () => {
      setLoadingProducts(true);
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:3000/api/products/favoris/me', {
          headers: {
            'accept': '*/*',
            'Authorization': token ? `Bearer ${token}` : ''
          }
        });
        if (!response.ok) throw new Error('Erreur lors de la récupération des favoris');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchFavoritesProducts();
  }, [user, isLoading]);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-emerald-500 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
              <Heart className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Ma Wishlist</h1>
              <p className="text-emerald-100">Retrouvez tous vos albums favoris</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              {loadingFav || loadingProducts ? (
                <div className="text-center py-12 text-gray-500">Chargement...</div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Votre wishlist est vide</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {products.map((item) => (
                    <div key={item.id} className="bg-white border border-emerald-200 rounded-lg p-4 flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl text-white overflow-hidden">
                        {item.imagePath ? (
                          <img
                            src={`https://ltwhfwsovkxhbfjzdfet.supabase.co/storage/v1/object/public/images/${item.imagePath}.png`}
                            alt={item.productName}
                            className="object-cover w-full h-full rounded-lg"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg relative">
                            <div className="w-12 h-12 bg-black rounded-full"></div>
                            <div className="absolute w-3 h-3 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.productName}</h3>
                        <p className="text-gray-600">{item.artistInfos?.map(a => a.name).join(', ')}</p>
                        <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-600 text-xs rounded-full">
                          {item.categoryNames?.join(', ')}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-emerald-600">{item.price}€</p>
                        <div className="flex space-x-2 mt-2">
                          <button
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            onClick={async () => {
                              try {
                                const token = localStorage.getItem('authToken');
                                if (!token) {
                                  console.error('Token d\'authentification manquant');
                                  return;
                                }

                                // Utiliser directement le favorisId qui est déjà disponible
                                const deleteResponse = await fetch(`http://localhost:3000/api/favoris/${item.favorisId}`, {
                                  method: 'DELETE',
                                  headers: {
                                    'accept': '*/*',
                                    'Authorization': `Bearer ${token}`
                                  }
                                });
                                
                                if (deleteResponse.ok) {
                                  console.log('Favori supprimé avec succès');
                                  // Mettre à jour l'état local au lieu de recharger la page
                                  setProducts(prevProducts => prevProducts.filter(product => product.id !== item.id));
                                } else {
                                  console.error('Erreur lors de la suppression du favori:', deleteResponse.status);
                                }
                              } catch (error) {
                                console.error('Erreur lors de la suppression du favori:', error);
                              }
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritePage; 