import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero position-relative">
      <div className="row g-0">
        {/* Left Image */}
        <div className="col-12">
          <img  
            src="/Images/w1500_q80.webp" // Replace with your hero image
            alt="Fashion Model"
            className="img-fluid w-100 h-100 object-fit-cover"
          />
        </div>
       
      </div>
        <div className="hero-overlay"></div>

      {/* Hero Text Overlay */}
      <div className="hero-text position-absolute text-white">
        <h2 className="fw-bold">Fashion to fall for</h2>
        <p className="lead">
          Power up your wardrobe with strong suiting, covetable coats and
          statement knitwear
        </p>
        <button className="btn btn-light rounded-0 fw-bold px-4 py-2">
          Shop the new season
        </button>
      </div>
    </section>
  );
};

export default Hero;
