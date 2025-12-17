
import config from '../config/config.js';

const CONTACTMESSAGE_API_URL = config.CONTACTMESSAGE_API_URL;

export const api = {
  contactMessages: {
    getAll: async () => {
      const response = await fetch(`${CONTACTMESSAGE_API_URL}`);
      if (!response.ok) throw new Error('Failed to fetch MESSAGE');
      return response.json();
    },

    getById: async (id) => {
      const response = await fetch(`${CONTACTMESSAGE_API_URL}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch MESSAGE');
      return response.json();
    },

    create: async (userData) => {
      const response = await fetch(`${CONTACTMESSAGE_API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error('Failed to create MESSAGE');
      return response.json();
    },

    update: async (id, userData) => {
      const response = await fetch(`${CONTACTMESSAGE_API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error('Failed to update MESSAGE');
      return response.json();
    },

    markRead(id) {
      return fetch(`${config.CONTACT_MESSAGE_API_URL}/${id}/read`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
        },
      }).then(res => res.json());
    },

    reply(id, message) {
      return fetch(`${config.CONTACT_MESSAGE_API_URL}/${id}/reply`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
        },
        body: JSON.stringify({ message }),
      }).then(res => res.json());
    },

    delete: async (id) => {
      const response = await fetch(`${CONTACTMESSAGE_API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete MESSAGE');
      return response.json();
    },
  }
};