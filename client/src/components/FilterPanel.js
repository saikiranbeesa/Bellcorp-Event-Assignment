import React from 'react';
import './FilterPanel.css';

const FilterPanel = ({
  filters,
  onFilterChange,
  categories,
  locations,
  loading = false,
}) => {
  const handleFilterChange = (filterName, value) => {
    onFilterChange({
      ...filters,
      [filterName]: value,
    });
  };

  const handleReset = () => {
    onFilterChange({
      category: '',
      location: '',
      date: '',
    });
  };

  return (
    <div className="filter-panel">
      <h3 className="filter-title">🎯 Filters</h3>

      {/* Category Filter */}
      <div className="filter-group">
        <label htmlFor="category-select">Category</label>
        <select
          id="category-select"
          value={filters.category || ''}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="filter-select"
          disabled={loading}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Location Filter */}
      <div className="filter-group">
        <label htmlFor="location-select">Location</label>
        <select
          id="location-select"
          value={filters.location || ''}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="filter-select"
          disabled={loading}
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Date Filter */}
      <div className="filter-group">
        <label htmlFor="date-input">From Date</label>
        <input
          id="date-input"
          type="date"
          value={filters.date || ''}
          onChange={(e) => handleFilterChange('date', e.target.value)}
          className="filter-input"
          disabled={loading}
        />
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="btn btn-secondary reset-btn"
        disabled={loading}
      >
        🔄 Reset Filters
      </button>
    </div>
  );
};

export default FilterPanel;
