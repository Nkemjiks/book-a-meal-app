import { toast } from 'react-toastify';

/**
 * @description display a message to the user
 *
 * @param {String} method - toast predefined methods
 * @param {String} message - message to be displayed
 */
const displayToast = (method, message) => toast[method](message, {
  hideProgressBar: true,
});

export default displayToast;
