import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from '../context/Axios';
import axios from 'axios';

const API_URL = 'http://192.168.0.100:3000';

// Register user
export const register = async (data: {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
}) => {
  const response = await axios.post(`${API_URL}/register`, data, { withCredentials: true });
  await AsyncStorage.setItem('accessToken', response.data.accessToken);
  return response.data.user;
};

// Login user
export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data, { withCredentials: true });
    //return response.data.user;
    await AsyncStorage.setItem('accessToken', response.data.accessToken);
    return response.data.user;
  } catch (error: any) {
    console.warn(error);
    return null;
  }
};

// Get Impact Tokens
export const getTokens = async () => {
  const response = await instance.get('/tokens');
  return response.data;
};
