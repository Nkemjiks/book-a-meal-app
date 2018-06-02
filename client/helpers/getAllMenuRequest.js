import apiCall from '../helpers/axios';

const getAllMenuRequest = (userToken, action) => apiCall('/menu/customer', 'get', null, userToken)
  .then((response) => {
    action(response.data.data, true);
  })
  .catch((err) => {
    action(err.response.data.message, false);
  });

export default getAllMenuRequest;
