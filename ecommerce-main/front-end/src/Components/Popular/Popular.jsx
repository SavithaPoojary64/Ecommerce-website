import React from 'react';
import data_product from '../Assets/data'; // Ensure this path is correct
import Item from '../Item/Item'; // Import default export
import './Popular.css'; // Ensure this path is correct

const Popular = () => {
  return (
    <div className='popular'>
      <h1>POPULAR IN WOMENS</h1>
      <hr />
      <div className="popular-item">
        {data_product.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default Popular;
