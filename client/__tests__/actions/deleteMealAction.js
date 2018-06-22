import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import deleteMealAction from '../../action/deleteMealAction';
import { DELETE_MEAL_SUCCESS, DELETE_MEAL_FAILURE } from '../../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('deleteMealAction action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates DELETE_MEAL_SUCCESS when a meal is deleted', (done) => {
    moxios.stubRequest('/meals/28983839', {
      status: 201,
      response: {
        data: { message: 'Meal added successfully' },
      },
    });

    const expectedActions = [
      { type: DELETE_MEAL_SUCCESS, payload: true },
    ];

    const store = mockStore({});

    store.dispatch(deleteMealAction('28983839'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('creates DELETE_MEAL_FAILURE when the menu is not created', (done) => {
    moxios.stubRequest('/meals/28983839', {
      status: 400,
      response: {
        data: { message: 'Invalid token' },
      },
    });

    const expectedActions = [
      { type: DELETE_MEAL_FAILURE, payload: false },
    ];

    const store = mockStore({});

    store.dispatch(deleteMealAction('28983839'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
