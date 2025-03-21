import React from 'react'
import './DescriptionBox.css'
 const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className='descriptionbox-navigator'>
        <div className='descriptionbox-nav-box'>Description</div>
        <div className='descriptionbox-nav-box fade'>Reviews (122)</div>
        </div>
        <div className='descriptionbox-description'>
            <p>E-commerce, short for electronic commerce, refers to the buying and selling of goods or services using the internet. It has transformed the way businesses operate and how consumers shop, creating a dynamic and accessible global marketplace.</p>
            <p>E-commerce allows consumers to shop 24/7 from anywhere in the world. This convenience has revolutionized the retail experience, making it easier for people to find and purchase products without the constraints of traditional store hours or locations.</p>
        </div>
    </div>
  )
}
export default DescriptionBox