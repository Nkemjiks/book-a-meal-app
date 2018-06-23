import { GET_MENU_SUCCESS, GET_MENU_FAILURE } from '../actionTypes';
import axios from '../helpers/axios';

/**
* @returns {Promise}  - dispatches action with menu set by the caterer
*/
const getMenuAction = () => dispatch => axios.get('/menu/caterer')
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
