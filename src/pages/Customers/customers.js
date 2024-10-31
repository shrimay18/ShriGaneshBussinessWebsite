// Customers.js
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/navbar';
import CustomerModal from '../../components/CustomerModal/customerModal';
import axios from 'axios';
import './customers.css';

function Customers() {
    const [customers, setCustomers] = useState([]); // State to hold customer list
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to fetch customers from the database
    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:2525/api/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    // Fetch customers on component mount
    useEffect(() => {
        fetchCustomers();
    }, []);

    // Function to add a new customer
    const addCustomer = async (customer) => {
        try {
            const response = await axios.post('http://localhost:2525/api/customers', customer);
            setCustomers([...customers, response.data]); // Update customer list
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    return (
        <div className='customers-page'>
            <Navbar isLoggedIn={true}/>
            <div className='customers-navbelow'>
                <div className='customers-component'>
                    <input type='text' placeholder='Search for customers'/>
                    <button className='add-customer-button' onClick={() => setIsModalOpen(true)}>
                        Add Customer
                    </button>
                </div>
                <div className='customers-container'>
                    {customers.map((customer, index) => (
                        <div key={index} className='customer-card'>
                            <p>Serial: {customer.serialNumber}</p>
                            <p>Name: {customer.name}</p>
                            <p>Email: {customer.email}</p>
                            <p>Mobile: {customer.mobile}</p>
                        </div>
                    ))}
                </div>
            </div>
            {isModalOpen && (
                <CustomerModal
                    onClose={() => setIsModalOpen(false)}
                    onAddCustomer={addCustomer}
                />
            )}
        </div>
    );
}

export default Customers;
