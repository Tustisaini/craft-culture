import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

  return (
    <div className='cartitems'>
      <div className='cartitems-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((product) => {
        if (cartItems[product.id] > 0) {
          return (
            <React.Fragment key={product.id}>
              <div className='cartitems-format'>
                <img src={product.image} alt='' className='carticon-product-icon' />
                <p>{product.name}</p>
                <p>₹{product.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[product.id]}</button>
                <p>₹{product.new_price * cartItems[product.id]}</p>
                <img
                  src={remove_icon}
                  onClick={() => removeFromCart(product.id)}
                  alt='Remove item'
                  className='cartitems-remove-icon'
                />
              </div>
              <hr />
            </React.Fragment>
          );
        }
        return null;
      })}

      <div className='cartitems-down'>
        <div className='cartitems-total'>
          <h1>Cart Total</h1>
          <div>
            <div className='cartitems-total-item'>
              <p>SubTotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />

            <div className='cartitems-total-item'>
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />

            <div className='cartitems-total-item'>
              <h3>Total</h3>
              <h3>₹{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>Proceed To Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
