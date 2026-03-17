// api.js - API client for frontend
const API_BASE_URL = 'http://localhost:8000';

export const api = {
  // Get current readings
  async getCurrentReadings(city) {
    const response = await fetch(`${API_BASE_URL}/readings/current/${city}`);
    return response.json();
  },
  
  // Get forecast
  async getForecast(city, hours = 24) {
    const response = await fetch(`${API_BASE_URL}/forecasts/${city}?hours=${hours}`);
    return response.json();
  },
  
  // Get active alerts
  async getActiveAlerts(city) {
    const url = city 
      ? `${API_BASE_URL}/alerts/active?city=${city}`
      : `${API_BASE_URL}/alerts/active`;
    const response = await fetch(url);
    return response.json();
  },
  
  // Get health advisory
  async getHealthAdvisory(city, token) {
    const response = await fetch(`${API_BASE_URL}/health/advisory/${city}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  },
  
  // Login
  async login(email, password) {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    
    const response = await fetch(`${API_BASE_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData
    });
    return response.json();
  },
  
  // Register
  async register(email, password, fullName) {
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);
    if (fullName) params.append('full_name', fullName);
    
    const response = await fetch(`${API_BASE_URL}/auth/register?${params}`);
    return response.json();
  }
};
