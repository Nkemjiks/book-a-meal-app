import axios from 'axios';
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
const apiCall = (url, method, requestBody, token) => {
  let axiosInstance;
  if (token) {
    axiosInstance = axios.create({
      baseURL: 'http://localhost:8080/',
      headers: { Authorization: token },
    });
  } else {
    axiosInstance = axios.create({
      baseURL: 'http://localhost:8080/',
    });
  }
  if (method === 'post' || method === 'put') {
    return axiosInstance[method](url, requestBody);
  }

  return axiosInstance[method](url);
};

export default apiCall;
