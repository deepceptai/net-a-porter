import React, { useState } from "react";
import "./NewArrivals.css";

const NewArrivals = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    { id: 1, image: "/Images/image1.png", brand: "KHAITE", alt: "Leopard print tote bag" },
    { id: 2, image: "/Images/image2.png", brand: "KHAITE", alt: "Black leather jacket" },
    { id: 3, image: "/Images/image3.png", brand: "KHAITE", alt: "Burgundy silk shirt" },
    { id: 4, image: "/Images/image4.png", brand: "BALENCIAGA", alt: "Black wide leg pants" },
    { id: 5, image: "/Images/image5.png", brand: "DIOR", alt: "White blazer" },
    { id: 6, image: "/Images/image6.png", brand: "GUCCI", alt: "Designer handbag" },
    { id: 7, image: "/Images/image1.png", brand: "PRADA", alt: "Black dress" },
    { id: 8, image: "/Images/image2.png", brand: "VERSACE", alt: "Denim jacket" },
    { id: 9, image: "/Images/image3.png", brand: "CHANEL", alt: "Tweed jacket" },
    { id: 10, image: "/Images/image4.png", brand: "FENDI", alt: "Trench coat" },
    { id: 11, image: "/Images/image5.png", brand: "BALENCIAGA", alt: "Sneakers" },
    { id: 12, image: "/Images/image6.png", brand: "KHAITE", alt: "Wool sweater" },
  ];

  const totalSlides = Math.ceil(products.length / 4);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="new-arrivals-section">
      <div className="container">
        <div className="row">
          {/* Left section */}
          <div className="col-lg-4 col-md-12">
            <div className="section-header">
              <div className="item-count">1,149 NEW ITEMS</div>
              <h1 className="section-title">New In</h1>
              <p className="section-description">
                New arrivals, now dropping five days a week – discover the latest launches onsite from Monday to Friday.
              </p>
              <button className="shop-btn">Shop New In</button>
            </div>
          </div>

          {/* Right section - Carousel */}
          <div className="col-lg-8 col-md-12">
            <div className="carousel-wrapper">
              <div className="carousel-images">
                {/* Track */}
                <div
                  className="carousel-track"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {products.map((product) => (
                    <div key={product.id} className="product-slide">
                      <div className="product-card">
                        <div className="product-image-wrapper">
                          <img
                            src={product.image}
                            alt={product.alt}
                            className="product-image"
                          />
                        </div>
                        <div className="product-brand">{product.brand}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Controls */}
                <button className="carousel-control prev" onClick={prevSlide}>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button className="carousel-control next" onClick={nextSlide}>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
