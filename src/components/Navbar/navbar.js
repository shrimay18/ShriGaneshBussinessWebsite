import React, { useEffect, useRef, useState } from 'react';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar({ isLoggedIn, handleLogout, userName }) {
    const [hamburger, setHamburger] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation(); // Hook to get the current location (route)

    const toggleHamburger = (event) => {
        event.stopPropagation();
        setHamburger(!hamburger);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setHamburger(false);
        }
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleSignup = () => {
        navigate('/');
    };

    useEffect(() => {
        if (hamburger) {
            window.addEventListener('click', handleClickOutside);
        }
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [hamburger]);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className='navText'>श्री गणेश</div>
            </div>
            <div className='navbar-right'>
                <div className='nav Home' onClick={() => navigate('/')}>Home</div>
                <div className='nav About' onClick={() => navigate('/about')}>About</div>
                <div className='nav Contact' onClick={() => navigate('/contact')}>Contact</div>
                <div className='nav Products' onClick={() => navigate('/products')}>Products</div>
                <div className='nav subscription' onClick={() => navigate('/subscription')}>Subscription</div>
                <div className='nav Login'>
                    {isLoggedIn ? (
                        <div>Logout</div>
                    ) : location.pathname === '/' ? (
                        <div onClick={handleLogin}>Login</div>
                    ) : location.pathname === '/login' ? (
                        <div onClick={handleSignup}>SignUp</div>
                    ) : (
                        <div onClick={handleLogin}>Login</div>
                    )}
                </div>
            </div>
            <div className='hamburger' onClick={toggleHamburger}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            {hamburger && (
                <div className='hamburger-menu' ref={menuRef}>
                    <div className='nav Home' onClick={() => navigate('/')}>Home</div>
                    <div className='nav About' onClick={() => navigate('/about')}>About</div>
                    <div className='nav Contact' onClick={() => navigate('/contact')}>Contact</div>
                    <div className='nav Products' onClick={() => navigate('/products')}>Products</div>
                    <div className='nav subscription' onClick={() => navigate('/subscription')}>Subscription</div>
                    <div className='nav Login'>
                        {isLoggedIn ? (
                            <div onClick={handleLogout}>Logout</div>
                        ) : location.pathname === '/signup' ? (
                            <div onClick={handleLogin}>Login</div>
                        ) : location.pathname === '/login' ? (
                            <div onClick={handleSignup}>SignUp</div>
                        ) : (
                            <div onClick={handleLogin}>Login</div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
