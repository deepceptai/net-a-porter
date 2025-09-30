import React from 'react';
import './ProductList.css';

function ProductList({ products, loading, formatPrice }) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">No products found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="row g-4 products-grid">
      {products.map((item) => (
        <div key={item._id} className="col-lg-4 col-md-6 col-sm-12">
          <div className="product-card">
            <div className="product-image-container">
              <img 
                src={item.images?.[0] || '/placeholder-image.jpg'} 
                alt={`${item.designer} ${item.dress || item.name}`}
                className="product-image"
              />
              <button className="wishlist-btn">
                <i className="far fa-heart"></i>
              </button>
            </div>
            
            <div className="product-info">
              <div className="product-designer">
                {item.designer?.toUpperCase() || 'DESIGNER'}
              </div>
              <div className="product-name">
                {item.dress && `${item.dress} ${item.type || ''}`}
                {item.name && item.name}
              </div>
              <div className="product-price">
                {formatPrice(item.price)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;