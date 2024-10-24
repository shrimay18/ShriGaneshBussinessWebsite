import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar.js';
import axios from 'axios';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { name, email, password, contact };
        
        try {
            const response = await axios.post('http://localhost:2525/api/signup', userData);
            
            // Handle successful signup and redirect to products or login page
            localStorage.setItem('token', response.data.token); // Save token if needed
            navigate('/products'); // Navigate to products page
        } catch (error) {
            setError(error.response?.data || 'Signup failed. Please try again.');
        }
    };

    return (
        <form className='signup' onSubmit={handleSubmit}>
            <Navbar />
            <div className='signup-navbelow'>
                <div className='signup-container'>
                    <div className='signup-heading'>SignUp</div>
                    <div className='signup-form'>
                        <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} required/>
                        <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/>
                        <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
                        <input type='number' placeholder='Contact number' onChange={(e) => setContact(e.target.value)} required/>
                    </div>
                    <button type='submit' className='signup-button'>SignUp</button>
                </div>
            </div>
            {error && <div className='signup-error'>{error}</div>}
        </form>
    );
}

export default Signup;
