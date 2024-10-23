import React, { useContext } from 'react';
import './productCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/CartContext';

function ProductCard({ product }) {
    const { cart, updateCart } = useContext(CartContext); // Access cart and updateCart from context
    const cartItem = cart.find(item => item.id === product.id); // Find if the product is already in the cart
    const count = cartItem ? cartItem.quantity : 0; // Set the count based on cart

    const handleAdd = () => {
        updateCart(product, count + 1); // Update the cart with the new quantity
    };

    const handleRemove = () => {
        if (count > 0) {
            updateCart(product, count - 1); // Decrease quantity in the cart
        }
    };

    return (
        <div className='product-card'>
            <div className='product-image'>
                <img src={product.image} alt='product' />
            </div>
            <div className='product-info'>
                <div className='product-name'>{product.name}</div>
                <div className='product-price'>₹{product.price}</div>
            </div>
            <div className='product-addToCart'>
                <FontAwesomeIcon 
                    icon={faMinus} 
                    onClick={handleRemove} 
                    className={count === 0 ? 'disabled' : ''}
                />
                <div className='product-count'>{count}</div>
                <FontAwesomeIcon 
                    icon={faPlus} 
                    onClick={handleAdd} 
                />
            </div>
        </div>
    );
}

export default ProductCard;
