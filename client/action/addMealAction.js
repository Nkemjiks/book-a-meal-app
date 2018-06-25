import { ADD_MEAL_SUCCESS, ADD_MEAL_FAILURE } from '../actionTypes';
import axios, { config } from '../helpers/axios';
import displayToast from '../helpers/displayToast';

/**
* @param {Object} mealData - meal information
* @param {Function} action - action to get meals
*
* @returns {Promise}  - dispatches action with true or false
*/
const addMealAction = mealData => dispatch => axios.post('/meals', mealData, config)
  .then(() => {
    dispatch({
      type: ADD_MEAL_SUCCESS,
      payload: true,
    });
    displayToast('success', 'Meal Added Successfully');
  })
  .catch((err) => {
    dispatch({
      type: ADD_MEAL_FAILURE,
      payload: false,
    });
    displayToast('error', err.response.data.message);
  });

export default addMealAction;
