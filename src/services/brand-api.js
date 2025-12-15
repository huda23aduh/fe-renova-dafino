
import config from '../config/config.js';

const BRANDS_API_URL = config.BRANDS_API_URL;

export const api = {
  brands: {
    getAll: async () => {
      const response = await fetch(`${BRANDS_API_URL}`);
      if (!response.ok) throw new Error('Failed to fetch brands');
      return response.json();
    },

    getById: async (id) => {
      const response = await fetch(`${BRANDS_API_URL}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch brand');
      return response.json();
    },

    create: async (userData) => {
      const response = await fetch(`${BRANDS_API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error('Failed to create brand');
      return response.json();
    },

    update: async (id, userData) => {
      const response = await fetch(`${BRANDS_API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error('Failed to update brand');
      return response.json();
    },

    delete: async (id) => {
      const response = await fetch(`${BRANDS_API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete brand');
      return response.json();
    },
  }
};