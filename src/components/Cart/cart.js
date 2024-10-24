import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import Navbar from '../Navbar/navbar';
import './cart.css';

function Cart() {
    const { cart } = useContext(CartContext);

    return (
        <div className='cart-page'>
            <Navbar isLoggedIn={true}/>
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className='cart-items'>
                    {cart.map(item => (
                        <div key={item.id} className='cart-item'>
                            <img src={item.image} alt='product' />
                            <div>{item.name}</div>
                            <div>Quantity: {item.quantity}</div>
                            <div>Price: ₹{item.price * item.quantity}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Cart;
