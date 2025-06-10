import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/auth',
});

export const registerUser = async (userData) => {
    const response = await API.post('register/', userData);
    return response.data;
};
