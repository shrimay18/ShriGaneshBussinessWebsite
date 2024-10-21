import React from 'react';
import './login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar.js';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
    
            if(response.ok){
                if(data.success){
                    // Handle successful login (e.g., save token, navigate)
                    navigate('/products');
                } else {
                    setError(data.message); // Show error message from the backend
                }
            } else {
                setError('Something went wrong. Please try again');
            }
        } catch (error) {
            setError('Failed to connect to server. Please try again');
        }
    }
    
    return(
        <form className='login' onSubmit={handleLoginSubmit}>
            <Navbar />
            <div className='login-navbelow'>
                <div className='login-container'>
                    <div className='login-heading'>LogIn</div>
                    <div className='login-form'>
                        <div className='luf email'>
                            <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        <div className='luf password'>
                            <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                    </div>
                <button type='submit' className='login-button'>Login</button>
                </div>
            </div>
            {error && <div className='login-error'>{error}</div>}
        </form>
    )
}

export default Login;