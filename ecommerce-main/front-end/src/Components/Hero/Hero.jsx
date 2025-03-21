import React from 'react';
import arrow_icon from '../../Components/Assets/arrow.png';
import hand_icon from '../../Components/Assets/hand_icon.png';
import hero_image from '../../Components/Assets/hero_image.png';
import './Hero.css';

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>NEW arrivals only</h2>
        <div className="hero-hand-icon">
          <p>new</p>
          <img src={hand_icon} alt="Hand Icon" />
        </div>
        <p>collections</p>
        <p>for everyone</p>
        <div className="hero-latest-button">
          <div>latest collections</div>
          <img src={arrow_icon} alt="Arrow Icon" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="Hero" />
      </div>
    </div>
  );
}

export default Hero;
