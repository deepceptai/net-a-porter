import React from 'react';
import './ProductImages.css';

function ProductImages({ images, productName }) {
  // Remove duplicate images by creating a Set of unique URLs
  const uniqueImages = images && images.length > 0 
    ? [...new Set(images)] 
    : [];

  return (
    <div className="product-images-container">
      <div className="product-images-grid">
        {uniqueImages.length > 0 ? (
          uniqueImages.map((image, index) => (
            <div key={`${image}-${index}`} className="product-image-wrapper">
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