import React from 'react';
import './SearchBar.css';

const SearchBar = ({ value, onChange, onSearch, loading = false }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search events by name, organizer, or description..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="search-input"
        />
        <button
          onClick={onSearch}
          className="search-btn"
          disabled={loading}
        >
          {loading ? '⏳ Searching...' : '🔍 Search'}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
