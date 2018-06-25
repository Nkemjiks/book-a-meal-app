import axios from 'axios';
import getToken from './getToken';

/**
 * @description make api calls with axios
 *
 * @param {String} url - server route
 * @param {String} method - HTTP method
 * @param {Object} requestBody - request content
 * @param {String} token - user token
 *
 * @returns {Function} - a function that makes the api call
 */

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:8080';
  axios.interceptors.request.use(
    (config) => {
      if (config.baseURL && (config.url !== 'https://api.cloudinary.com/v1_1/dqsmurjpg/image/upload')) {
        const token = getToken();
        if (token) {
          config.headers.Authorization = token;
        }
      }
      return config;
    },
    error => Promise.reject(error),
  );
}

export default axios;
