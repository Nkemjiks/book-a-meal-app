import apiCall from '../helpers/axios';

const getMenuRequest = (userToken, action) => apiCall('/menu/caterer', 'get', null, userToken)
  .then((response) => {
    action(response.data.data, true);
  })
  .catch((err) => {
    action(err.response.data.message, false);
  });

export default getMenuRequest;
