// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
export const CARS_API_URL = `${API_BASE_URL}/cars`;
export const TESTDRIVE_API_URL = `${API_BASE_URL}/test-drives`;
export const CONTACTMESSAGE_API_URL = `${API_BASE_URL}/contact-messages`;
export const BRANDS_API_URL = `${API_BASE_URL}/brands`;
export const USERS_API_URL = `${API_BASE_URL}/users`;
export const AUTH_API_URL = `${API_BASE_URL}/auth`;

// Other configurations
export const APP_NAME = "Used Car Marketplace";
export const APP_VERSION = "1.0.0";
export const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5MB
export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default {
  API_BASE_URL,
  CARS_API_URL,
  CONTACTMESSAGE_API_URL,
  TESTDRIVE_API_URL,
  BRANDS_API_URL,
  USERS_API_URL,
  AUTH_API_URL,
  APP_NAME,
  APP_VERSION,
  MAX_UPLOAD_SIZE,
  SUPPORTED_IMAGE_TYPES
};