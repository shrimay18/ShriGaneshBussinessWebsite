import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import Navbar from '../Navbar/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './cart.css';

function Cart() {
    const { cart, updateCart } = useContext(CartContext); // Destructure updateCart from context

    const handleCartPlus = (item) => {
        updateCart(item, item.quantity + 1); // Increase the quantity
    };

    const handleCartMinus = (item) => {
        updateCart(item, item.quantity - 1); // Decrease quantity, will remove if 0
    };

    return (
        <div className='cart-page'>
            <Navbar isLoggedIn={true} />
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className='cart-items'>
                    {cart.map(item => (
                        <div key={item.id} className='cart-item'>
                            <img src={item.image} alt='product' />
                            <div>{item.name}</div>
                            <div>
                                Quantity: 
                                <FontAwesomeIcon 
                                    icon={faMinus} 
                                    onClick={() => handleCartMinus(item)} // Pass item to handleCartMinus
                                /> 
                                {item.quantity}
                                <FontAwesomeIcon 
                                    icon={faPlus} 
                                    onClick={() => handleCartPlus(item)} // Pass item to handleCartPlus
                                />
                            </div>
                            <div>Price: ₹{item.price * item.quantity}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Cart;
