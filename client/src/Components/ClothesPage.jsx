import { useState, useEffect } from 'react';
import FilterOptions from './FilterOption';
import ProductList from './ProductList';
import './ClothesPage.css';

function ClothesPage() {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('Recommended');
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    dress: [],
    type: [],
    color: [],
    designer: [],
    size: []
  });

  useEffect(() => {
    fetchClothes();
  }, [selectedFilters]);

  const fetchClothes = async () => {
    setLoading(true);
    try {
      // Build query string from selected filters
      const queryParams = new URLSearchParams();
      
      Object.keys(selectedFilters).forEach(key => {
        if (selectedFilters[key].length > 0) {
          selectedFilters[key].forEach(value => {
            queryParams.append(key, value);
          });
        }
      });

      const queryString = queryParams.toString();
      const url = queryString 
        ? `http://localhost:5000/api/clothes/filter?${queryString}`
        : 'http://localhost:5000/api/clothes/filter?category=clothes';

      const response = await fetch(url);
      const data = await response.json();
      setClothes(data.data || []);
    } catch (error) {
      console.error('Error fetching clothes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterKey, value) => {
    setSelectedFilters(prev => {
      const currentFilters = prev[filterKey];
      
      // If "All" is selected, clear all filters for this category
      if (value === 'All') {
        return {
          ...prev,
          [filterKey]: []
        };
      }
      
      // Toggle the filter value
      if (currentFilters.includes(value)) {
        return {
          ...prev,
          [filterKey]: currentFilters.filter(v => v !== value)
        };
      } else {
        return {
          ...prev,
          [filterKey]: [...currentFilters, value]
        };
      }
    });
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortBy(sortValue);
    
    const sortedClothes = [...clothes];
    
    switch(sortValue) {
      case 'Price Low to High':
        sortedClothes.sort((a, b) => a.price - b.price);
        break;
      case 'Price High to Low':
        sortedClothes.sort((a, b) => b.price - a.price);
        break;
      case 'Newest':
        sortedClothes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }
    
    setClothes(sortedClothes);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="clothes-page">
      {/* Hero Image Banner Section */}
      <div className="hero-banner">
        <img 
          src="https://www.net-a-porter.com/content/images/cms/ycm/resource/blob/2683774/725f0e502246d07f63b14961b2af0750/fw25-campaign-plpbanner-1920x270-data.jpg/w3000_q80.jpg" 
          alt="New Season Fashion Campaign"
          className="hero-image"
        />
      </div>

      {/* Header Section */}
      <div className="clothes-header text-center">
        <h1 className="clothes-main-title">New Season Now</h1>
        <p className="clothes-subtitle">
          Power up your wardrobe with strong suiting, covetable coats and statement knitwear from{' '}
          <a href="#" className="clothes-designer-link">Khaite</a>,{' '}
          <a href="#" className="clothes-designer-link">Tom Ford</a>,{' '}
          <a href="#" className="clothes-designer-link">Alaïa</a>{' '}
          and more in-demand designers
        </p>
      </div>

      <div className="container">
        <div className="clothes-sort-container">
          <div className="custom-boarder">
            <span className='text-muted custom-border'>
              {clothes.length} Results
            </span>
          </div>
          <div className="clothes-sort-dropdown">
            <select 
              className="form-select clothes-sort-select"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="Recommended">Recommended</option>
              <option value="Price Low to High">Price Low to High</option>
              <option value="Price High to Low">Price High to Low</option>
              <option value="Newest">Newest</option>
            </select>
          </div>
        </div>
        
        <div className="row">
          {/* Filters Sidebar */}
          <div className="col-lg-3 col-md-4">
            <FilterOptions 
              onFilterChange={handleFilterChange}
              selectedFilters={selectedFilters}
              totalResults={clothes.length}
            />
          </div>
          
          {/* Main Content */}
          <div className="col-lg-9 col-md-8">
            <ProductList 
              products={clothes}
              loading={loading}
              formatPrice={formatPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClothesPage;