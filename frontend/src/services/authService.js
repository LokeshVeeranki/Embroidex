import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

export const signupAPI = async (data) => {
    const response = await axios.post(`${BASE_URL}/signup/`, data);
    return response.data;
};

export const loginAPI = async (data) => {
    const response = await axios.post(`${BASE_URL}/login/`, data);
    return response.data;
};