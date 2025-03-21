import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import cart_icon from '../Assets/cart_icon.png';
import logo from '../Assets/logo.png';
import nav_dropdown from '../Assets/nav_dropdown.png';
import './Navbar.css';

export const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle  = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  return (
    <div className='Navbar'>
      <div className="nav_logo">
        <img src={logo} alt="Shopper Logo" />
        <p>SHOPPER</p>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt=''/>
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => { setMenu("Shop"); }}>
          <Link style={{ textDecoration: 'none' }} to='/shop'>Shop</Link>
          {menu === "Shop" ? <hr /> : null}
        </li>
        <li onClick={() => { setMenu("Mens"); }}>
          <Link style={{ textDecoration: 'none' }} to='/mens'>Mens</Link>
          {menu === "Mens" ? <hr /> : null}
        </li>
        <li onClick={() => { setMenu("Womens"); }}>
          <Link style={{ textDecoration: 'none' }} to='/womens'>Womens</Link>
          {menu === "Womens" ? <hr /> : null}
        </li>
        <li onClick={() => { setMenu("Kids"); }}>
          <Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>
          {menu === "Kids" ? <hr /> : null}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>LOGOUT</button>
      :<Link to='/login'><button>Login</button></Link>}
        
        <Link to='/cart'><img src={cart_icon} alt="Cart Icon" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};
