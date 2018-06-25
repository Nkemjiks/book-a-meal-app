import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import getCatererOrderAction from '../../action/getCatererOrderAction';
import { GET_CATERER_ORDER_SUCCESS, GET_CATERER_ORDER_FAILURE } from '../../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getCatererOrderAction action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch GET_CATERER_ORDER_SUCCESS action', (done) => {
    moxios.stubRequest('/orders/caterer', {
      status: 200,
      response: {
        orders: [],
      },
    });

    const expectedActions = [
      { type: GET_CATERER_ORDER_SUCCESS, payload: { orders: [] } },
    ];

    const store = mockStore({});

    store.dispatch(getCatererOrderAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch GET_CATERER_ORDER_FAILURE action', (done) => {
    moxios.stubRequest('/orders/caterer', {
      status: 400,
      response: { message: 'Invalid token' },
    });

    const expectedActions = [
      { type: GET_CATERER_ORDER_FAILURE, payload: 'Invalid token' },
    ];

    const store = mockStore({});

    store.dispatch(getCatererOrderAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
