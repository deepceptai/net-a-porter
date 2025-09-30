import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductImages from '../Components/ProductImages';
import ProductDetails from '../Components/ProductDetails';
import './ProductDetailsPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/clothes/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setProduct(data.data);
      } else {
        setError('Product not found');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="loading-container">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-page">
        <div className="error-container">
          <h2>Product Not Found</h2>
          <p>{error || 'The product you are looking for does not exist.'}</p>
          <a href="/clothes" className="btn-back-to-products">
            Back to Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail-row">
          {/* Left Side - Product Images */}
          <div className="product-images-column">
            <ProductImages 
              images={product.images}
              productName={`${product.designer} ${product.dress || product.name}`}
            />
          </div>
          
          {/* Right Side - Product Details */}
          <div className="product-details-column">
            <ProductDetails 
              product={product}
              formatPrice={formatPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;