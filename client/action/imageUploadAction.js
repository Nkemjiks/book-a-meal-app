import axios from 'axios';

import { UPLOAD_IMAGE_PROGRESS, IMAGE_UPLOAD_URL } from '../actionTypes';
import displayToast from '../helpers/displayToast';

/**
* @param {object} formData - image information
*
* @returns {Promise}  - dispatches action with image URL
*/
const imageUploadAction = formData => dispatch => axios.post('https://api.cloudinary.com/v1_1/dqsmurjpg/image/upload', formData, {
  onUploadProgress: (progressEvent) => {
    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    dispatch({
      type: UPLOAD_IMAGE_PROGRESS,
      payload: percentCompleted,
    });
  },
})
  .then((response) => {
    dispatch({
      type: IMAGE_UPLOAD_URL,
      payload: response.data.url,
    });
    displayToast('success', 'Image Uploaded successfully');
  })
  .catch(() => displayToast('error', 'There was error while uploading the image. Try again'));

export default imageUploadAction;
