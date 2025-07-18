import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    // ✅ Check if product exists to prevent crashing
    if (!product) {
        return <p>Loading product details...</p>;
    }

    // Descriptions based on category
    const categoryDescriptions = {
        "Pottery & Ceramics": "Explore handcrafted pottery and ceramic pieces...",
        "Textiles & Fabrics": "Discover high-quality textiles and fabrics...",
        "Stone & Marble": "Elevate your space with our exquisite stone and marble products..."
    };

    return (
        <div className='productdisplay'>
            {/* Left Section: Images */}
            <div className='productdisplay-left'>
                <div className='productdisplay-img-list'>
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className='productdisplay-img'>
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>

            {/* Right Section: Details */}
            <div className='productdisplay-right'>
                <h1>{product.name}</h1>

                {/* Star Rating */}
                <div className='productdisplay-right-star'>
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>

                {/* Prices */}
                <div className='productdisplay-right-prices'>
                    <div className='productdisplay-right-price-old'>
                    ₹{product.old_price}</div>
                    <div className='productdisplay-right-price-new'>
                    ₹{product.new_price}</div>
                </div>

                {/* Dynamic Product Description */}
                <div className='productdisplay-right-description'>
                    {categoryDescriptions[product.category] || "Discover our premium collection..."}
                </div>

                {/* Button + Category & Tags */}
                <div className="productdisplay-right-info">
                    <button onClick={() => addToCart(product.id)} className="productdisplay-button">
                        Add to Cart
                    </button>
                    <p className="productdisplay-right-category"><span>Category:</span> {product.category}</p>
                    <p className="productdisplay-right-category"><span>Tags:</span> Modern, Latest</p>
                </div>
            </div>
        </div>
    );
}

export default ProductDisplay;
