import React, { useState } from 'react';

const SearchBar = ({ placeholder, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value.trim());
        if (searchTerm) {
            onSearch(event.target.value); // Call the search handler when the input changes
        }
    };

    return (
        <div className="relative max-w-sm mx-auto">
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                className="w-full p-1 pl-4 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                placeholder={placeholder || "Search..."}
            />
        </div>
    );
};

export default SearchBar;