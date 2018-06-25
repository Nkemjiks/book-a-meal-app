import { IMAGE_UPLOAD_URL, UPLOAD_IMAGE_PROGRESS } from '../actionTypes';

export const initialState = {
  imageURL: '',
  imageUploadProgress: 0,
};

export const imageUploadState = {
  imageURL: 'www.image.com/3393hn3',
  imageUploadProgress: 0,
};

export const uploadProgressState = {
  imageURL: '',
  imageUploadProgress: 10,
};

export const imageuploadAction = {
  type: IMAGE_UPLOAD_URL,
  payload: 'www.image.com/3393hn3',
};

export const uploadProgressAction = {
  type: UPLOAD_IMAGE_PROGRESS,
  payload: 10,
};
