import React, { createContext, useState, useEffect } from 'react';

// Create Cart Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Initialize cart from localStorage or as an empty array
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // Function to update the cart and save it to localStorage
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
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Store updated cart in localStorage
    };

    // On first load, sync the cart state with localStorage
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    return (
        <CartContext.Provider value={{ cart, updateCart }}>
            {children}
        </CartContext.Provider>
    );
};
