// src/config.js
// Unified API base: dev -> localhost:5001, prod/preview -> '/api'
export const API_BASE = (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
  ? 'http://localhost:5001'
  : '/api';
