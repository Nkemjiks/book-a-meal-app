import apiCall from '../helpers/axios';
import getToken from '../helpers/getToken';

/**
 * @description make an api call to refresh
 * token is user logs in consistently or log user out due to inactivity
 *
 * @param {Array} history - browser history
 */
const refreshTokenRequest = history => apiCall('/auth/token', 'post', null, getToken())
  .then((response) => {
    window.localStorage.setItem('@#$token', response.data.token);
  })
  .catch((err) => {
    if (err.response.data.message === 'Invalid Token') {
      window.localStorage.removeItem('@#$user');
      window.localStorage.removeItem('@#$token');
      history.push('/login');
    }
  });

export default refreshTokenRequest;
