import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import removeMealAction from '../../action/removeMealAction';
import { REMOVE_MEAL_SUCCESS, REMOVE_MEAL_FAILURE } from '../../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('removeMealAction action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch REMOVE_MEAL_SUCCESS action', (done) => {
    moxios.stubRequest('/menu/28983839', {
      status: 200,
      response: {
        data: { message: 'Menu has been updated' },
      },
    });

    const expectedActions = [
      { type: REMOVE_MEAL_SUCCESS, payload: true },
    ];

    const store = mockStore({});

    store.dispatch(removeMealAction('28983839'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch REMOVE_MEAL_FAILURE action', (done) => {
    moxios.stubRequest('/menu/28983839', {
      status: 400,
      response: {
        data: { message: 'Invalid token' },
      },
    });

    const expectedActions = [
      { type: REMOVE_MEAL_FAILURE, payload: false },
    ];

    const store = mockStore({});

    store.dispatch(removeMealAction('28983839'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
