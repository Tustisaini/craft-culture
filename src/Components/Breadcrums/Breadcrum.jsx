import React from 'react';
import './Breadcrum.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';

const Breadcrum = ({ product }) => {
  console.log("Breadcrum component rendered with product:", product);

  if (!product) return null; // Prevent errors if product is undefined

  return (
    <div className="Breadcrum">
      HOME <img src={arrow_icon} alt="arrow icon" /> SHOP 
      {product.category && <><img src={arrow_icon} alt="arrow icon" /> {product.category}</>}
      {product.name && <><img src={arrow_icon} alt="arrow icon" /> {product.name}</>}
    </div>
  );
};

export default Breadcrum;
