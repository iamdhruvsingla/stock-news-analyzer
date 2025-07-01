import axios from 'axios';

// Change to your backend URL if running elsewhere
const API_BASE = "http://localhost:8000";

export const fetchNews = async () => {
  const res = await axios.get(`${API_BASE}/news`);
  return res.data.news;
};

export const fetchSentiment = async () => {
  const res = await axios.get(`${API_BASE}/sentiment`);
  return res.data.sentiments;
};

export const fetchStock = async (ticker) => {
  const res = await axios.get(`${API_BASE}/stock/${ticker}`);
  return res.data;
};
