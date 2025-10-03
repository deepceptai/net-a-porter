// services/authService.js
import ApiService from './api';

class AuthService {
  // User signup
  async signup(userData) {
    const data = await ApiService.post('/api/users/signup', userData);
    
    if (data.token) {
      ApiService.setToken(data.token);
    }
    
    return data;
  }

  // User login - accept either credentials object or separate email/password
  async login(emailOrCredentials, password) {
    let credentials;
    
    if (typeof emailOrCredentials === 'string') {
      // Called with separate email and password
      credentials = {
        email: emailOrCredentials,
        password: password
      };
    } else {
      // Called with credentials object
      credentials = emailOrCredentials;
    }
    
    const data = await ApiService.post('/api/users/login', credentials);
    
    if (data.token) {
      ApiService.setToken(data.token);
    }
    
    return data;
  }

  // Get user profile
  async getProfile() {
    
    const response= await ApiService.get('/api/users/profile');
    console.log(response);
    return response;
  }

  // Logout
  logout() {
    ApiService.removeToken();
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!ApiService.getToken();
  }

  // Get current token
  getToken() {
    return ApiService.getToken();
  }
}

export default new AuthService();