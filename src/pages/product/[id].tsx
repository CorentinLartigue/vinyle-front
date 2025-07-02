import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductGrid from '@components/Product/ProductGrid';
import { Heart, ShoppingCart } from 'lucide-react';
import { useToast } from '@/context/ToastProvider';
import { useFavorites } from '@/hooks/useFavorites';
import { useCart } from '@/context/CartProvider';

interface Artist {
    id: string;
    name: string;
    bio?: string;
}

interface Category {
    id: string;
    categoryName: string;
}

interface Product {
    id: string;
    createdAt: string;
    updatedAt: string;
    productName: string;
    date: string;
    price: number;
    description: string;
    artists: Artist[];
    categories: Category[];
}

const TABS = [
  { key: 'description', label: 'Description' },
  { key: 'information', label: 'Informations' },
];

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { showError, showSuccess } = useToast();
  const { addToFavorites, isProductFavorite } = useFavorites();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [popularLoading, setPopularLoading] = useState(true);
  const [tab, setTab] = useState('description');
  const [qty, setQty] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  // Récupération du produit spécifique (nouvel endpoint)
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`http://localhost:3000/api/products/${id}/details`, {
      headers: { 'accept': '*/*' }
    })
      .then(res => {
        if (!res.ok) throw new Error('Produit introuvable');
        return res.json();
      })
      .then((data: Product) => {
        setProduct(data);
      })
      .catch(err => {
        showError('Erreur lors de la récupération du produit : ' + err);
      })
      .finally(() => setLoading(false));
  }, [id, showError]);

  // Récupération des produits populaires via la nouvelle route
  useEffect(() => {
    setPopularLoading(true);
    setPopularProducts([]);
    fetch('http://localhost:3000/api/products/popular', {
      headers: { 'accept': '*/*' }
    })
      .then(res => {
        if (!res.ok) throw new Error('Erreur lors de la récupération des produits populaires');
        return res.json();
      })
      .then((data: Product[]) => {
        setPopularProducts(data);
      })
      .catch(err => {
        showError('Erreur lors de la récupération des produits populaires : ' + err);
        setPopularProducts([]);
      })
      .finally(() => setPopularLoading(false));
  }, [showError]);

  const handleToggleLike = async () => {
    if (!product) return;
    await addToFavorites(product.id);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    setAddingToCart(true);
    
    // Simuler un délai pour l'UX
    setTimeout(() => {
      try {
        // Préparer les données du produit pour le panier
        const cartProduct = {
          id: product.id,
          productName: product.productName,
          artistInfos: product.artists,
          price: product.price,
        };

        // Ajouter au panier avec la quantité sélectionnée
        addToCart(cartProduct, qty);

        showSuccess(`${qty} exemplaire${qty > 1 ? 's' : ''} de "${product.productName}" ajouté${qty > 1 ? 's' : ''} au panier !`);
        
        // Réinitialiser la quantité
        setQty(1);
      } catch (error) {
        showError('Erreur lors de l\'ajout au panier');
      } finally {
        setAddingToCart(false);
      }
    }, 500);
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-60 h-60 bg-gray-300 rounded-full"></div>
              <div className="flex-1 space-y-4">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div className="p-8 text-center text-gray-500">Produit introuvable.</div>;
  }

  // Extraire les informations du produit
  const releaseYear = product.date ? new Date(product.date).getFullYear() : '';
  const artistName = product.artists && product.artists.length > 0 ? product.artists[0].name : 'Artiste inconnu';
  const categoryName = product.categories && product.categories.length > 0 ? product.categories[0].categoryName : 'Catégorie';
  const isFavorite = isProductFavorite(product.id);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-8">
              {/* Image vinyle */}
              <div className="flex-shrink-0 flex flex-col items-center w-full md:w-72">
                <div className="w-60 h-60 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center relative overflow-hidden mb-4">
                  <div className="absolute inset-4 bg-black rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-black rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Infos produit */}
              <div className="flex-1 space-y-3">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{product.productName}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{artistName}</span>
                  {releaseYear && (
                    <>
                      <span>•</span>
                      <span>{releaseYear}</span>
                    </>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-2xl font-bold text-green-600">
                    €{product.price || 'Prix non disponible'}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="font-medium text-sm">Quantité :</span>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={qty}
                    onChange={e => setQty(Math.max(1, Math.min(99, Number(e.target.value))))}
                    className="w-16 border rounded px-2 py-1 text-sm"
                  />
                </div>
                <div className="flex gap-2 mt-6">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.price || addingToCart}
                    className={`flex items-center gap-2 px-6 py-2 rounded font-semibold text-sm shadow transition-all ${
                      addingToCart 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    {addingToCart ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Ajout en cours...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Ajouter au panier
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleToggleLike}
                    className={`p-2 rounded-full border ${isFavorite ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-400 border-gray-300 hover:text-red-500'}`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Onglets Description/Information */}
            <div className="bg-white rounded-lg shadow mt-8 p-6">
              <div className="flex border-b mb-4">
                {TABS.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`px-4 py-2 font-medium text-sm border-b-2 -mb-px transition-colors ${tab===t.key ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-purple-600'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-700 min-h-[80px]">
                {tab === 'description' && (
                  <>
                    <p>{product.description || 'Aucune description disponible.'}</p>
                  </>
                )}
                {tab === 'information' && (
                  <>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Catégorie : <span className="font-medium capitalize">{categoryName}</span></li>
                      <li>Artiste : <span className="font-medium">{artistName}</span></li>
                      {product.date && (
                        <li>Date de sortie : <span className="font-medium">{new Date(product.date).toLocaleDateString()}</span></li>
                      )}
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* Produits populaires */}
            <section className="mt-12">
              <h3 className="text-2xl font-bold text-center mb-2">Produits Populaires</h3>
              <p className="text-center text-gray-500 mb-8 text-sm">Découvrez d'autres vinyles populaires</p>
              {popularLoading ? (
                <div className="text-center text-gray-400 py-8">Chargement...</div>
              ) : popularProducts.length > 0 ? (
                <ProductGrid products={popularProducts} loading={false} />
              ) : (
                <div className="text-center text-gray-400 py-8">
                  Aucun produit populaire à afficher pour le moment.
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
