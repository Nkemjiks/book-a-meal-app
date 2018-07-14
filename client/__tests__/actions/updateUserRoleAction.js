import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import updateUserRoleAction from '../../action/updateUserRoleAction';
import { USER_ROLE_UPDATE_SUCCESS, USER_ROLE_UPDATE_FAILURE } from '../../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const userData = {
  businessName: 'Danish Food',
  businessAddress: '12B Agege',
  logoURL: 'www.ikage.com',
};

describe('updateUserRoleAction action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch USER_ROLE_UPDATE_SUCCESS action', (done) => {
    moxios.stubRequest('/auth/update', {
      status: 201,
      response: {
        data: {
          message: 'User role updated successfully',
        },
      },
    });

    const expectedActions = [
      {
        type: USER_ROLE_UPDATE_SUCCESS,
        payload: { message: 'User role updated successfully' },
      },
    ];

    const store = mockStore({});
    const history = {
      push: jest.fn(),
    };

    store.dispatch(updateUserRoleAction(userData, history))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch USER_ROLE_UPDATE_FAILURE action', (done) => {
    moxios.stubRequest('/auth/update', {
      status: 400,
      response: { message: 'Invalid token' },
    });

    const expectedActions = [
      { type: USER_ROLE_UPDATE_FAILURE, payload: 'Invalid token' },
    ];

    const store = mockStore({});

    store.dispatch(updateUserRoleAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
