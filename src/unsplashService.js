// src/unsplashService.js

import axios from 'axios';

const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

const unsplashApi = axios.create({
    baseURL: 'https://api.unsplash.com/',
    headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
    }
});

export const getRandomImage = async (query) => {
    try {
        const response = await unsplashApi.get('/photos/random', {
            params: { query }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching image from Unsplash:', error);
        throw error;
    }
};
