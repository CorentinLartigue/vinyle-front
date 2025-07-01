import React, { useState } from 'react';
import { useRouter } from 'next/router';
import productsData from '@data/products.json';
import ProductGrid from '@components/Product/ProductGrid';
import { Heart } from 'lucide-react';

const TABS = [
  { key: 'description', label: 'Description' },
  { key: 'information', label: 'Information' },
];

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const product = productsData.find((p) => String(p.id) === String(id));
  const [tab, setTab] = useState('description');
  const [qty, setQty] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  if (!product) {
    return <div className="p-8 text-center text-gray-500">Produit introuvable.</div>;
  }

  // Produits populaires (autres que celui affiché)
  const popularProducts = productsData.filter((p) => p.id !== product.id).slice(0, 4);

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
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{product.name}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{product.artist}</span>
                  <span>•</span>
                  <span>{product.releaseYear}</span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-2xl font-bold text-green-600">€{product.price}</span>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="font-medium text-sm">Items:</span>
                  <input
                    type="number"
                    min={1}
                    value={qty}
                    onChange={e => setQty(Number(e.target.value))}
                    className="w-16 border rounded px-2 py-1 text-sm"
                  />
                </div>
                <div className="flex gap-2 mt-6">
                  <button
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-semibold text-sm shadow"
                  >
                    Add To Cart
                  </button>
                  <button
                    onClick={() => setIsLiked(l => !l)}
                    className={`p-2 rounded-full border ${isLiked ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-400 border-gray-300 hover:text-red-500'}`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
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
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in vero sapiente odio, error dolore vero temporibus consequatur, nobis veniam odit dignissimos consequatur quo in perferendis provident quis.</p>
                    <h4 className="mt-4 font-semibold">Packaging & Delivery</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in vero perferendis odit! Quis vel consequatur replicat distinctio rem.</p>
                  </>
                )}
                {tab === 'information' && (
                  <>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Catégorie : <span className="font-medium capitalize">{product.category}</span></li>
                      <li>Label : <span className="font-medium">{(product as any).label ? (product as any).label : 'Non renseigné'}</span></li>
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* Produits populaires */}
            <section className="mt-12">
              <h3 className="text-2xl font-bold text-center mb-2">Popular Products</h3>
              <p className="text-center text-gray-500 mb-8 text-sm">Découvrez d'autres vinyles populaires</p>
              <ProductGrid products={popularProducts} loading={false} />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
