import React, { useEffect, useState } from 'react';
import cross_icon from '../../assets/cross_icon.png';
import './ListProduct.css';

const ListProduct = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const fetchInfo = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:4000/allproduct');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setAllProducts(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setHasError(true);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const removeProduct = async (id) => {
        try {
            const response = await fetch('http://localhost:4000/removeproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }),
            });
            if (!response.ok) {
                throw new Error('Failed to remove product');
            }
            await fetchInfo();
        } catch (error) {
            console.error('Error removing product:', error);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (hasError) {
        return <p>Error fetching products. Please try again later.</p>;
    }

    return (
        <div className='list-product'>
            <h1>All Products List</h1>
            <div className='list-product-format-main'>
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className='listproduct-allproducts'>
                <hr />
                {allProducts.map((product, index) => (
                    <div key={index} className='listproduct-format-main listproduct-format-horizontal'>
                        <div className='listproduct-product'>
                            <img src={product.image} alt={product.name} className='listproduct-product-icon' onError={(e) => { e.target.src = '/path/to/placeholder-image.png' }} />
                            <p className='listproduct-product-name'>{product.name}</p>
                        </div>
                        <p className='listproduct-product-old_price'>{product.old_price}</p>
                        <p className='listproduct-product-new_price'>{product.new_price}</p>
                        <p className='listproduct-product-category'>{product.category}</p>
                        <img onClick={() => { removeProduct(product.id) }} className='listproduct-remove-icon' src={cross_icon} alt='Remove' />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListProduct;
