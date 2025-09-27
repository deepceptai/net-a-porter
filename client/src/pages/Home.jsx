import React from "react";
import SellerForm from "../Components/SellerForm";
import ClothesList from "../Components/Products";

const Home = () => {
  return (
    <div className="container mt-4">
      <SellerForm />
      <ClothesList />
    </div>
  );
};

export default Home;
