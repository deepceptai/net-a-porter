import React from "react";

import "./OuterwearUpdates.css";

const OuterwearUpdates = () => {
  const items = [
    {
      img: "/Images/Home/Image1.jpg",
      label: "TRENCH COATS",
    },
    {
      img: "/Images/Home/Image2.jpg",
      label: "BLAZERS",
    },
    {
      img: "/Images/Home/Image3.jpg",
      label: "SHEARLING COATS",
    },
    {
      img: "/Images/Home/Image4.jpg",
      label: "LEATHER JACKETS",
    },
  ];

  return (
    <div className="container my-5 text-center">
      <h6 className="section-title-2">OUTERWEAR UPDATES</h6>
      <div className="row g-4 mt-3">
        {items.map((item, index) => (
          <div className="col-12 col-sm-6 col-lg-3" key={index}>
            <div className="outerwear-card">
              <img
                src={item.img}
                alt={item.label}
                className="img-fluid w-100 outerwear-img"
              />
              <p className="fw-bold mt-2">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OuterwearUpdates;
