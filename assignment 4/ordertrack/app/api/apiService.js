import Constants from 'expo-constants';

// Load from .env via app.config.js or hardcode for development
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';
const API_KEY  = process.env.EXPO_PUBLIC_API_KEY  || 'dev-api-key-123';

class ApiService {
  headers = {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  };

  // ─── Token Registration ───────────────────────────────────────────────────

  async registerToken(pushToken) {
    const res = await fetch(`${BASE_URL}/api/tokens`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ pushToken, platform: 'expo' }),
    });
    return res.json();
  }

  // ─── Orders ───────────────────────────────────────────────────────────────

  async getOrders() {
    const res = await fetch(`${BASE_URL}/api/orders`, { headers: this.headers });
    return res.json();
  }

  async getOrder(orderId) {
    const res = await fetch(`${BASE_URL}/api/orders/${orderId}`, { headers: this.headers });
    return res.json();
  }

  async createOrder(orderData) {
    const res = await fetch(`${BASE_URL}/api/orders`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(orderData),
    });
    return res.json();
  }

  // ─── Admin: Update Status (triggers remote push) ──────────────────────────

  async updateOrderStatus(orderId, status) {
    const res = await fetch(`${BASE_URL}/api/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ status }),
    });
    return res.json();
  }

  // ─── Toggle notifications per order ──────────────────────────────────────

  async toggleOrderNotifications(orderId, enabled) {
    const res = await fetch(`${BASE_URL}/api/orders/${orderId}/notifications`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ notificationsEnabled: enabled }),
    });
    return res.json();
  }
}

export const apiService = new ApiService();
