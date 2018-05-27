import apiCall from '../helpers/axios';
import displayToast from '../helpers/displayToast';

const getMealsRequest = (userToken, action) => {
  return apiCall('/meals', 'get', null, userToken)
    .then((response) => {
      window.localStorage.setItem('meals', JSON.stringify(response.data.data));
      action(response.data.data, true);
    })
    .catch((err) => {
      if (err.response.data.message === 'You have not added any meal') {
        window.localStorage.removeItem('meals');
      }
      action(err.response.data.message, false);
      return displayToast('error', err.response.data.message);
    });
};

export default getMealsRequest;
