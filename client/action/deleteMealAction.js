import { DELETE_MEAL_SUCCESS, DELETE_MEAL_FAILURE } from '../actionTypes';
import apiCall from '../helpers/axios';
import getToken from '../helpers/getToken';
import displayToast from '../helpers/displayToast';

/**
* @param {Object} mealId - meal id
* @param {Function} action - action to get meals
*
* @returns {Promise}  - dispatches action with true or false
*/
const deleteMealAction = (mealId, action) => (dispatch) => {
  apiCall(`/meals/${mealId}`, 'delete', null, getToken())
    .then(() => {
      dispatch({
        type: DELETE_MEAL_SUCCESS,
        payload: true,
      });
      action();
      displayToast('success', 'Meal Deleted Successfully');
    })
    .catch((err) => {
      dispatch({
        type: DELETE_MEAL_FAILURE,
        payload: false,
      });
      displayToast('error', err.response.data.message);
    });
};

export default deleteMealAction;
