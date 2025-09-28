import React from "react";
import Hero from "../Components/Hero"; // import the Hero component

const Home = () => {
  return (
    <div>
      {/* Hero Section - starts immediately at top */}
      <Hero />
      <div style={{backgroundColor:"red"}}>
           <h1>Hello</h1>
      </div>
     
    </div>
  );
};

export default Home;
