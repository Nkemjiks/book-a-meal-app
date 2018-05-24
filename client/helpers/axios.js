import axios from 'axios';

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
