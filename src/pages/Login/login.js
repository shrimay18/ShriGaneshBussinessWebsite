import React, { useEffect, useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar.js';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Check if the user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('token'); // Or any flag like 'isLoggedIn'
        if (token) {
            navigate('/products'); // Redirect to products if already logged in
        }
    }, [navigate]);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:2525/api/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (response.ok && data.success) {
                // Save token to localStorage
                localStorage.setItem('token', data.token); // Replace 'data.token' with whatever token or flag you receive
                navigate('/products'); // Redirect to products page after login
            } else {
                setError(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            setError('Failed to connect to server. Please try again');
        }
    };
    
    return (
        <form className='login' onSubmit={handleLoginSubmit}>
            <Navbar />
            <div className='login-navbelow'>
                <div className='login-container'>
                    <div className='login-heading'>LogIn</div>
                    <div className='login-form'>
                        <div className='luf email'>
                            <input 
                                type='email' 
                                placeholder='Email' 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className='luf password'>
                            <input 
                                type='password' 
                                placeholder='Password' 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>
                    <button type='submit' className='login-button'>Login</button>
                </div>
            </div>
            {error && <div className='login-error'>{error}</div>}
        </form>
    );
}

export default Login;
