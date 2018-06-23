import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import getCustomerOrderHistoryAction from '../../action/getCustomerOrderHistoryAction';
import { GET_CUSTOMER_ORDER_HISTORY_SUCCESS, GET_CUSTOMER_ORDER_HISTORY_FAILURE } from '../../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getCustomerOrderHistoryAction action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch GET_CUSTOMER_ORDER_HISTORY_SUCCESS action', (done) => {
    moxios.stubRequest('/orders/customer', {
      status: 200,
      response: {
        orders: [],
      },
    });

    const expectedActions = [
      { type: GET_CUSTOMER_ORDER_HISTORY_SUCCESS, payload: { orders: [] } },
    ];

    const store = mockStore({});

    store.dispatch(getCustomerOrderHistoryAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch GET_CUSTOMER_ORDER_HISTORY_FAILURE action', (done) => {
    moxios.stubRequest('/orders/customer', {
      status: 400,
      response: { message: 'Invalid token' },
    });

    const expectedActions = [
      { type: GET_CUSTOMER_ORDER_HISTORY_FAILURE, payload: 'Invalid token' },
    ];

    const store = mockStore({});

    store.dispatch(getCustomerOrderHistoryAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
