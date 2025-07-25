import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const res = await fetch('http://localhost:4000/allproducts');
      const data = await res.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      await fetchInfo();
    };
    loadProducts();
  }, []);

  const remove_product = async (id) => {
    try {
      const res = await fetch('http://localhost:4000/removeproduct', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const result = await res.json();
      if (result.success) {
        alert("Product removed successfully!");
        fetchInfo(); // Refresh list
      } else {
        alert("Failed to remove product.");
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <div className='list-product'>
      <h1>All Products</h1>
      <div className='listproduct-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className='listproduct-allproducts'>
        <hr />
        {allproducts.map((product, index) => (
          <div key={product.id || index} className='listproduct-format-main listproduct-format'>
            <img src={product.image} alt="" className='listproduct-product-icon' />
            <p>{product.name}</p>
            <p>₹{product.old_price}</p>
            <p>₹{product.new_price}</p>
            <p>{product.category}</p>
            <img
              onClick={() => remove_product(product.id || product._id)}
              className='listproduct-remove-icon'
              src={cross_icon}
              alt="Remove"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
