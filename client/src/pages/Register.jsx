// ============================================
// FILE: src/pages/Register.jsx
// Registration Component
// ============================================

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import './Register.css';

const Register = ({ setUser }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    title: '',
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: {
      day: '',
      month: '',
      year: ''
    },
    subscribeNewsletter: true
  });

  const [passwordValidation, setPasswordValidation] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasNumber: false
  });

  const titles = ['Mr', 'Mrs', 'Ms', 'Miss', 'Mx', 'Dr'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name.startsWith('dob-')) {
      const dobField = name.split('-')[1];
      setFormData(prev => ({
        ...prev,
        dateOfBirth: { ...prev.dateOfBirth, [dobField]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Password validation
    if (name === 'password') {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    setPasswordValidation({
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password)
    });
  };

  const isPasswordValid = () => {
    return passwordValidation.hasMinLength && 
           passwordValidation.hasUpperCase && 
           passwordValidation.hasNumber;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  try {
    const newUser = await AuthService.signup(formData); // ✅ use formData
    setUser(newUser.user); // ✅ update global user
    navigate("/");
  } catch (err) {
    setError(err.message || "Registration failed. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="register-page mt-5 pt-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="register-container">
              <h1 className="register-title mt-5">Register</h1>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="register-form">
                {/* Email Field */}
                <div className="form-group mb-4">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control register-input"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Password Field */}
                <div className="form-group mb-2">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      className="form-control register-input"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="password-requirements mb-4">
                  <p className="requirements-text">
                    Your password must be eight characters or more and contain both an uppercase letter and a number
                  </p>
                </div>

                {/* Title and First Name Row */}
                <div className="row mb-4">
                  <div className="col-12 col-sm-4">
                    <div className="form-group">
                      <label htmlFor="title" className="form-label">
                        Title
                      </label>
                      <select
                        id="title"
                        name="title"
                        className="form-select register-select"
                        value={formData.title}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      >
                        <option value=""></option>
                        {titles.map(title => (
                          <option key={title} value={title}>
                            {title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-sm-8">
                    <div className="form-group">
                      <label htmlFor="firstName" className="form-label">
                        First name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="form-control register-input"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                {/* Last Name Field */}
                <div className="form-group mb-4">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control register-input"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Phone Field (Optional) */}
                <div className="form-group mb-4">
                  <label htmlFor="phone" className="form-label">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control register-input"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>

                {/* Date of Birth */}
                <div className="form-group mb-4">
                  <label className="form-label">Date of birth (optional)</label>
                  <div className="row g-2">
                    <div className="col-4">
                      <input
                        type="text"
                        name="dob-day"
                        className="form-control register-input"
                        placeholder="DD"
                        maxLength="2"
                        value={formData.dateOfBirth.day}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="col-4">
                      <input
                        type="text"
                        name="dob-month"
                        className="form-control register-input"
                        placeholder="MM"
                        maxLength="2"
                        value={formData.dateOfBirth.month}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="col-4">
                      <input
                        type="text"
                        name="dob-year"
                        className="form-control register-input"
                        placeholder="YYYY"
                        maxLength="4"
                        value={formData.dateOfBirth.year}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                {/* Newsletter Checkbox */}
                <div className="form-group mb-4">
                  <div className="newsletter-checkbox">
                    <input
                      type="checkbox"
                      id="subscribeNewsletter"
                      name="subscribeNewsletter"
                      className="form-check-input newsletter-check"
                      checked={formData.subscribeNewsletter}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                    <label htmlFor="subscribeNewsletter" className="newsletter-label">
                      Sign up to receive exclusive NET-A-PORTER and other LuxExperience B.V. brands content, plus 10% off your next order on NET-A-PORTER. T&Cs and exclusions apply.
                      <br />
                      <Link to="/newsletter-info" className="newsletter-link">
                        What will I receive?
                      </Link>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn register-submit-btn"
                  disabled={isLoading || !isPasswordValid()}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>

                {/* Login Link */}
                <div className="login-link-container">
                  <p className="login-text">
                    Already have an account?{' '}
                    <Link to="/login" className="login-link">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;