import React from "react";
import SellerForm from "../Components/SellerForm";
import ClothesList from "../Components/Products";

const NewIn = () => {
  return (
    <div className="container mt-5 pt-5">
      <SellerForm />
      <ClothesList />
    </div>
  );
};

export default NewIn;
