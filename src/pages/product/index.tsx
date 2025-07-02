import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Filter } from 'lucide-react';
import ProductGrid from '@components/Product/ProductGrid';
import ProductFilters from '@components/Product/ProductFilters';
import ProductSorting from '@components/Product/ProductSorting';
import { useToast } from '@/context/ToastProvider';

interface Product {
    id: string;
    productName: string;
    artistInfos: Array<{ name: string; bio?: string }>;
    categoryNames: string[];
    date: string;
    price: number;
    imagePath: string;
    description: string;
}

interface Category {
    id: string;
    categoryName: string;
}

type Filters = {
    priceRange?: [number, number];
    categories: string[];
    artists: string[];
    releaseYear?: [number, number];
};

type FilterData = {
    priceRange?: [number, number];
    categories: string[];
    artists: string[];
    yearRange?: [number, number];
};

const PRODUCTS_PER_PAGE = 12;

const useFilteredProducts = (products: Product[], category: string | string[] | undefined, filters: Filters, categories: Category[]) => {
  return useMemo(() => {
    let filtered = [...products];

    // Filtre par catégorie (priorité au paramètre URL/sessionStorage)
    if (category) {
      const categoryName = Array.isArray(category) ? category[0] : category;
      filtered = filtered.filter(product => 
        product.categoryNames && product.categoryNames.includes(categoryName)
      );
    }

    // Filtre par catégories sélectionnées dans les filtres
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        product.categoryNames && filters.categories.some(cat => 
          product.categoryNames!.includes(cat)
        )
      );
    }

    // Filtre par artistes
    if (filters.artists.length > 0) {
      filtered = filtered.filter(product =>
        product.artistInfos && filters.artists.some(artist => 
          product.artistInfos!.some(artistInfo => artistInfo.name === artist)
        )
      );
    }

    // Filtre par prix
    if (filters.priceRange) {
      filtered = filtered.filter(product =>
        product.price >= filters.priceRange![0] && product.price <= filters.priceRange![1]
      );
    }

    // Filtre par année
    if (filters.releaseYear) {
      filtered = filtered.filter(product => {
        if (!product.date) return false;
        const year = new Date(product.date).getFullYear();
        return year >= filters.releaseYear![0] && year <= filters.releaseYear![1];
      });
    }

    return filtered;
  }, [products, category, filters, categories]);
};

const useSortedProducts = (products: Product[], sortBy: string) => {
  return useMemo(() => {
    const sorted = [...products];
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-desc':
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'date-asc':
        return sorted.sort((a, b) => new Date(a.date || '').getTime() - new Date(b.date || '').getTime());
      case 'date-desc':
        return sorted.sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime());
      case 'name-asc':
        return sorted.sort((a, b) => a.productName.localeCompare(b.productName));
      case 'name-desc':
        return sorted.sort((a, b) => b.productName.localeCompare(a.productName));
      default:
        return sorted;
    }
  }, [products, sortBy]);
};

const getFilterData = (products: Product[], categories: Category[]): FilterData => {
  if (products.length === 0) {
    return {
      categories: [],
      artists: [],
    };
  }
  
  // Calculer les prix min/max à partir des produits réels
  const prices = products.map(p => p.price).filter((v): v is number => typeof v === 'number' && v > 0);
  
  // Calculer les années min/max à partir des dates des produits
  const years = products.map(p => p.date ? new Date(p.date).getFullYear() : undefined).filter((v): v is number => typeof v === 'number');
  
  // Extraire tous les artistes uniques des produits
  const allArtists = new Set<string>();
  products.forEach(product => {
    if (product.artistInfos) {
      product.artistInfos.forEach(artist => {
        allArtists.add(artist.name);
      });
    }
  });
  
  return {
    categories: categories.map(cat => cat.categoryName),
    artists: Array.from(allArtists).sort(),
    priceRange: prices.length > 0 ? [Math.min(...prices), Math.max(...prices)] as [number, number] : undefined,
    yearRange: years.length > 0 ? [Math.min(...years), Math.max(...years)] as [number, number] : undefined,
  };
};

const ProductList = () => {
  const router = useRouter();
  const { category } = router.query;
  const { showError } = useToast();

  // États pour les données
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryFromStorage, setSelectedCategoryFromStorage] = useState<string | null>(null);

  // Récupérer la catégorie sélectionnée depuis le sessionStorage
  useEffect(() => {
    const storedCategory = sessionStorage.getItem('selectedCategory');
    if (storedCategory) {
      setSelectedCategoryFromStorage(storedCategory);
      // Nettoyer le sessionStorage après récupération
      sessionStorage.removeItem('selectedCategory');
    }
  }, []);

  // Récupération des produits depuis l'API
  useEffect(() => {
    fetch('http://localhost:3000/api/products', {
      headers: { 'accept': '*/*' }
    })
      .then(res => {
        if (!res.ok) throw new Error('Erreur lors de la récupération des produits');
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch(err => {
        showError('Erreur lors de la récupération des produits : ' + err);
      })
      .finally(() => setLoading(false));
  }, [showError]);

  // Récupération des catégories depuis l'API
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
      });
  }, [showError]);

  // Extraction des données utiles aux filtres sur tous les produits
  const filterData = useMemo(() => getFilterData(products, categories), [products, categories]);

  // Trouver la catégorie sélectionnée (priorité au sessionStorage, puis aux paramètres URL)
  const selectedCategory = useMemo(() => {
    const categoryToFind = selectedCategoryFromStorage || category;
    if (!categoryToFind) return null;
    const decodedCategory = typeof categoryToFind === 'string' ? decodeURIComponent(categoryToFind) : categoryToFind;
    return categories.find(cat => cat.id === decodedCategory || cat.categoryName === decodedCategory);
  }, [selectedCategoryFromStorage, category, categories]);

  // Initialisation des filtres avec la catégorie sélectionnée si présente
  const [filters, setFilters] = useState<Filters>({
    priceRange: undefined,
    categories: [],
    artists: [],
    releaseYear: undefined,
  });

  // Met à jour les plages min/max des filtres quand filterData change
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      priceRange: filterData.priceRange,
      releaseYear: filterData.yearRange,
    }));
  }, [filterData.priceRange, filterData.yearRange]);

  // Met à jour les filtres quand la catégorie sélectionnée change
  useEffect(() => {
    if (selectedCategory) {
      setFilters((prev) => ({
        ...prev,
        categories: [selectedCategory.categoryName],
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        categories: [],
      }));
    }
  }, [selectedCategory]);

  // Fonction pour gérer les changements de filtres
  const handleFiltersChange: React.Dispatch<React.SetStateAction<Filters>> = (newFilters) => {
    setFilters((prev) => {
      const updatedFilters = typeof newFilters === 'function' ? newFilters(prev) : newFilters;
      
      // Si l'utilisateur supprime manuellement toutes les catégories, nettoyer le sessionStorage
      if (updatedFilters.categories.length === 0 && selectedCategoryFromStorage) {
        sessionStorage.removeItem('selectedCategory');
        setSelectedCategoryFromStorage(null);
      }
      
      return updatedFilters;
    });
  };

  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);

  // Produits filtrés & triés
  const filteredProducts = useFilteredProducts(products, selectedCategory?.categoryName, filters, categories);
  const sortedProducts = useSortedProducts(filteredProducts, sortBy);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  // Reset page lors d'un changement de filtres ou catégorie ou tri
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters, selectedCategory, sortBy]);

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-400 to-green-500 text-white">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Boutique</h1>
              <div className="text-sm">
                <span>Accueil</span> <span className="mx-2">/</span> <span>Boutique</span>
                {selectedCategory && (
                    <>
                      <span className="mx-2">/</span>
                      <span className="capitalize">{selectedCategory.categoryName}</span>
                    </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filtres */}
            <aside className="lg:w-80">
              <ProductFilters
                  filters={filters}
                  setFilters={handleFiltersChange}
                  filterData={filterData}
              />
            </aside>

            {/* Zone principale */}
            <main className="flex-1">
              {/* En-tête tri et infos */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">
                  {selectedCategory
                      ? `${filteredProducts.length} produits dans "${selectedCategory.categoryName}"`
                      : `${filteredProducts.length} produits au total`}
                </span>
                </div>
                <ProductSorting sortBy={sortBy} setSortBy={setSortBy} />
              </div>

              {/* Grille de produits */}
              <ProductGrid products={paginatedProducts} loading={loading} />

              {/* Pagination */}
              {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                  <div className="flex space-x-2">
                      <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Précédent
                      </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 text-sm border rounded-md ${
                          currentPage === page
                            ? 'bg-green-500 text-white border-green-500'
                            : 'border-gray-300 hover:bg-gray-50'
                              }`}
                          >
                        {page}
                          </button>
                      ))}
                      <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Suivant
                      </button>
                    </div>
                  </div>
              )}
            </main>
          </div>
        </div>
      </div>
  );
};

export default ProductList;
