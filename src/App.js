import './App.css';
import Login from './pages/Login/login.js';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Product from './pages/Product/product.js';
import Signup from './pages/Signup/signup.js';
import Cart from './components/Cart/cart.js';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <Router>
      <CartProvider>
        <div>
          <Routes>
            <Route path='/' element={<Signup/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/products' element={<Product/>} />
            <Route path='/cart' element={<Cart/>} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
