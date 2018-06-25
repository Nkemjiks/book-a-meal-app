import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import modifyMealAction from '../../action/modifyMealAction';
import { MODIFY_MEAL_SUCCESS, MODIFY_MEAL_FAILURE } from '../../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getMenuAction action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch MODIFY_MEAL_SUCCESS action', (done) => {
    moxios.stubRequest('/meals/673563', {
      status: 200,
      response: {
        data: {
          meals: {},
        },
      },
    });

    const expectedActions = [
      { type: MODIFY_MEAL_SUCCESS, payload: true },
    ];

    const store = mockStore({});

    store.dispatch(modifyMealAction('673563'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch MODIFY_MEAL_FAILURE action', (done) => {
    moxios.stubRequest('/meals/673563', {
      status: 400,
      response: { message: 'Invalid token' },
    });

    const expectedActions = [
      { type: MODIFY_MEAL_FAILURE, payload: false },
    ];

    const store = mockStore({});

    store.dispatch(modifyMealAction('673563'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
