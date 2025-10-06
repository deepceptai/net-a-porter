import React, { useState, useEffect } from 'react';
import toHex from 'colornames';
import './FilterOption.css';

function FilterOptions({ onFilterChange, selectedFilters, totalResults }) {

  const API_URL=import.meta.env.VITE_API_URL;

  const [filterOptions, setFilterOptions] = useState({});
  const [expandedFilter, setExpandedFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch(`${API_URL}api/clothes/filter/options`);
      const data = await response.json();

      if (data.success) {
        setFilterOptions(data.filters);
      }
    } catch (error) {
      console.error('Error fetching filter options:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFilter = (filterName) => {
    setExpandedFilter(expandedFilter === filterName ? null : filterName);
  };

  const handleOptionClick = (filterKey, value) => {
    onFilterChange(filterKey, value);
  };

  const isSelected = (filterKey, value) => {
    if (!selectedFilters[filterKey]) return false;
    if (value === 'All') return selectedFilters[filterKey].length === 0;
    return selectedFilters[filterKey].includes(value);
  };

  // ✅ Smart color resolver — hybrid system
  const getColorStyle = (colorName) => {
    const lower = colorName.toLowerCase();

    // Handle multi-colored entries
    if (lower.includes('multi') || lower.includes('mixed')) {
      return { background: 'linear-gradient(45deg, red, yellow, blue)' };
    }

    // Common color keyword approximations
    const keywordMap = {
      green: '#4b5320',
      beige: '#f5f5dc',
      black: '#000000',
      brown: '#8b4513',
      blue: '#1e90ff',
      red: '#ff0000',
      pink: '#ffc0cb',
      white: '#ffffff',
      yellow: '#ffff00',
      orange: '#ffa500',
      grey: '#808080',
      gray: '#808080',
      purple: '#800080',
      plum: '#8e4585',
      taupe: '#483c32',
      gold: '#ffd700',
      silver: '#c0c0c0',
    };

    for (const key in keywordMap) {
      if (lower.includes(key)) {
        return { backgroundColor: keywordMap[key] };
      }
    }

    // Try with `colornames` package
    const hex = toHex(lower);
    if (hex) {
      return { backgroundColor: hex };
    }

    // Fallback deterministic pastel generator
    const hash = Array.from(lower).reduce(
      (acc, char) => char.charCodeAt(0) + ((acc << 5) - acc),
      0
    );
    const hue = Math.abs(hash) % 360;
    return { backgroundColor: `hsl(${hue}, 50%, 70%)` };
  };

  const filters = [
    { name: 'NEW SEASON', key: 'season', options: ['All'] },
    { name: 'CATEGORY', key: 'category', options: ['All', ...(filterOptions.category || [])] },
    { name: 'DRESS TYPE', key: 'dress', options: ['All', ...(filterOptions.dresses || [])] },
    { name: 'TYPE', key: 'type', options: ['All', ...(filterOptions.types || [])] },
    { name: 'COLOR', key: 'color', options: ['All', ...(filterOptions.colors || [])] },
    { name: 'DESIGNER', key: 'designer', options: ['All', ...(filterOptions.designers || [])] },
    { name: 'CLOTHING SIZE', key: 'size', options: ['All', ...(filterOptions.size || [])] },
  ];

  if (loading) {
    return (
      <div className="filter-sidebar-wrapper">
        <div className="filter-results-count">Loading filters...</div>
      </div>
    );
  }

  return (
    <div className="filter-sidebar-wrapper">
      <div className="filter-results-count">{totalResults} Results</div>
      <div className="filter-sidebar">
        {filters.map((filter) => (
          <div key={filter.key} className="filter-section">
            <button
              className="filter-header"
              onClick={() => toggleFilter(filter.key)}
              type="button"
            >
              <span className="filter-title">{filter.name}</span>
              <i
                className={`fas fa-chevron-down filter-chevron ${
                  expandedFilter === filter.key ? 'expanded' : ''
                }`}
              ></i>
            </button>

            {expandedFilter === filter.key && (
              <div className="filter-content">
                {filter.key === 'color' && filter.options.length > 1 ? (
                  <>
                    <div
                      className="filter-option-item"
                      onClick={() => handleOptionClick(filter.key, 'All')}
                    >
                      <div className="custom-checkbox">
                        {isSelected(filter.key, 'All') && <i className="fas fa-check"></i>}
                      </div>
                      <span className="filter-option-text">Unselect all</span>
                    </div>
                    {filter.options.slice(1).map((option, index) => (
                      <div
                        key={index}
                        className="filter-option-item"
                        onClick={() => handleOptionClick(filter.key, option)}
                      >
                        <div className="custom-checkbox">
                          {isSelected(filter.key, option) && <i className="fas fa-check"></i>}
                        </div>
                        <span
                          className="color-circle"
                          style={getColorStyle(option)}
                        ></span>
                        <span className="filter-option-text">{option}</span>
                      </div>
                    ))}
                  </>
                ) : (
                  filter.options.map((option, index) => (
                    <div
                      key={index}
                      className="filter-option-item"
                      onClick={() => handleOptionClick(filter.key, option)}
                    >
                      <div className="custom-checkbox">
                        {isSelected(filter.key, option) && <i className="fas fa-check"></i>}
                      </div>
                      <span className="filter-option-text">{option}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterOptions;
