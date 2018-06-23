import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import placeOrderAction from '../../action/placeOrderAction';
import { PLACE_ORDER_SUCCESS, PLACE_ORDER_FAILURE } from '../../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('placeOrderAction action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch PLACE_ORDER_SUCCESS action', (done) => {
    moxios.stubRequest('/orders', {
      status: 201,
      response: {
        data: {
          message: 'Order placed successfully',
        },
      },
    });

    const expectedActions = [
      { type: PLACE_ORDER_SUCCESS, payload: true },
    ];

    const store = mockStore({});

    store.dispatch(placeOrderAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch PLACE_ORDER_FAILURE action', (done) => {
    moxios.stubRequest('/orders', {
      status: 400,
      response: { message: 'Invalid token' },
    });

    const expectedActions = [
      { type: PLACE_ORDER_FAILURE, payload: false },
    ];

    const store = mockStore({});

    store.dispatch(placeOrderAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
