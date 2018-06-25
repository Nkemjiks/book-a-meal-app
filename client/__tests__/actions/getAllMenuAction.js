import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import getAllMenuAction from '../../action/getAllMenuAction';
import { GET_ALL_MENU_SUCCESS, GET_ALL_MENU_FAILURE } from '../../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getMenuAction action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch GET_ALL_MENU_SUCCESS action', (done) => {
    moxios.stubRequest('/menu/customer', {
      status: 200,
      response: {
        data: {
          orders: [],
        },
      },
    });

    const expectedActions = [
      { type: GET_ALL_MENU_SUCCESS, payload: { orders: [] } },
    ];

    const store = mockStore({});

    store.dispatch(getAllMenuAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch GET_ALL_MENU_FAILURE action', (done) => {
    moxios.stubRequest('/menu/customer', {
      status: 400,
      response: { message: 'Invalid token' },
    });

    const expectedActions = [
      { type: GET_ALL_MENU_FAILURE, payload: 'Invalid token' },
    ];

    const store = mockStore({});

    store.dispatch(getAllMenuAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
