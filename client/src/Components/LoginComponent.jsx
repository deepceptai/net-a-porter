import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import './LoginComponent.css';

const LoginComponent = ({ setUser }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Basic validation
  if (!formData.email || !formData.password) {
    setError('Please fill in all fields');
    return;
  }

  setIsLoading(true);
  setError('');

  try {
    const userData = await AuthService.login(formData.email, formData.password);
    
    if (userData && userData.user) {
      setUser(userData.user);
      
      // Remove this line - AuthService.setAuthToken doesn't exist
      // The token is already handled in AuthService.login via ApiService.setToken
      
      navigate('/');
    } else {
      setError('Invalid response from server');
    }
  } catch (err) {
    console.error('Login error:', err);
    setError(err.message || 'Login failed. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="login-page mt-5 pt-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="login-container">
              <h1 className="login-title mt-5">Sign In</h1>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="login-form">
                {/* Email Field */}
                <div className="form-group mb-4">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control login-input"
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
                      className="form-control login-input"
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

                {/* Forgot Password Link */}
                <div className="forgot-password-container mb-4">
                  <Link to="/forgot-password" className="forgot-password-link">
                    Forgot your password?
                  </Link>
                </div>

                {/* Remember Me Checkbox */}
                <div className="form-group mb-4">
                  <div className="remember-me-checkbox">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      className="form-check-input remember-me-check"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                    <label htmlFor="rememberMe" className="remember-me-label">
                      Remember me
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn login-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>

                {/* Register Link */}
                <div className="register-link-container">
                  <p className="register-text">
                    Don't have an account?{' '}
                    <Link to="/register" className="register-link">
                      Create account
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

export default LoginComponent;