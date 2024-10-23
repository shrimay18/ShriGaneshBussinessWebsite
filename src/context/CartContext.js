import React, { createContext, useState } from 'react';

// Create Cart Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const updateCart = (product, quantity) => {
        const existingProduct = cart.find(item => item.id === product.id);
    
        if (existingProduct) {
            if (quantity > 0) {
                setCart(
                    cart.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: quantity }
                            : item
                    )
                );
            } else {
                // Remove the product if quantity is zero
                setCart(cart.filter(item => item.id !== product.id));
            }
        } else {
            if (quantity > 0) {
                setCart([...cart, { ...product, quantity }]);
            }
        }
    };
    
    return (
        <CartContext.Provider value={{ cart, updateCart }}>
            {children}
        </CartContext.Provider>
    );
};
