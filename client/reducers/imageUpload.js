import { IMAGE_UPLOAD_URL, UPLOAD_IMAGE_PROGRESS } from '../actionTypes';

const initialState = {
  imageURL: '',
  imageUploadProgress: 0,
};

/**
 * Reducer that handles image upload
 *
 * @param {Object} state initial state for the imageUpload section of the store
 * @param {Object} action the dispatched action
 *
 * @returns {Object} new state of the imageUpload section of the store
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD_URL:
      return {
        ...state,
        imageURL: action.payload,
        imageUploadProgress: 0,
      };
    case UPLOAD_IMAGE_PROGRESS:
      return {
        ...state,
        imageURL: '',
        imageUploadProgress: action.payload,
      };
    default:
      return state;
  }
};
