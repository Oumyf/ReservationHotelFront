// src/services/hotelService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; 

export const fetchHotelById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/hotels/${id}`);
    return response.data;
  } catch (error) {
    throw error; 
  }
};
