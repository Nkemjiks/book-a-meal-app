import { GET_ALL_MENU_SUCCESS, GET_ALL_MENU_FAILURE } from '../actionTypes';
import axiosInstance, { config } from '../helpers/axios';

/**
* @returns {Promise}  - dispatches action with all menu set for the day
*/
const getMenuAction = () => dispatch => axiosInstance.get('/menu/customer', config)
  .then((response) => {
    dispatch({
      type: GET_ALL_MENU_SUCCESS,
      payload: response.data.data,
    });
  })
  .catch((err) => {
    dispatch({
      type: GET_ALL_MENU_FAILURE,
      payload: err.response.data.message,
    });
  });

export default getMenuAction;
