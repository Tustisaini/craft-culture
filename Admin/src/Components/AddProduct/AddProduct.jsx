import React, { useState, useEffect } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "",
    new_price: "",
    old_price: "",
  });

  // Handle Image Preview
  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl); // Cleanup URL to prevent memory leaks
    }
  }, [image]);

  // Handle Image Selection
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle Input Changes
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  // Upload Image and Add Product
  const Add_Product = async () => {
    console.log("Product Details:", productDetails);
    let responseData;
    
    // Create FormData for Image Upload
    let formData = new FormData();
    formData.append("product", image);

    try {
      // Upload Image
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData, // ✅ No headers needed for multipart data
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      responseData = await response.json(); // ✅ Parse response safely

      if (responseData.success) {
        // ✅ Update product state with the image URL
        setProductDetails((prevDetails) => ({
          ...prevDetails,
          image: responseData.image_url,
        }));

        // Add Product
        const productResponse = await fetch("http://localhost:4000/addproduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...productDetails,
            image: responseData.image_url,
          }),
        });

        const productData = await productResponse.json();
        if (productData.success) {
          alert("Product added successfully!");
        } else {
          alert("Failed to add product.");
        }
      } else {
        console.error("Image upload failed:", responseData.message);
      }
    } catch (error) {
      console.error("Error in image upload:", error);
    }
  };

  return (
    <div className="add-product">
      {/* Product Title */}
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>

      {/* Price & Offer Price */}
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>

      {/* Product Category */}
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="Pottery & Ceramics">Pottery & Ceramics</option>
          <option value="Textiles & Fabrics">Textiles & Fabric</option>
          <option value="Stone & Marble">Stone & Marble</option>
        </select>
      </div>

      {/* Image Upload */}
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={preview || upload_area} className="addproduct-thumbnail-img" alt="Upload" />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
      </div>

      {/* Add Product Button */}
      <button onClick={Add_Product} className="addproduct-btn">
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
