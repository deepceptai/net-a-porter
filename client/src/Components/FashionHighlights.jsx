import React from "react";

import "./FashionHighlights.css";

const FashionHighlights = () => {
  const items = [
    {
      img: "/Images/FashionHighlights/image1.jpg",
      title: "The defining knit dress",
      desc: "An instant outfit solution. This season’s knitwear goes beyond cozy – think silhouettes that deliver polish and ease",
      linkText: "Shop knitted dresses",
      link: "#",
    },
    {
      img: "/Images/FashionHighlights/image2.jpg",
      title: "Slick shirts",
      desc: "The ultimate wardrobe staple – upgrade yours with the latest soft shades and tailored fits",
      linkText: "Shop shirts",
      link: "#",
    },
    {
      img: "/Images/FashionHighlights/image3.jpg",
      title: "Stirrup style",
      desc: "Riding boots step forward as the footwear to love now",
      linkText: "Shop the edit",
      link: "#",
    },
  ];

  return (
    <div className="container my-5">
      <div className="row g-4">
        {items.map((item, index) => (
          <div className="col-12 col-md-4" key={index}>
            <div className="fashion-card text-start">
              <img
                src={item.img}
                alt={item.title}
                className="img-fluid w-100 fashion-img"
              />
              <h5 className="mt-3">{item.title}</h5>
              <p>{item.desc}</p>
              <a href={item.link} style={{color:"black"}} className=" description text-decoration-underline">
                {item.linkText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FashionHighlights;
