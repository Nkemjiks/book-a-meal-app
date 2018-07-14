import axios from './axios';

/**
 * @description make an api call to refresh
 * token is user logs in consistently or log user out due to inactivity
 *
 * @param {Array} history - browser history
 */

const refreshTokenRequest = history => axios.post('/auth/token')
  .then((response) => {
    /* istanbul ignore next */
    window.localStorage.setItem('@#$token', response.data.token);
  })
  .catch((err) => {
    /* istanbul ignore next */
    if (err.response.data.message === 'Invalid Token') {
      window.localStorage.removeItem('@#$user');
      window.localStorage.removeItem('@#$token');
      history.push('/login');
    }
  });

export default refreshTokenRequest;
