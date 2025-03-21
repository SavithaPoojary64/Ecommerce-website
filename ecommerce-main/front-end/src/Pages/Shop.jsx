import React from 'react';
import Hero from '../Components/Hero/Hero'; // Import default export
import NewCollections from '../Components/NewCollections/NewCollections';
import NewsLetter from '../Components/NewsLetter/NewsLetter';
import Offers from '../Components/Offers/Offers';
import Popular from '../Components/Popular/Popular'; // Import default export

const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers/>
      <NewCollections/>
      <NewsLetter/>

      <Popular category="Womens" />
    </div>
  );
};

export default Shop;
