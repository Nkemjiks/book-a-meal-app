import { toast } from 'react-toastify';

const displayToast = (method, message) => {
  return toast[method](message, {
    hideProgressBar: true,
  });
};

export default displayToast;
