import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import star_dull_icon from '../Assets/star_dull_icon.png';
import star_icon from '../Assets/star_icon.png';
import './ProductDisplay.css';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext); // Accessing addToCart function from context

  return (
    <div className='productdisplay'>
      <div className='productdisplay-left'>
        <div className='productdisplay-img-list'>
          {/* Assuming multiple images are displayed for product */}
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className='productdisplay-img'>
          {/* Main image for the product */}
          <img className='productdisplay-main-img' src={product.image} alt="" />
        </div>
      </div>
      <div className='productdisplay-right'>
        <h1>{product.name}</h1>
        {/* Star ratings display */}
        <div className='productdisplay-right-star'>
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        {/* Product prices */}
        <div className='productdisplay-right-prices'>
          <div className='productdisplay-right-price-old'>${product.old_price} </div>
          <div className='productdisplay-right-price-new'>${product.new_price}</div>
        </div>
        {/* Product description */}
        <div className='productdisplay-right-description'>
          This is a premium quality product with top-notch features. Perfect for everyday use and special occasions.
          Experience unmatched comfort and style. Ideal for those who value both aesthetics and functionality.
        </div>
        {/* Size selection */}
        <div className='productdisplay-right-size'>
          <h1>Select size</h1>
          <div className='productdisplay-right-sizes'>
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        {/* Add to cart button */}
        <button onClick={() => {addToCart(product.id)}}>ADD TO CART</button>
        {/* Product categories and tags */}
        <p className='productdisplay-right-category'><span>Category :</span> Women , T-shirt, Crop Top</p>
        <p className='productdisplay-right-category'><span>Tags :</span> Modern , Latest</p>
      </div>
    </div>
  );
}

export default ProductDisplay;
