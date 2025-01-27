import axios from 'axios';

// Fetch all trends
export async function fetchAllTrends() {
  try {
    const response = await axios.get('http://localhost:4000/trends/all');
    console.log('All Trends:', response.data);
  } catch (error) {
    console.error('Error fetching all trends:', error);
  }
}

// Fetch a single trend by woeid
export async function fetchSingleTrend(woeid: number) {
  try {
    const response = await axios.get(`http://localhost:4000/trends/single/${woeid}`);
    console.log('Single Trend:', response.data);
  } catch (error) {
    console.error('Error fetching single trend:', error);
  }
}
