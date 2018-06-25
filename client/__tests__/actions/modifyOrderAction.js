import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import modifyOrderAction from '../../action/modifyOrderAction';
import { MODIFY_ORDER_SUCCESS, MODIFY_ORDER_FAILURE } from '../../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getMenuAction action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch MODIFY_ORDER_SUCCESS action', (done) => {
    moxios.stubRequest('/orders/673563', {
      status: 200,
      response: {
        data: {
          order: {},
        },
      },
    });

    const expectedActions = [
      { type: MODIFY_ORDER_SUCCESS, payload: true },
    ];

    const store = mockStore({});

    store.dispatch(modifyOrderAction('673563'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch MODIFY_ORDER_FAILURE action', (done) => {
    moxios.stubRequest('/orders/673563', {
      status: 400,
      response: { message: 'Invalid token' },
    });

    const expectedActions = [
      { type: MODIFY_ORDER_FAILURE, payload: false },
    ];

    const store = mockStore({});

    store.dispatch(modifyOrderAction('673563'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
