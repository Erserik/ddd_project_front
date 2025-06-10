import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

export const getPosts = async (token) => {
    const response = await API.get('/posts/', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
