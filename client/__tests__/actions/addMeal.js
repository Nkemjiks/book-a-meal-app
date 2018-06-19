import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import addMealAction from '../../action/addMealAction';
import { ADD_MEAL_SUCCESS } from '../../actionTypes';
import localStorageMock from '../../mocks/localStoragemock';

window.localStorage = localStorageMock;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mealData = {};
const action = jest.fn();

describe('addMeal action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates ADD_MEAL_SUCCESS after successfuly adding a meal', (done) => {
    moxios.stubRequest('/meals', {
      status: 200,
      response: {
        meals: { message: 'Meal added successfully' },
      },
    });

    const expectedActions = [
      { type: ADD_MEAL_SUCCESS, payload: true },
    ];

    const store = mockStore({ mealAdded: false });

    return store.dispatch(addMealAction(mealData, action))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
