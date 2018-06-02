import apiCall from '../helpers/axios';

const getMealsRequest = (userToken, action) => apiCall('/meals', 'get', null, userToken)
  .then((response) => {
    action(response.data.data, true);
  })
  .catch((err) => {
    action(err.response.data.message, false);
  });

export default getMealsRequest;
