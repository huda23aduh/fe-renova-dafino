
import config from '../config/config.js';

const USERS_API_URL = config.USERS_API_URL;


export const api = {
  // Users API
  users: {
    getAll: async () => {
      const response = await fetch(`${USERS_API_URL}`);
      if (!response.ok) throw new Error('Failed to fetch users');
      return response.json();
    },

    getById: async (id) => {
      const response = await fetch(`${USERS_API_URL}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch user');
      return response.json();
    },

    create: async (userData) => {
      const response = await fetch(`${USERS_API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error('Failed to create user');
      return response.json();
    },

    update: async (id, userData) => {
      const response = await fetch(`${USERS_API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error('Failed to update user');
      return response.json();
    },

    delete: async (id) => {
      const response = await fetch(`${USERS_API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete user');
      return response.json();
    },

    getStats: async () => {
      const response = await fetch(`${USERS_API_URL}/stats`);
      if (!response.ok) throw new Error('Failed to fetch user stats');
      return response.json();
    }
  }
};