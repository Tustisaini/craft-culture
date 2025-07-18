import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    window.location.replace('/');
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
      </div>

      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Shop</Link>
          {menu === "shop" && <hr className="underline" />}
        </li>
        <li onClick={() => setMenu("Pottery & Ceramics")}>
          <Link to="/Pottery & Ceramics" style={{ textDecoration: 'none', color: 'black' }}>Pottery & Ceramics</Link>
          {menu === "Pottery & Ceramics" && <hr className="underline" />}
        </li>
        <li onClick={() => setMenu("Textiles & Fabrics")}>
          <Link to="/Textiles & Fabrics" style={{ textDecoration: 'none', color: 'black' }}>Textiles & Fabrics</Link>
          {menu === "Textiles & Fabrics" && <hr className="underline" />}
        </li>
        <li onClick={() => setMenu("Stone & Marble")}>
          <Link to="/Stone & Marble" style={{ textDecoration: 'none', color: 'black' }}>Stone & Marble</Link>
          {menu === "Stone & Marble" && <hr className="underline" />}
        </li>
      </ul>

      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
            <button><b>Login</b></button>
          </Link>
        )}
        <Link to="/cart" style={{ textDecoration: 'none', color: 'black' }}>
          <img src={cart_icon} alt="Cart Icon" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
