import { toast } from 'react-toastify';

const displayToast = (method, message) => toast[method](message, {
  hideProgressBar: true,
});

export default displayToast;
