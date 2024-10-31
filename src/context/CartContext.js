import React, { createContext, useState, useEffect } from 'react';

// Create Cart Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    
    // Get user identifier from localStorage (this should match what you save in login)
    const userId = localStorage.getItem('userId');

    // Function to retrieve the cart for the current user
    const getUserCart = () => {
        const storedCart = localStorage.getItem(`cart_${userId}`);
        return storedCart ? JSON.parse(storedCart) : [];
    };

    useEffect(() => {
        if (userId) {
            setCart(getUserCart());
        }
    }, [userId]);

    const updateCart = (product, quantity) => {
        const existingProduct = cart.find(item => item.id === product.id);
        let updatedCart;

        if (existingProduct) {
            if (quantity > 0) {
                updatedCart = cart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: quantity }
                        : item
                );
            } else {
                // Remove the product if quantity is zero
                updatedCart = cart.filter(item => item.id !== product.id);
            }
        } else {
            if (quantity > 0) {
                updatedCart = [...cart, { ...product, quantity }];
            } else {
                updatedCart = cart;
            }
        }

        setCart(updatedCart);
        localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart)); // Store updated cart for the user
    };

    return (
        <CartContext.Provider value={{ cart, updateCart }}>
            {children}
        </CartContext.Provider>
    );
};
