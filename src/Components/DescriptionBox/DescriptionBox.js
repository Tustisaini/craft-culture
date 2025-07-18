import React from 'react';
import './DescriptionBox.css';

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      {/* Navigation Tabs */}
      <div className='descriptionbox-navigator'>
        <div className='descriptionbox-nav-box active'>Description</div>
        <div className='descriptionbox-nav-box fade'>Reviews (122)</div>
      </div>

      {/* Description Content */}
      <div className='descriptionbox-description'>
        <p>
          Discover our exquisite collection of products, crafted with precision and artistry. 
          Each piece is designed to bring a touch of elegance and warmth to your home, whether used as decor, tableware, 
          or functional pottery. Made from high-quality materials, our products are durable, stylish, and timeless.
        </p>
        <p>
          Whether you're looking for beautifully handcrafted planters, vases, plates, mugs, or decorative pieces, our collection 
          offers something for everyone. Perfect for gifting or enhancing your own space, these products seamlessly blend tradition 
          with modern aesthetics.
        </p>
      </div>
    </div>
  );
}

export default DescriptionBox;
