import axios from 'axios';

const BASE_URL = "https://yt-api.p.rapidapi.com";
const API_KEYS = [
  process.env.REACT_APP_YOUTUBE_API_KEY_1,
  process.env.REACT_APP_YOUTUBE_API_KEY_2,
  process.env.REACT_APP_YOUTUBE_API_KEY_3,
  process.env.REACT_APP_YOUTUBE_API_KEY_4,
  process.env.REACT_APP_YOUTUBE_API_KEY_5,
];
let currentKeyIndex = 0;

const getApiKey = () => {
  const apiKey = API_KEYS[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
  return apiKey;
};

const fetchFromAPI = async (url) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": getApiKey(),
      "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
    },
  };

  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      // API limit reached, try next key
      options.headers['X-RapidAPI-Key'] = getApiKey();
      const { data } = await axios.get(`${BASE_URL}/${url}`, options);
      return data;
    } else {
      // Handle other errors
      throw error;
    }
  }
};

export default fetchFromAPI;
