// CustomerModal.js
import React, { useState } from 'react';
import './customerModal.css';

function CustomerModal({ onClose, onAddCustomer }) {
    const [serialNumber, setSerialNumber] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');

    const handleAddCustomer = () => {
        const newCustomer = {
            serialNumber,
            name,
            email,
            mobile
        };
        onAddCustomer(newCustomer); // Pass customer data back to parent component
        onClose(); // Close the modal
    };

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <h2>Add Customer</h2>
                <input
                    type='text'
                    placeholder='Serial Number'
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Mobile Number'
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                />
                <div className='modal-buttons'>
                    <button onClick={handleAddCustomer}>Add Customer</button>
                    <button onClick={onClose} className='close-button-modal'>Close</button>
                </div>
            </div>
        </div>
    );
}

export default CustomerModal;
