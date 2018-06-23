import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import getMealsAction from '../../action/getMealsAction';
import { GET_MEALS_SUCCESS, GET_MEALS_FAILURE } from '../../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getCustomerOrderHistoryAction action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch GET_MEALS_SUCCESS action', (done) => {
    moxios.stubRequest('/meals', {
      status: 200,
      response: {
        data: {
          message: 'You have added the following meals',
        },
      },
    });

    const expectedActions = [
      { type: GET_MEALS_SUCCESS, payload: { message: 'You have added the following meals' } },
    ];

    const store = mockStore({});

    store.dispatch(getMealsAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch GET_MEALS_FAILURE action', (done) => {
    moxios.stubRequest('/meals', {
      status: 400,
      response: { message: 'Invalid token' },
    });

    const expectedActions = [
      { type: GET_MEALS_FAILURE, payload: 'Invalid token' },
    ];

    const store = mockStore({});

    store.dispatch(getMealsAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
