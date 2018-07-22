import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import getMealsInMenuAction from '../../action/getMealsInMenuAction';
import { GET_MEALS_IN_MENU_FAILURE, GET_MEALS_IN_MENU_SUCCESS } from '../../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getMenuAction action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch GET_MEALS_IN_MENU_SUCCESS action', (done) => {
    moxios.stubRequest('/menu/meal/398484', {
      status: 200,
      response: {
        data: {
          meals: [],
        },
      },
    });

    const expectedActions = [
      { type: GET_MEALS_IN_MENU_SUCCESS, payload: { data: { meals: [] } } },
    ];

    const store = mockStore({});

    store.dispatch(getMealsInMenuAction('398484'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch GET_MEALS_IN_MENU_FAILURE action', (done) => {
    moxios.stubRequest('/menu/meal/398484', {
      status: 400,
      response: { message: 'Invalid token' },
    });

    const expectedActions = [
      { type: GET_MEALS_IN_MENU_FAILURE, payload: 'Invalid token' },
    ];

    const store = mockStore({});

    store.dispatch(getMealsInMenuAction('398484'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
