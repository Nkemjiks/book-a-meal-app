import { DELETE_MEAL_SUCCESS, DELETE_MEAL_FAILURE } from '../actionTypes';
import axios, { config } from '../helpers/axios';
import displayToast from '../helpers/displayToast';

/**
* @param {Object} mealId - meal id
* @param {Function} action - action to get meals
*
* @returns {Promise}  - dispatches action with true or false
*/
const deleteMealAction = mealId => dispatch => axios.delete(`/meals/${mealId}`, config)
  .then(() => {
    dispatch({
      type: DELETE_MEAL_SUCCESS,
      payload: true,
    });
    displayToast('success', 'Meal Deleted Successfully');
  })
  .catch((err) => {
    dispatch({
      type: DELETE_MEAL_FAILURE,
      payload: false,
    });
    displayToast('error', err.response.data.message);
  });

export default deleteMealAction;
