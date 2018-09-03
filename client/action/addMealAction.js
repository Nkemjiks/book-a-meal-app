import { ADD_MEAL_SUCCESS, ADD_MEAL_FAILURE, UPLOAD_IMAGE_PROGRESS, IMAGE_UPLOAD_URL } from '../actionTypes';
import axios from '../helpers/axios';
import displayToast from '../helpers/displayToast';

/**
* @param {Object} mealData - meal information
* @param {Function} action - action to get meals
*
* @returns {Promise}  - dispatches action with true or false
*/
const addMealAction = mealData => dispatch => axios.post('/meals', mealData)
  .then((response) => {
    dispatch({
      type: ADD_MEAL_SUCCESS,
      payload: true,
    });
    dispatch({
      type: UPLOAD_IMAGE_PROGRESS,
      payload: 0,
    });
    dispatch({
      type: IMAGE_UPLOAD_URL,
      payload: '',
    });
    displayToast('success', 'Meal Added Successfully');
    return ({ response });
  })
  .catch((err) => {
    dispatch({
      type: ADD_MEAL_FAILURE,
      payload: false,
    });
    displayToast('error', err.response.data.message);
    return ({ err });
  });

export default addMealAction;
