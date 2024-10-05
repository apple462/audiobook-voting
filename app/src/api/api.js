import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

// Register user
export const registerUser = (userData) => {
  return axios.post(`${API_BASE_URL}/register`, userData);
};

// Login user
export const loginUser = (loginData) => {
  return axios.post(`${API_BASE_URL}/login`, loginData);
};

// Fetch all audiobooks
export const fetchAudiobooks = (token) => {
  return axios.get(`${API_BASE_URL}/audiobooks`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Vote for an audiobook
export const voteAudiobook = (audiobookId, token) => {
  return axios.post(`${API_BASE_URL}/vote/${audiobookId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Fetch audiobook user voted for
export const fetchVotedAudiobook = (token) => {
  return axios.get(`${API_BASE_URL}/voted_audiobook`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};