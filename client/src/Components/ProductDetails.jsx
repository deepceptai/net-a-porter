import React, { useState } from 'react';
import './ProductDetails.css';

function ProductDetails({ product, formatPrice }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isEditorNotesOpen, setIsEditorNotesOpen] = useState(false);
  const [isSizeAndFitOpen, setIsSizeAndFitOpen] = useState(false);

  // Available sizes (you can make this dynamic based on your data)
  const availableSizes = ['x small', 'small', 'medium', 'large'];
  
  // Available colors (you can make this dynamic based on your data)
  const availableColors = [
    { name: 'Taupe', hex: '#8B7D6B' },
    { name: 'Navy', hex: '#1B2845' }
  ];

  const handleAddToBag = () => {
    console.log('Add to bag:', { product, selectedSize, selectedColor });
    // Implement your add to bag logic here
  };

  const handleAddToWishList = () => {
    console.log('Add to wishlist:', product);
    // Implement your wishlist logic here
  };

  return (
    <div className="product-details-container">
      <div className="product-details-sticky">
        {/* Designer Name */}
        <h1 className="product-designer-name">
          {product.designer?.toUpperCase() || 'DESIGNER'}
        </h1>

        {/* Product Title */}
        <h2 className="product-title">
          {product.dress && product.type 
            ? `${product.dress} ${product.type}` 
            : product.name || 'Product Name'}
        </h2>

        {/* Price */}
        <div className="product-price-container">
          <span className="product-price">
            {formatPrice(product.price)}
          </span>
          <span className="product-price-conversion">
            {' '}/ Approx.{' '}
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(product.price * 83)}
          </span>
        </div>

        {/* Color Selection */}
        {availableColors.length > 0 && (
          <div className="product-option-section">
            <label className="product-option-label">
              Color: {selectedColor || availableColors[0].name}
            </label>
            <div className="color-options">
              {availableColors.map((color) => (
                <button
                  key={color.name}
                  className={`color-swatch ${selectedColor === color.name ? 'selected' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setSelectedColor(color.name)}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>
        )}

        {/* Size Selection */}
        <div className="product-option-section">
          <div className="size-header">
            <label className="product-option-label">Size:</label>
            <button className="size-guide-link">View size guide</button>
          </div>
          <div className="size-options">
            {availableSizes.map((size) => (
              <button
                key={size}
                className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="product-actions">
          <button 
            className="btn-add-to-bag"
            onClick={handleAddToBag}
            disabled={!selectedSize}
          >
            Add to Bag
          </button>
          <button 
            className="btn-add-to-wishlist"
            onClick={handleAddToWishList}
          >
            <i className="far fa-heart"></i>
            Add to Wish List
          </button>
        </div>

        {/* Rewards Program */}
        <div className="rewards-section">
          <i className="far fa-gem rewards-icon"></i>
          <span className="rewards-text">
            Earn exclusive rewards on every purchase. Discover our{' '}
            <a href="#" className="rewards-link">Rewards Program</a>
          </span>
        </div>

        {/* Editor's Notes Accordion */}
        {product.editorNotes && (
          <div className="accordion-section">
            <button
              className="accordion-header"
              onClick={() => setIsEditorNotesOpen(!isEditorNotesOpen)}
            >
              <span>EDITORS' NOTES</span>
              <i className={`fas fa-chevron-${isEditorNotesOpen ? 'up' : 'down'}`}></i>
            </button>
            {isEditorNotesOpen && (
              <div className="accordion-content">
                <p>{product.editorNotes}</p>
              </div>
            )}
          </div>
        )}

        {/* Size & Fit Accordion */}
        {product.sizeAndFit && (
          <div className="accordion-section">
            <button
              className="accordion-header"
              onClick={() => setIsSizeAndFitOpen(!isSizeAndFitOpen)}
            >
              <span>SIZE & FIT</span>
              <i className={`fas fa-chevron-${isSizeAndFitOpen ? 'up' : 'down'}`}></i>
            </button>
            {isSizeAndFitOpen && (
              <div className="accordion-content">
                {product.sizeAndFit.modelInfo && (
                  <div className="size-fit-section">
                    <p><strong>Model measurements:</strong></p>
                    <ul>
                      {product.sizeAndFit.modelInfo.measurements && (
                        <>
                          <li>Bust: {product.sizeAndFit.modelInfo.measurements.bust}</li>
                          <li>Waist: {product.sizeAndFit.modelInfo.measurements.waist}</li>
                          <li>Hip: {product.sizeAndFit.modelInfo.measurements.hip}</li>
                        </>
                      )}
                      <li>Height: {product.sizeAndFit.modelInfo.height}</li>
                      <li>Wearing size: {product.sizeAndFit.modelInfo.wearingSize}</li>
                    </ul>
                  </div>
                )}
                
                {product.sizeAndFit.description && product.sizeAndFit.description.length > 0 && (
                  <div className="size-fit-section">
                    {product.sizeAndFit.description.map((desc, index) => (
                      <p key={index}>{desc}</p>
                    ))}
                  </div>
                )}
                
                {product.sizeAndFit.fitTips && product.sizeAndFit.fitTips.length > 0 && (
                  <div className="size-fit-section">
                    {product.sizeAndFit.fitTips.map((tip, index) => (
                      <p key={index}>{tip}</p>
                    ))}
                  </div>
                )}
                
                {product.sizeAndFit.fabricDetails && product.sizeAndFit.fabricDetails.length > 0 && (
                  <div className="size-fit-section">
                    {product.sizeAndFit.fabricDetails.map((detail, index) => (
                      <p key={index}>{detail}</p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;