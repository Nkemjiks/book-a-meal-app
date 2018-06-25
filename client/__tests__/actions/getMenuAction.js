import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import getMenuAction from '../../action/getMenuAction';
import { GET_MENU_SUCCESS, GET_MENU_FAILURE } from '../../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getMenuAction action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch GET_MENU_SUCCESS action', (done) => {
    moxios.stubRequest('/menu/caterer', {
      status: 200,
      response: {
        data: {
          meals: {},
        },
      },
    });

    const expectedActions = [
      { type: GET_MENU_SUCCESS, payload: { meals: {} } },
    ];

    const store = mockStore({});

    store.dispatch(getMenuAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch GET_MENU_FAILURE action', (done) => {
    moxios.stubRequest('/menu/caterer', {
      status: 400,
      response: { message: 'Invalid token' },
    });

    const expectedActions = [
      { type: GET_MENU_FAILURE, payload: 'Invalid token' },
    ];

    const store = mockStore({});

    store.dispatch(getMenuAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
