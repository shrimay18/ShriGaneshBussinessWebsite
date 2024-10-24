import React from 'react';
import './product.css';
import Navbar from '../../components/Navbar/navbar';
import { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard/productCard';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';


function Product() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const getToCart = () => {
        navigate('/cart');
    }

    useEffect(() => {
        fetch('/products.json')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            });
    }, []);
    console.log(products);
    const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(search.toLowerCase());
    })

    return (
        <div className='product-page'>
            <Navbar isLoggedIn={true}/>
            <div className='product-container'>
                <div className='product-search'>
                    <input type='text' placeholder='Search for products' value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                    <button className='add-to-cart-button' onClick={getToCart} >Your Cart 
                        <FontAwesomeIcon icon={faCartShopping} />
                    </button>
                </div>
                <div className='product-list'>
                    {filteredProducts.map((product) => {
                        return <ProductCard key={product.id} product={product} />;
                    })}
                </div>
            </div>
        </div>
    )
}

export default Product;