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
    moxios.stubRequest('/menu?limit=10&offset=0', {
      status: 200,
      response: {
        data: {
          menu: [],
        },
      },
    });

    const expectedActions = [
      { type: GET_ALL_MENU_SUCCESS, payload: { data: { menu: [] } } },
    ];

    const store = mockStore({});

    store.dispatch(getAllMenuAction(0, 10))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch GET_ALL_MENU_FAILURE action', (done) => {
    moxios.stubRequest('/menu?limit=10&offset=0', {
      status: 400,
      response: { message: 'Invalid token' },
    });

    const expectedActions = [
      { type: GET_ALL_MENU_FAILURE, payload: 'Invalid token' },
    ];

    const store = mockStore({});

    store.dispatch(getAllMenuAction(0, 10))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
