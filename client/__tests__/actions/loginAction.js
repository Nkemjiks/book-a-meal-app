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

  it('creates LOGIN_USER_SUCCESS when caterer\' orders is gotten', (done) => {
    moxios.stubRequest('/auth/login', {
      status: 201,
      response: { message: 'User created successfully' },
    });

    const expectedActions = [
      { type: LOGIN_USER_SUCCESS, payload: {} },
    ];

    const store = mockStore({});

    store.dispatch(loginAction())
      .then(() => {
        expect(store.getActions()).toMatch(expectedActions);
        done();
      });
  });

  it('creates LOGIN_USER_FAILURE when the menu is not created', (done) => {
    moxios.stubRequest('/auth/login', {
      status: 400,
      response: { message: 'Invalid token' },
    });

    const expectedActions = [
      { type: LOGIN_USER_FAILURE, payload: 'Invalid token' },
    ];

    const store = mockStore({});

    store.dispatch(loginAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
