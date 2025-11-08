// frontend/src/lib/api.js

// Base URL for your REST API
export const API_URL =
  import.meta.env.VITE_API_URL ||                 // optional override via .env
  `${window.location.origin.replace(/\/$/, '')}/api`; // default: same host, /api

// (Only if you added Socket.IO realtime)
export const WS_URL =
  import.meta.env.VITE_WS_URL ||                  // optional override via .env
  window.location.origin.replace(/\/$/, '');      // default: same host
