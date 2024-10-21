import React from 'react';
import './signup.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Navbar from '../../components/Navbar/navbar.js';
import axios from 'axios';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');

    const navigate = useNavigate(); // Initialize navigate
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            name,
            email,
            password,
            contact,
        };
        console.log('User Data:', userData); // Check the data before sending
        try {
            const response = await axios.post('http://localhost:2525/api/signup', userData);
            navigate('/home');
        } catch (error) {
            alert('Error: ' + error.response.data);
        }
    };

    return (
        <form className='signup' onSubmit={handleSubmit}>
            <Navbar />
            <div className='signup-navbelow'>
                <div className='signup-container'>
                    <div className='signup-heading'>SignUp</div>
                    <div className='signup-form'>
                        <div className='suf name'>
                            <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} required/>
                        </div>
                        <div className='suf email'>
                            <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        <div className='suf password'>
                            <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                        <div className='suf confirm-password'>
                            <input type='password' placeholder='Confirm Password' />
                        </div>
                        <div className='suf contact'>
                            <input type='number' placeholder='Contact number' onChange={(e) => setContact(e.target.value)} required/>
                        </div>
                    </div>
                <button type='submit' className='signup-button'>SignUp</button>
                </div>
            </div>
        </form>
    );
}

export default Signup;