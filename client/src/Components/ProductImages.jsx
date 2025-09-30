import React from 'react';
import './ProductImages.css';

function ProductImages({ images, productName }) {
  return (
    <div className="product-images-container">
      <div className="product-images-grid">
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} className="product-image-wrapper">
              <img
                src={image}
                alt={`${productName} - View ${index + 1}`}
                className="product-detail-image"
              />
            </div>
          ))
        ) : (
          <div className="product-image-wrapper">
            <img
              src="/placeholder-image.jpg"
              alt="Product placeholder"
              className="product-detail-image"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImages;