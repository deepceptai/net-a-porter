import React, { useState } from 'react';

function FilterOptions() {
  const [expandedFilter, setExpandedFilter] = useState(null);

  const toggleFilter = (filterName) => {
    setExpandedFilter(expandedFilter === filterName ? null : filterName);
  };

  const filters = [
    {
      name: 'NEW SEASON',
      key: 'newSeason',
      options: ['All', 'New Arrivals', 'Latest Collection']
    },
    {
      name: 'COLOR',
      key: 'color',
      options: ['All', 'Black', 'White', 'Blue', 'Brown', 'Gray']
    },
    {
      name: 'DESIGNER',
      key: 'designer',
      options: ['All', 'Gucci', 'Nike', 'Tom Ford', 'Khaite']
    },
    {
      name: 'CLOTHING SIZE',
      key: 'size',
      options: ['All', 'XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'PRICE',
      key: 'price',
      options: ['All', 'Under $500', '$500 - $1000', '$1000 - $2000', 'Over $2000']
    }
  ];

  return (
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
          
          <div className="filter-content">
            <div className="filter-default-option">
              All
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FilterOptions;