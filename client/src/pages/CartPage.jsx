import React from "react";
import Cart from "../Components/Cart";
import CTA from "../Components/CTA";
import Footer from "../Components/Footer";

const CartPage = () => {
  return (<>
    <div className="container margin-custom">
      <Cart />
      
    </div>
    <CTA/>
    <Footer/></>
  );
};

export default CartPage;
