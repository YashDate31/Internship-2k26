// Centralised API base URL - reads from environment in production, falls back to localhost in dev
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
