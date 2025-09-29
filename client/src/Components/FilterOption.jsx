import React, { useState, useEffect } from 'react';
import './FilterOption.css';

function FilterOptions({ onFilterChange, selectedFilters, totalResults }) {
  const [expandedFilter, setExpandedFilter] = useState(null);
  const [filterOptions, setFilterOptions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/clothes/filter/options');
      const data = await response.json();
      
      if (data.success) {
        setFilterOptions(data.filers);
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
    if (value === 'All') {
      return selectedFilters[filterKey].length === 0;
    }
    return selectedFilters[filterKey].includes(value);
  };

  // Map API data to filter structure with correct keys
  const filters = [
    { name: 'CATEGORY', key: 'category', options: ['All', ...(filterOptions.category || [])] },
    { name: 'DRESS TYPE', key: 'dress', options: ['All', ...(filterOptions.dresses || [])] },
    { name: 'TYPE', key: 'type', options: ['All', ...(filterOptions.types || [])] },
    { name: 'COLOR', key: 'color', options: ['All', ...(filterOptions.colors || [])] },
    { name: 'DESIGNER', key: 'designer', options: ['All', ...(filterOptions.designers || [])] },
    { name: 'CLOTHING SIZE', key: 'size', options: ['All', ...(filterOptions.size || [])] }
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
      <div className="filter-results-count">
        {totalResults} Results
      </div>
      <div className="filter-sidebar">
        {filters.map((filter) => (
          <div key={filter.key} className="filter-section">
            <button 
              className="filter-header"
              onClick={() => toggleFilter(filter.key)}
              type="button"
            >
              <span className="filter-title">{filter.name}</span>
              <i className={`fas fa-chevron-down filter-chevron ${expandedFilter === filter.key ? 'expanded' : ''}`}></i>
            </button>
            
            {expandedFilter === filter.key && (
              <div className="filter-content">
                {filter.options.map((option, index) => (
                  <div 
                    key={index} 
                    className={`filter-option-item ${isSelected(filter.key, option) ? 'selected' : ''}`}
                    onClick={() => handleOptionClick(filter.key, option)}
                  >
                    <span className="filter-option-text">{option}</span>
                    {isSelected(filter.key, option) && option !== 'All' && (
                      <i className="fas fa-check filter-check-icon"></i>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterOptions;
