import expect from 'expect';
import reducer from '../../reducers/imageUpload';
import {
  initialState,
  imageuploadAction,
  imageUploadState,
  uploadProgressAction,
  uploadProgressState,
} from '../../mocks/imageUploadMocks';

describe('imageUpload reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle IMAGE_UPLOAD_URL', () => {
    expect(reducer({}, imageuploadAction)).toEqual(imageUploadState);
  });
  it('should handle UPLOAD_IMAGE_PROGRESS', () => {
    expect(reducer({}, uploadProgressAction)).toEqual(uploadProgressState);
  });
});
