import React from "react";
import Hero from "../Components/Hero";
import NewArrivals from "../Components/NewArrivals"; // import the Hero component

const Home = () => {
  return (
    <div>
      {/* Hero Section - starts immediately at top */}
      <Hero />
      <div style={{backgroundColor:"white"}}>
          <NewArrivals />
      </div>
     
    </div>
  );
};

export default Home;
