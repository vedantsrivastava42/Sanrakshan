import React, { useState } from "react";
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import './Loginpopup.css';
import logo from '../../assets/logo.png';

const Loginpopup = ({ toggleDialog, isOpen }) => {
  const { login } = useAuth();
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const url = `http://localhost:4000/api/users/${isSignup ? 'signup' : 'login'}`;
    
    try {
      let response;
      
      if (isSignup) {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('role', formData.role);
        
        response = await axios.post(url, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        response = await axios.post(url, {
          email: formData.email,
          password: formData.password,
        });
      }
      
      console.log('Success:', response.data);
      
      // Store user data and token
      const userData = {
        userId: response.data.userId,
        email: response.data.email,
        role: response.data.role,
      };
      
      login(userData, response.data.token);
      toggleDialog(); // Close the dialog
      
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const handleClose = () => {
    toggleDialog();
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="signup-dialog">
        <div className="close-btn-container">
          <button className="close-btn" onClick={handleClose}>&times;</button>
        </div>
        <img src={logo} alt="Logo" className="logo" />
        
        <h2>{isSignup ? 'Signup Now': 'Login Now'}</h2>
        
        {error && <div className="error-message" style={{color: 'red', margin: '10px 0'}}>{error}</div>}
        
        <div className="toggle-container">
          <button
            className={`toggle-btn ${isSignup ? 'active' : ''}`}
            onClick={() => setIsSignup(true)}
          >
            Sign Up
          </button>
          <button
            className={`toggle-btn ${!isSignup ? 'active' : ''}`}
            onClick={() => setIsSignup(false)}
          >
            Log In
          </button>
        </div>
        
        {isSignup ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <select
              name="role"
              className="dropdown"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="user">Regular User</option>
              <option value="clerical-staff">Clerical Staff</option>
              <option value="technical-assistant">Technical Assistant</option>
              <option value="fire-safety-inspector">Fire Safety Inspector</option>
              <option value="assistant-divisional-fire-officer">Assistant Divisional Fire Officer</option>
              <option value="station-fire-officer">Station Fire Officer</option>
              <option value="divisional-fire-officer">Divisional Fire Officer</option>
              <option value="deputy-chief-fire-officer">Deputy Chief Fire Officer</option>
              <option value="chief-fire-officer">Chief Fire Officer</option>
            </select>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button className="sub" type="submit" disabled={loading}>
              {loading ? 'Please wait...' : 'Sign Up'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button className="sub" type="submit" disabled={loading}>
              {loading ? 'Please wait...' : 'Log In'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Loginpopup;