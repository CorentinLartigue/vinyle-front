import React, { useState } from 'react';
import { Search } from 'lucide-react';

const FilterListSearchable = ({ items, selectedItems, onToggleItem, placeholder }) => {
    const [search, setSearch] = useState('');

    // Filtrage en fonction de la recherche
    const filteredItems = items.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className="relative mb-2">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-1 px-2"
                />
                <Search className="absolute right-2 top-2 w-4 h-4 text-gray-400" />
            </div>
            <ul className="max-h-48 overflow-y-auto space-y-1">
                {filteredItems.map((item) => (
                    <li key={item}>
                        <label className="inline-flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(item)}
                                onChange={() => onToggleItem(item)}
                            />
                            <span>{item}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default FilterListSearchable;
