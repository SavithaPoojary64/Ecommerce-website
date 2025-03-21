import React, { useState } from 'react';
import upload_area from '../../assets/upload_area.svg';
import './AddProduct.css';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('women');
    const [newPrice, setNewPrice] = useState('');
    const [oldPrice, setOldPrice] = useState('');

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'name') setProductName(value);
        else if (name === 'category') setProductCategory(value);
        else if (name === 'new_price') setNewPrice(value);
        else if (name === 'old_price') setOldPrice(value);
    };

    const Add_Product = async () => {
        if (!image) {
            alert('Please select an image.');
            return;
        }

        const formData = new FormData();
        formData.append('productImage', image);

        try {
            // Upload image
            const response = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            // Add product with image URL
            const productDetails = {
                name: productName,
                image: `http://localhost:4000${data.image_url}`,
                category: productCategory,
                new_price: newPrice,
                old_price: oldPrice,
            };

            const productResponse = await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productDetails),
            });

            const productData = await productResponse.json();
            if (productResponse.ok) {
                alert('Product Added Successfully');
                // Clear form or reset state here if needed
                setImage(null);
                setProductName('');
                setProductCategory('women');
                setNewPrice('');
                setOldPrice('');
            } else {
                alert('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Internal Server Error');
        }
    };

    return (
        <div className='add-product'>
            <div className='addproduct-itemfield'>
                <p>Product title</p>
                <input value={productName} onChange={changeHandler} type='text' name='name' placeholder='Type here' />
            </div>
            <div className='addproduct-price'>
                <div className='addproduct-itemfield'>
                    <p>Price</p>
                    <input value={oldPrice} onChange={changeHandler} type='text' name='old_price' placeholder='Type here' />
                </div>
                <div className='addproduct-itemfield'>
                    <p>Offer Price</p>
                    <input value={newPrice} onChange={changeHandler} type='text' name='new_price' placeholder='Type here' />
                </div>
            </div>
            <div className='addproduct-itemfield'>
                <p>Product Category</p>
                <select value={productCategory} onChange={changeHandler} name='category' className='add-product-selector'>
                    <option value='women'>Women</option>
                    <option value='men'>Men</option>
                    <option value='kid'>Kid</option>
                </select>
            </div>
            <div className='addproduct-itemfield'>
                <label htmlFor='file-input'>
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' alt='Upload Area' />
                </label>
                <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
            </div>
            <button onClick={Add_Product} className='addproduct-btn'>
                ADD
            </button>
        </div>
    );
};

export default AddProduct;
