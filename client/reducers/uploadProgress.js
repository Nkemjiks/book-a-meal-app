import { UPLOAD_IMAGE_PROGRESS } from '../actionTypes';

const initialState = {
  imageUploadProgress: 0,
};

/**
 * Reducer that handles image upload progress
 *
 * @param {Object} state initial state for the imageUploadProgress section of the store
 * @param {Object} action the dispatched action
 *
 * @returns {Object} new state of the imageUploadProgress section of the store
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_PROGRESS:
      return {
        ...state,
        uploadProgress: action.payload,
      };
    default:
      return state;
  }
};
