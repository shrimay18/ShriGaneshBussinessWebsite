import React from 'react';
import './login.css';
import Navbar from '../../components/Navbar/navbar.js';


function Login() {

    const handleLoginSubmit = (e) => {
        
    }

    return(
        <form className='login' onSubmit={handleLoginSubmit}>
            <Navbar />
            <div className='login-navbelow'>
                <div className='login-container'>
                    <div className='login-heading'>LogIn</div>
                    <div className='login-form'>
                        <div className='luf email'>
                            <input type='email' placeholder='Email' required/>
                        </div>
                        <div className='luf password'>
                            <input type='password' placeholder='Password' required/>
                        </div>
                    </div>
                <button type='submit' className='login-button'>Login</button>
                </div>
            </div>
        </form>
    )
}

export default Login;