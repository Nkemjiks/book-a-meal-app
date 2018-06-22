import { GET_MENU_SUCCESS, GET_MENU_FAILURE } from '../actionTypes';
import axiosInstance, { config } from '../helpers/axios';

/**
* @returns {Promise}  - dispatches action with menu set by the caterer
*/
const getMenuAction = () => dispatch => axiosInstance.get('/menu/caterer', config)
  .then((response) => {
    dispatch({
      type: GET_MENU_SUCCESS,
      payload: response.data.data,
    });
  })
  .catch((err) => {
    dispatch({
      type: GET_MENU_FAILURE,
      payload: err.response.data.message,
    });
  });

export default getMenuAction;
