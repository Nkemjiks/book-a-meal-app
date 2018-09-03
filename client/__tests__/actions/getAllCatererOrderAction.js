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

  it('should dispatch GET_ALL_CATERER_ORDER_SUCCESS action', (done) => {
    moxios.stubRequest('/orders/caterer/all?limit=10&offset=0', {
      status: 200,
      response: { message: 'You have the following orders' },
    });

    const expectedActions = [
      { type: GET_ALL_CATERER_ORDER_SUCCESS, payload: { message: 'You have the following orders' } },
    ];

    const store = mockStore({});

    store.dispatch(getAllCatererOrderAction(0, 10))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch GET_ALL_CATERER_ORDER_FAILURE action', (done) => {
    moxios.stubRequest('/orders/caterer/all?limit=10&offset=0', {
      status: 400,
      response: { message: 'Invalid token' },
    });

    const expectedActions = [
      { type: GET_ALL_CATERER_ORDER_FAILURE, payload: 'Invalid token' },
    ];

    const store = mockStore({});

    store.dispatch(getAllCatererOrderAction(0, 10))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
