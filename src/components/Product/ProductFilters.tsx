import React from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import FilterListSearchable from '@components/shared/FilterListSearchable';
import RangeFilter from '@components/shared/RangeFilters';

type Filters = {
    priceRange: [number, number];
    categories: string[];
    artists: string[];
    releaseYear: [number, number];
};

type FilterData = {
    priceRange: [number, number];
    categories: string[];
    artists: string[];
    yearRange: [number, number];
};

interface ProductFiltersProps {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    filterData: FilterData;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ filters, setFilters, filterData }) => {
    const [expandedSections, setExpandedSections] = React.useState<{
        price: boolean;
        category: boolean;
        artist: boolean;
        year: boolean;
    }>({
        price: true,
        category: true,
        artist: false,
        year: false,
    });

    const toggleSection = (section: 'price' | 'category' | 'artist' | 'year') => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const toggleCategory = (category: string) => {
        setFilters((prev) => {
            const categories = prev.categories.includes(category)
                ? prev.categories.filter((c: string) => c !== category)
                : [...prev.categories, category];
            return { ...prev, categories };
        });
    };

    const toggleArtist = (artist: string) => {
        setFilters((prev) => {
            const artists = prev.artists.includes(artist)
                ? prev.artists.filter((a: string) => a !== artist)
                : [...prev.artists, artist];
            return { ...prev, artists };
        });
    };

    const clearCategory = () => setFilters((prev) => ({ ...prev, categories: [] }));
    const clearArtist = () => setFilters((prev) => ({ ...prev, artists: [] }));
    const clearYear = () => setFilters((prev) => ({ ...prev, releaseYear: filterData.yearRange }));
    const clearPrice = () => setFilters((prev) => ({ ...prev, priceRange: filterData.priceRange }));
    const clearAll = () => setFilters({
        priceRange: filterData.priceRange,
        categories: [],
        artists: [],
        releaseYear: filterData.yearRange,
    });

    const isYearFiltered = filters.releaseYear[0] !== filterData.yearRange[0] || filters.releaseYear[1] !== filterData.yearRange[1];
    const isPriceFiltered = filters.priceRange[0] !== filterData.priceRange[0] || filters.priceRange[1] !== filterData.priceRange[1];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-lg">Filtres</span>
                <button
                    onClick={clearAll}
                    className="text-xs text-orange-500 hover:underline flex items-center gap-1"
                >
                    <X className="w-4 h-4" /> Tout réinitialiser
                </button>
            </div>

            {/* Filtres actifs */}
            {(filters.categories.length > 0 || filters.artists.length > 0 || isYearFiltered || isPriceFiltered) && (
                <div className="flex flex-wrap gap-2 mb-2">
                    {filters.categories.map((cat) => (
                        <span key={cat} className="inline-flex items-center bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">
                            {cat}
                            <button onClick={() => toggleCategory(cat)} className="ml-1 text-orange-500 hover:text-orange-700" title="Retirer ce filtre"><X className="w-3 h-3" /></button>
                        </span>
                    ))}
                    {filters.artists.map((artist) => (
                        <span key={artist} className="inline-flex items-center bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                            {artist}
                            <button onClick={() => toggleArtist(artist)} className="ml-1 text-green-500 hover:text-green-700" title="Retirer ce filtre"><X className="w-3 h-3" /></button>
                        </span>
                    ))}
                    {isYearFiltered && (
                        <span className="inline-flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                            {filters.releaseYear[0]} - {filters.releaseYear[1]}
                            <button onClick={clearYear} className="ml-1 text-blue-500 hover:text-blue-700" title="Réinitialiser les années"><X className="w-3 h-3" /></button>
                        </span>
                    )}
                    {isPriceFiltered && (
                        <span className="inline-flex items-center bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">
                            {filters.priceRange[0]}€ - {filters.priceRange[1]}€
                            <button onClick={clearPrice} className="ml-1 text-purple-500 hover:text-purple-700" title="Réinitialiser le prix"><X className="w-3 h-3" /></button>
                        </span>
                    )}
                </div>
            )}

            <section>
                <div className="flex justify-between items-center w-full">
                    <button
                        className="flex items-center text-left"
                        onClick={() => toggleSection('price')}
                    >
                        <h3 className="text-lg font-semibold">Prix</h3>
                        {expandedSections.price ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    {isPriceFiltered && (
                        <button onClick={clearPrice} className="ml-2 text-gray-400 hover:text-orange-500" title="Réinitialiser le filtre prix"><X className="w-4 h-4" /></button>
                    )}
                </div>
                {expandedSections.price && (
                    <RangeFilter
                        minValue={filterData.priceRange[0]}
                        maxValue={filterData.priceRange[1]}
                        range={filters.priceRange}
                        unit="€"
                        onChangeRange={(newRange: [number, number]) =>
                            setFilters((prev) => ({ ...prev, priceRange: newRange }))
                        }
                    />
                )}
            </section>
            <section>
                <div className="flex justify-between items-center w-full">
                    <button
                        className="flex items-center text-left"
                        onClick={() => toggleSection('category')}
                    >
                        <h3 className="text-lg font-semibold">Catégories</h3>
                        {expandedSections.category ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    {filters.categories.length > 0 && (
                        <button onClick={clearCategory} className="ml-2 text-gray-400 hover:text-orange-500" title="Réinitialiser les catégories"><X className="w-4 h-4" /></button>
                    )}
                </div>
                {expandedSections.category && (
                    <FilterListSearchable
                        items={filterData.categories}
                        selectedItems={filters.categories}
                        onToggleItem={toggleCategory}
                        placeholder="Rechercher une catégorie"
                    />
                )}
            </section>
            <section>
                <div className="flex justify-between items-center w-full">
                    <button
                        className="flex items-center text-left"
                        onClick={() => toggleSection('artist')}
                    >
                        <h3 className="text-lg font-semibold">Artistes</h3>
                        {expandedSections.artist ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    {filters.artists.length > 0 && (
                        <button onClick={clearArtist} className="ml-2 text-gray-400 hover:text-orange-500" title="Réinitialiser les artistes"><X className="w-4 h-4" /></button>
                    )}
                </div>
                {expandedSections.artist && (
                    <FilterListSearchable
                        items={filterData.artists}
                        selectedItems={filters.artists}
                        onToggleItem={toggleArtist}
                        placeholder="Rechercher un artiste"
                    />
                )}
            </section>
            <section>
                <div className="flex justify-between items-center w-full">
                    <button
                        className="flex items-center text-left"
                        onClick={() => toggleSection('year')}
                    >
                        <h3 className="text-lg font-semibold">Années</h3>
                        {expandedSections.year ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    {isYearFiltered && (
                        <button onClick={clearYear} className="ml-2 text-gray-400 hover:text-orange-500" title="Réinitialiser les années"><X className="w-4 h-4" /></button>
                    )}
                </div>
                {expandedSections.year && (
                    <RangeFilter
                        minValue={filterData.yearRange[0]}
                        maxValue={filterData.yearRange[1]}
                        range={filters.releaseYear}
                        onChangeRange={(newRange: [number, number]) =>
                            setFilters((prev) => ({ ...prev, releaseYear: newRange }))
                        }
                    />
                )}
            </section>
        </div>
    );
};

export default ProductFilters;
