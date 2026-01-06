export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Helper to get the full API URL
 * In development: returns '/api/...' (proxied by Vite)
 * In production: returns 'https://backend.com/api/...' (direct)
 */
export const getApiUrl = (endpoint: string) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  // If we have a base URL, append /api/ and the endpoint
  if (API_BASE_URL) {
      return `${API_BASE_URL}/api/${cleanEndpoint}`;
  }
  
  // Otherwise (dev), just return /api/endpoint
  return `/api/${cleanEndpoint}`;
};
