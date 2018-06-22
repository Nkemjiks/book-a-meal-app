import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import getAllCatererOrderAction from '../../action/getAllCatererOrderAction';
import { GET_ALL_CATERER_ORDER_SUCCESS, GET_ALL_CATERER_ORDER_FAILURE } from '../../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getAllCatererOrderAction action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates GET_ALL_CATERER_ORDER_SUCCESS when caterer\' orders is gotten', (done) => {
    moxios.stubRequest('/orders/caterer/all', {
      status: 201,
      response: { message: 'Meal added successfully' },
    });

    const expectedActions = [
      { type: GET_ALL_CATERER_ORDER_SUCCESS, payload: {} },
    ];

    const store = mockStore({});

    store.dispatch(getAllCatererOrderAction())
      .then(() => {
        expect(store.getActions()).toMatch(expectedActions);
        done();
      });
  });

  it('creates GET_ALL_CATERER_ORDER_FAILURE when the menu is not created', (done) => {
    moxios.stubRequest('/orders/caterer/all', {
      status: 400,
      response: { message: 'Invalid token' },
    });

    const expectedActions = [
      { type: GET_ALL_CATERER_ORDER_FAILURE, payload: 'Invalid token' },
    ];

    const store = mockStore({});

    store.dispatch(getAllCatererOrderAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
