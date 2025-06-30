import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductGrid from '@components/Product/ProductGrid';
import ProductFilters from '@components/Product/ProductFilters';
import ProductSorting from '@components/Product/ProductSorting';
import { Filter } from 'lucide-react';

import productsData from '@data/products.json';

const PRODUCTS_PER_PAGE = 9;

const useFilteredProducts = (products, category, filters) => {
  return useMemo(() => {
    let filtered = products;

    // Filtre par catégorie URL
    if (category) {
      filtered = filtered.filter(
          (p) => p.category.toLowerCase() === String(category).toLowerCase()
      );
    }

    // Filtre par prix
    filtered = filtered.filter(
        (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Filtre catégories sélectionnées
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) => filters.categories.includes(p.category));
    }

    // Filtre artistes sélectionnés
    if (filters.artists.length > 0) {
      filtered = filtered.filter((p) => filters.artists.includes(p.artist));
    }

    // Filtre années
    filtered = filtered.filter(
        (p) => p.releaseYear >= filters.releaseYear[0] && p.releaseYear <= filters.releaseYear[1]
    );

    return filtered;
  }, [products, category, filters]);
};

const useSortedProducts = (products, sortBy) => {
  return useMemo(() => {
    const sorted = [...products];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => b.releaseYear - a.releaseYear);
      case 'oldest':
        return sorted.sort((a, b) => a.releaseYear - b.releaseYear);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  }, [products, sortBy]);
};

const getFilterData = (products) => {
  if (products.length === 0) {
    return {
      categories: [],
      artists: [],
      priceRange: [0, 0],
      yearRange: [0, 0],
    };
  }
  return {
    categories: [...new Set(products.map((p) => p.category))],
    artists: [...new Set(products.map((p) => p.artist))],
    priceRange: [
      Math.min(...products.map((p) => p.price)),
      Math.max(...products.map((p) => p.price)),
    ],
    yearRange: [
      Math.min(...products.map((p) => p.releaseYear)),
      Math.max(...products.map((p) => p.releaseYear)),
    ],
  };
};

const ProductList = () => {
  const router = useRouter();
  const { category } = router.query;

  // Données
  const allProducts = productsData;

  // Extraction des données utiles aux filtres sur tous les produits
  const filterData = useMemo(() => getFilterData(allProducts), [allProducts]);

  // Initialisation des filtres avec les plages dynamiques
  const [filters, setFilters] = useState({
    priceRange: filterData.priceRange,
    categories: [],
    artists: [],
    releaseYear: filterData.yearRange,
  });

  // Met à jour les plages min/max des filtres quand filterData change (ex : au chargement)
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      priceRange: filterData.priceRange,
      releaseYear: filterData.yearRange,
    }));
  }, [filterData]);

  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);

  // Produits filtrés & triés
  const filteredProducts = useFilteredProducts(allProducts, category, filters);
  const sortedProducts = useSortedProducts(filteredProducts, sortBy);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  // Reset page lors d’un changement de filtres ou catégorie ou tri
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters, category, sortBy]);

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-400 to-green-500 text-white">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Shop</h1>
              <div className="text-sm">
                <span>Home</span> <span className="mx-2">/</span> <span>Shop</span>
                {category && (
                    <>
                      <span className="mx-2">/</span>
                      <span className="capitalize">{category}</span>
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
                  setFilters={setFilters}
                  filterData={filterData}
                  productsCount={filteredProducts.length}
              />
            </aside>

            {/* Zone principale */}
            <main className="flex-1">
              {/* En-tête tri et infos */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">
                  {category
                      ? `${filteredProducts.length} produits dans "${category}"`
                      : `${filteredProducts.length} produits trouvés`}
                </span>
                </div>

                <ProductSorting sortBy={sortBy} setSortBy={setSortBy} />
              </div>

              {/* Grille de produits */}
              <ProductGrid products={paginatedProducts} loading={false} />

              {/* Pagination */}
              {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center space-x-2">
                      <button
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Précédent
                      </button>

                      {[...Array(totalPages)].map((_, i) => (
                          <button
                              key={i + 1}
                              onClick={() => setCurrentPage(i + 1)}
                              className={`px-3 py-2 text-sm rounded-md ${
                                  currentPage === i + 1
                                      ? 'bg-green-500 text-white'
                                      : 'border border-gray-300 hover:bg-gray-50'
                              }`}
                          >
                            {i + 1}
                          </button>
                      ))}

                      <button
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
