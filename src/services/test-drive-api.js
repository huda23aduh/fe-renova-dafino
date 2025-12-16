
import config from '../config/config.js';

const TESTDRIVE_API_URL = config.TESTDRIVE_API_URL;

export const api = {
  testDrives: {
    getAll: async () => {
      const response = await fetch(`${TESTDRIVE_API_URL}`);
      if (!response.ok) throw new Error('Failed to fetch TEST DRIVE');
      return response.json();
    },

    getById: async (id) => {
      const response = await fetch(`${TESTDRIVE_API_URL}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch TEST DRIVE');
      return response.json();
    },

    create: async (userData) => {
      const response = await fetch(`${TESTDRIVE_API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error('Failed to create TEST DRIVE');
      return response.json();
    },

    update: async (id, userData) => {
      const response = await fetch(`${TESTDRIVE_API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error('Failed to update TEST DRIVE');
      return response.json();
    },

    delete: async (id) => {
      const response = await fetch(`${TESTDRIVE_API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete TEST DRIVE');
      return response.json();
    },
  }
};