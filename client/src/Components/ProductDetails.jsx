import { useEffect, useState } from 'react';
import './ProductDetails.css';
import axios from 'axios';
import Hells from '/Images/hells.avif';
import Scarf from '/Images/scarf.avif';

function ProductDetails({ product, formatPrice }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.color?.[0] || '');
  const [isEditorNotesOpen, setIsEditorNotesOpen] = useState(true);
  const [isSizeAndFitOpen, setIsSizeAndFitOpen] = useState(false);
  const [isDetailsAndCareOpen, setIsDetailsAndCareOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const token = localStorage.getItem("token");

  // Check wishlist and cart status
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        // Fetch Wishlist
        const wishlistRes = await axios.get("http://localhost:5000/api/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Handle different response structures
        const wishlistItems = wishlistRes.data.wishlist || wishlistRes.data || [];
        
        // Check if THIS product with THIS size is in wishlist
        // Only check size if a size is selected
        const inWishlist = wishlistItems.some((item) => {
          const isSameProduct = item.product?._id === product._id;
          
          // If no size selected yet, don't mark as in wishlist
          if (!selectedSize) return false;
          
          // Check if sizes match (case-insensitive)
          const isSameSize = item.size?.toUpperCase() === selectedSize.toUpperCase();
          
          return isSameProduct && isSameSize;
        });
        
        setIsInWishlist(inWishlist);

        // Fetch Cart
        const cartRes = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const cartItems = cartRes.data || [];
        
        // Check if THIS product with THIS size is in cart
        const inCart = cartItems.some((item) => {
          const isSameProduct = item.product?._id === product._id;
          
          // If no size selected, just check product
          if (!selectedSize) return isSameProduct;
          
          // Check if sizes match
          const isSameSize = item.size?.toUpperCase() === selectedSize.toUpperCase();
          
          return isSameProduct && isSameSize;
        });
        
        setIsInCart(inCart);
        
      } catch (err) {
        console.error("Error fetching wishlist/cart:", err);
        // Don't show error to user, just log it
      }
    };

    fetchData();
  }, [product._id, token, selectedSize]); // Re-run when size changes

  const handleAddToBag = async (productId, size) => {
    // Validate size if product has sizes
    if (!size && product.size?.length > 0) {
      alert("Please select a size before adding to bag");
      return;
    }

    if (!token) {
      alert("Please login to add items to your bag");
      return;
    }

    try {
      setLoadingCart(true);

      const res = await axios.post(
        "http://localhost:5000/api/cart/add",
        { 
          productId, 
          quantity: 1, 
          size: size?.toUpperCase() || size 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message || "Added to bag successfully!");
      setIsInCart(true);
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert(err.response?.data?.message || "Failed to add to cart");
    } finally {
      setLoadingCart(false);
    }
  };

  const handleAddToWishlist = async (productId, size) => {

  // Only require size if product has sizes available
  if (product.size?.length > 0 && !size) {
    alert("Please select a size before adding to wishlist");
    return;
  }

  if (!token) {
    alert("Please login to add items to your wishlist");
    return;
  }

  try {
    setLoadingWishlist(true);

    // Create payload - only include size if it exists
    const payload = { 
      productId
    };

    // Only add size to payload if it exists and product has sizes
    if (size && product.size?.length > 0) {
      payload.size = size.toUpperCase();
    } else {
      // For products without sizes, you might want to send null or empty string
      payload.size = null; // or ''
    }

    console.log("Sending payload:", payload);

    const res = await axios.post(
      "http://localhost:5000/api/wishlist/add",
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert(res.data.message || "Added to wishlist successfully!");
    setIsInWishlist(true);
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    console.error("Error response:", err.response?.data);
    const errorMsg = err.response?.data?.message || "Failed to add to wishlist";
    alert(errorMsg);
  } finally {
    setLoadingWishlist(false);
  }
};

  // Handle size change - reset cart/wishlist status for new size
  const handleSizeChange = (size) => {
    setSelectedSize(size);
    // Status will be re-checked by useEffect
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
          <span className="product-price">{formatPrice(product.price)}</span>
          <span className="product-price-conversion">
            / Approx.{" "}
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(product.price * 83)}
          </span>
        </div>

        {/* Color Selection */}
        {product.color && product.color.length > 0 && (
          <div className="product-option-section">
            <label className="product-option-label">Color: {selectedColor}</label>
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

        {/* Size Selection */}
        {product.size && product.size.length > 0 && (
          <div className="product-option-section">
            <div className="size-header">
              <label className="product-option-label">
                Size: {selectedSize && <span className="selected-size-text">{selectedSize}</span>}
              </label>
              <button className="size-guide-link">View size guide</button>
            </div>
            <div className="size-options">
              {product.size.map((sz, index) => (
                <button
                  key={index}
                  className={`size-button ${selectedSize === sz ? "selected" : ""}`}
                  onClick={() => handleSizeChange(sz)}
                >
                  {sz}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p className="size-warning-text">Please select a size</p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="product-actions">
          <button
            className="btn-add-to-bag"
            onClick={() => handleAddToBag(product._id, selectedSize)}
            disabled={(!selectedSize && product.size?.length > 0) || isInCart || loadingCart}
          >
            {loadingCart 
              ? "Adding..." 
              : isInCart 
                ? "In Bag" 
                : "Add to Bag"}
          </button>

          <button
            className="btn-add-to-wishlist"
            onClick={() => handleAddToWishlist(product._id, selectedSize)}
            disabled={(!selectedSize && product.size?.length > 0) || isInWishlist || loadingWishlist}
          >
            {loadingWishlist ? (
              "Adding..."
            ) : isInWishlist ? (
              <>
                <i className="fas fa-heart text-danger"></i> In Wishlist
              </>
            ) : (
              <>
                <i className="far fa-heart"></i> Add to Wish List
              </>
            )}
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

        {/* Accordions for Editor Notes, Size & Fit, Details & Care, Delivery & Returns */}
        {/* Editor's Notes */}
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
                <div className="shown-here-section">
                  <div className="shown-here-title">SHOWN HERE WITH</div>
                  <div className="shown-here-items">
                    <div className="shown-here-item">
                      <div className="shown-here-item-content">
                        <img 
                          src={Hells} 
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
                          src={Scarf} 
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

        {/* Size & Fit */}
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
                
                {product.sizeAndFit.description?.length > 0 && (
                  <div className="size-fit-section">
                    {product.sizeAndFit.description.map((desc, index) => (
                      <p key={index}>{desc}</p>
                    ))}
                  </div>
                )}
                
                {product.sizeAndFit.fitTips?.length > 0 && (
                  <div className="size-fit-section">
                    {product.sizeAndFit.fitTips.map((tip, index) => (
                      <p key={index}>{tip}</p>
                    ))}
                  </div>
                )}
                
                {product.sizeAndFit.fabricDetails?.length > 0 && (
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

        {/* Details & Care */}
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

        {/* Delivery & Returns */}
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