import React, { useState, useEffect } from 'react';
import FilterOptions from './FilterOption';
import './ClothesPage.css';

function ClothesPage() {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('Recommended');

  useEffect(() => {
    fetchClothes();
  }, []);

  const fetchClothes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/clothes/filter?category=clothes');
      const data = await response.json();
      setClothes(data.data || []);
    } catch (error) {
      console.error('Error fetching clothes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
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

      <div className="container-fluid">
        <div className="row">
          {/* Filters Sidebar */}
          <div className="col-lg-3 col-md-4">
            <FilterOptions />
          </div>

          {/* Main Content */}
          <div className="col-lg-9 col-md-8">
            {/* Results Header */}
            <div className="clothes-results-header">
              <span className="clothes-results-count">
                {clothes.length} Results
              </span>
              
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

            {/* Products Grid */}
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="row clothes-products-grid">
                {clothes.map((item) => (
                  <div key={item._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                    <div className="clothes-product-card">
                      <div className="clothes-product-image-container">
                        <img 
                          src={item.images?.[0] || '/placeholder-image.jpg'} 
                          alt={`${item.designer} ${item.dress}`}
                          className="clothes-product-image"
                        />
                        <button className="clothes-wishlist-btn">
                          <i className="far fa-heart"></i>
                        </button>
                      </div>
                      
                      <div className="clothes-product-info">
                        <div className="clothes-product-designer">
                          {item.designer?.toUpperCase() || 'DESIGNER'}
                        </div>
                        <div className="clothes-product-name">
                          {item.dress} {item.type}
                        </div>
                        <div className="clothes-product-price">
                          {formatPrice(item.price)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClothesPage;