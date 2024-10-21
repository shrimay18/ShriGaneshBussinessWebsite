import './App.css';
import Login from './pages/Login/login.js';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import Signup from './pages/Signup/signup.js';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
