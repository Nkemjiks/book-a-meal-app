import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import signupAction from '../../action/signupAction';
import { SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE } from '../../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('signupAction action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch SIGNUP_USER_SUCCESS action', (done) => {
    moxios.stubRequest('/auth/signup', {
      status: 201,
      response: {
        data: {
          message: 'User signin successfully',
        },
      },
    });

    const expectedActions = [
      {
        type: SIGNUP_USER_SUCCESS,
        payload: { message: 'User signin successfully' },
      },
    ];

    const store = mockStore({});
    const history = {
      push: jest.fn(),
    };
    const userDetails = {};

    store.dispatch(signupAction(userDetails, history))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch SIGNUP_USER_FAILURE action', (done) => {
    moxios.stubRequest('/auth/signup', {
      status: 400,
      response: { message: 'Invalid email address' },
    });

    const expectedActions = [
      { type: SIGNUP_USER_FAILURE, payload: 'Invalid email address' },
    ];

    const store = mockStore({});
    const userDetails = {};

    store.dispatch(signupAction(userDetails))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
