import React, { useState , useEffect, useRef} from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar.js';
import axios from 'axios';

function Signup() {
    const [role, setRole] = useState('admin'); // Default to admin
    const [name, setName] = useState('');
    const [otp, setOtp] = useState('');
    const [otpRequested, setOtpRequested] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState('');
    const [error, setError] = useState('');
    const [showErrorNotification, setShowErrorNotification] = useState(false); // New state for error notification visibility
    const notificationRef = useRef(null);
    const navigate = useNavigate();

    // Handle role change
    const handleRoleChange = (e) => {
        setRole(e.target.value);
        setOtp('');
        setOtpRequested(false);
        setIsLoading(false);
        setNotification('');
        setError('');
        setShowErrorNotification(false); // Reset error notification visibility on role change
    };

    // Function to send OTP for admin signup
    const sendOtpToAdmin = async () => {
        setIsLoading(true); // Show loader while sending OTP
        try {
            await axios.post('http://localhost:2525/api/auth/send-otp-admin', { name });
            setOtpRequested(true);
            setNotification('OTP sent successfully!');
            setError('');
        } catch (error) {
            setNotification('Failed to send OTP. Please try again.');
        } finally {
            setIsLoading(false); // Hide loader after request completes
        }
    };

    // Handle OTP verification
    const verifyOtp = async () => {
        try {
            const verifyResponse = await axios.post('http://localhost:2525/api/auth/verify-otp-admin', { otp });
            if (verifyResponse.status === 200) {
                localStorage.setItem('token', verifyResponse.data.token);
                navigate('/customers');
            }
        } catch (error) {
            setError('OTP entered is incorrect.');
            setShowErrorNotification(true); // Show error notification on incorrect OTP
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (role === 'admin') {
            if (otpRequested) {
                verifyOtp(); // Call verifyOtp if OTP has already been requested
            } else {
                sendOtpToAdmin(); // Call sendOtpToAdmin if OTP has not been requested
            }
        }
    };

    // Handle clicks outside the notification to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowErrorNotification(false);
            }
        };

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        
        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <form className='signup' onSubmit={handleSubmit}>
            <Navbar />
            {/* Notification for incorrect OTP */}
            {showErrorNotification && (
                <div className='error-notification' ref={notificationRef}>
                    OTP is incorrect. Please check and try again.
                </div>
            )}
            <div className='signup-navbelow'>
                <div className='signup-container'>
                    <div className='signup-heading'>Sign Up</div>
                    <div className='signup-form'>
                        <select onChange={handleRoleChange} value={role} className="signup-role-selector">
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>

                        {role === 'admin' ? (
                            <>
                                <input
                                    className='signup-input'
                                    type='text'
                                    placeholder='Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </>
                        ) : (
                            <div className="coming-soon">Coming Soon</div>
                        )}
                    </div>

                    {/* OTP input field should appear above the button when requested */}
                    {otpRequested && (
                        <input
                            className='otp-input'
                            type='text'
                            placeholder='Enter OTP'
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    )}

                    <button type='submit' className='signup-button' disabled={isLoading}>
                        {isLoading ? 'Sending OTP...' : otpRequested ? 'Verify OTP' : 'Generate OTP'}
                    </button>
                </div>
            </div>

            {notification && <div className='notification'>{notification}</div>}
            {error && <div className='signup-error'>{error}</div>}
        </form>
    );
}

export default Signup;
