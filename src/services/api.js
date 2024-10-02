import axios from 'axios';

const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';
const CACHE_DURATION = 5 * 60 * 1000;

export const fetchKanbanData = async () => {
  const now = Date.now();
  const cached = localStorage.getItem('kanbanData');
  const cachedTime = localStorage.getItem('kanbanFetchTime');

  // Check if cached data exists and is still valid
  if (cached && cachedTime && (now - cachedTime < CACHE_DURATION)) {
    return JSON.parse(cached);
  }

  try {
    const response = await axios.get(API_URL);
    const data = response.data;

    // Cache the data in local storage
    localStorage.setItem('kanbanData', JSON.stringify(data));
    localStorage.setItem('kanbanFetchTime', now);

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    return null;
  }
};

