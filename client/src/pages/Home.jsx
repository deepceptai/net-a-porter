import React from "react";
import Hero from "../Components/Hero";
import NewArrivals from "../Components/NewArrivals";
import FashionShowcase from "../Components/FashionShowcase";
import OuterwearUpdates from "../Components/OuterwearUpdates";
import FashionHighlights from "../Components/FashionHighlights";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <div>
      {/* Hero Section - starts immediately at top */}
      <Hero />
      <div style={{backgroundColor:"#ffffff"}}>
          <NewArrivals />
          <FashionShowcase />
          <OuterwearUpdates />
          <FashionHighlights />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
