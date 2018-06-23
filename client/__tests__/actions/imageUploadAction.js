import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import imageUploadAction from '../../action/imageUploadAction';
import { IMAGE_UPLOAD_URL } from '../../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('imageUploadAction action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch USER_ROLE_UPDATE_SUCCESS action', (done) => {
    moxios.stubRequest('https://api.cloudinary.com/v1_1/dqsmurjpg/image/upload', {
      status: 201,
      response: {
        url: 'www.image.com/93ju3',
      },
    });

    const expectedActions = [
      {
        type: IMAGE_UPLOAD_URL,
        payload: 'www.image.com/93ju3',
      },
    ];

    const store = mockStore({});

    store.dispatch(imageUploadAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch USER_ROLE_UPDATE_FAILURE action', (done) => {
    moxios.stubRequest('https://api.cloudinary.com/v1_1/dqsmurjpg/image/upload', {
      status: 400,
    });

    const store = mockStore({});

    store.dispatch(imageUploadAction())
      .then(() => {
        done();
      });
  });
});
