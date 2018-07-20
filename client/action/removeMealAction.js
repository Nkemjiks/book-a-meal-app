import { REMOVE_MEAL_SUCCESS, REMOVE_MEAL_FAILURE } from '../actionTypes';
import axios from '../helpers/axios';
import displayToast from '../helpers/displayToast';

/**
* @param {Object} mealId - meal id
* @param {Function} action - action to get meals
*
* @returns {Promise}  - dispatches action with true or false
*/
const removeMealAction = mealId => dispatch => axios.put(`/menu/${mealId}`)
  .then(() => {
    dispatch({
      type: REMOVE_MEAL_SUCCESS,
      payload: true,
    });
    displayToast('success', 'Meal removed Successfully');
  })
  .catch((err) => {
    dispatch({
      type: REMOVE_MEAL_FAILURE,
      payload: false,
    });
    displayToast('error', err.response.data.message);
  });

export default removeMealAction;
