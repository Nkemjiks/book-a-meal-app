import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import loginAction from '../../action/loginAction';
import { LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS } from '../../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('loginAction action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch LOGIN_USER_SUCCESS action', (done) => {
    moxios.stubRequest('/auth/login', {
      status: 200,
      response: {
        data: {
          message: 'User created successfully',
        },
      },
    });

    const expectedActions = [
      { type: LOGIN_USER_SUCCESS, payload: { message: 'User created successfully' } },
    ];

    const store = mockStore({});
    const history = {
      push: jest.fn(),
    };
    const user = {
      email: 'dab@yahoo.com',
      password: 'test',
    };
    store.dispatch(loginAction(user, history))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch LOGIN_USER_FAILURE action', (done) => {
    moxios.stubRequest('/auth/login', {
      status: 400,
      response: { message: 'Invalid user details' },
    });

    const expectedActions = [
      { type: LOGIN_USER_FAILURE, payload: 'Invalid user details' },
    ];

    const store = mockStore({});

    store.dispatch(loginAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
