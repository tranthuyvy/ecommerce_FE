
import React from "react";
import "./ProductInfoSection.css"; // Import tệp CSS

const ProductInfoSection = () => {
  return (
    <div className="product-card">
      <div className="product-info-section">
        <div className="product-image ml-10">
          <img 
            src="https://classic.cdn.media.amplience.net/i/hibbett/1985-Air%20Jordan%201.png" 
            alt="Product"
            
            />
        </div>
        <div className="product-info mb-10 -mt-10">
          <h2 className="text-lg">Air Jordan 1 Mid</h2>
          <p className="opacity-40 text-xs py-5">Men's Shoes</p>
          <p className="mr-16 text-justify opacity-70">Inspired by the original AJ1, this mid-top edition maintains the iconic look you love while choice colours and crisp leather give it a distinct identity</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoSection;
