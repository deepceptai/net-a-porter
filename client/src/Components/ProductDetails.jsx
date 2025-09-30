import React, { useState } from 'react';
import './ProductDetails.css';

function ProductDetails({ product, formatPrice }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.color || '');
  const [isEditorNotesOpen, setIsEditorNotesOpen] = useState(true);
  const [isSizeAndFitOpen, setIsSizeAndFitOpen] = useState(false);
  const [isDetailsAndCareOpen, setIsDetailsAndCareOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    console.log('Add to bag:', { product, selectedSize, selectedColor });
  };

  const handleAddToWishList = () => {
    console.log('Add to wishlist:', product);
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
            ? `${product.dress.charAt(0).toUpperCase() + product.dress.slice(1)} ${product.type}` 
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

        {/* Color Selection - Only show if color exists */}
{product.color && product.color.length > 0 && (
  <div className="product-option-section">
    <label className="product-option-label">
      Color: {selectedColor}
    </label>
    <div className="color-options">
      {product.color.map((clr, index) => (
        <button
          key={index}
          className={`btn btn-outline-dark ${selectedColor === clr ? "selected" : ""}`}
          onClick={() => setSelectedColor(clr)}
        >
          {clr.charAt(0).toUpperCase() + clr.slice(1)}
        </button>
      ))}
    </div>
  </div>
)}


      {/* Size Selection - Only show if size exists */}
{product.size && product.size.length > 0 && (
  <div className="product-option-section">
    <div className="size-header">
      <label className="product-option-label">Size:</label>
      <button className="size-guide-link">View size guide</button>
    </div>
    <div className="size-options">
      {product.size.map((sz, index) => (
        <button
          key={index}
          className={`size-button ${selectedSize === sz ? "selected" : ""}`}
          onClick={() => setSelectedSize(sz)}
        >
          {sz}
        </button>
      ))}
    </div>
  </div>
)}


        {/* Action Buttons */}
        <div className="product-actions">
          <button 
            className="btn-add-to-bag"
            onClick={handleAddToBag}
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
        <div className="reward">
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
                
                {/* Shown Here With Section - only if editor notes is open */}
                <div className="shown-here-section">
                  <div className="shown-here-title">SHOWN HERE WITH</div>
                  <div className="shown-here-items">
                    <div className="shown-here-item">
                      <div className="shown-here-item-content">
                        <img 
                          src="https://via.placeholder.com/80" 
                          alt="Ruched satin mules" 
                          className="shown-here-image"
                        />
                        <div className="shown-here-info">
                          <div className="shown-here-designer">DRIES VAN NOTEN</div>
                          <div className="shown-here-product">Ruched satin mules</div>
                        </div>
                      </div>
                    </div>
                    <div className="shown-here-item">
                      <div className="shown-here-item-content">
                        <img 
                          src="https://via.placeholder.com/80" 
                          alt="Chenille scarf" 
                          className="shown-here-image"
                        />
                        <div className="shown-here-info">
                          <div className="shown-here-designer">DRIES VAN NOTEN</div>
                          <div className="shown-here-product">Chenille scarf</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                      {product.sizeAndFit.modelInfo.height && (
                        <li>Height: {product.sizeAndFit.modelInfo.height}</li>
                      )}
                      {product.sizeAndFit.modelInfo.wearingSize && (
                        <li>Wearing size: {product.sizeAndFit.modelInfo.wearingSize}</li>
                      )}
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

        {/* Details & Care Accordion */}
        <div className="accordion-section">
          <button
            className="accordion-header"
            onClick={() => setIsDetailsAndCareOpen(!isDetailsAndCareOpen)}
          >
            <span>DETAILS & CARE</span>
            <i className={`fas fa-chevron-${isDetailsAndCareOpen ? 'up' : 'down'}`}></i>
          </button>
          {isDetailsAndCareOpen && (
            <div className="accordion-content">
              <p>Care instructions and product details will be displayed here.</p>
            </div>
          )}
        </div>

        {/* Delivery & Returns Accordion */}
        <div className="accordion-section">
          <button
            className="accordion-header"
            onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}
          >
            <span>DELIVERY & RETURNS</span>
            <i className={`fas fa-chevron-${isDeliveryOpen ? 'up' : 'down'}`}></i>
          </button>
          {isDeliveryOpen && (
            <div className="accordion-content">
              <p>Delivery and returns information will be displayed here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;