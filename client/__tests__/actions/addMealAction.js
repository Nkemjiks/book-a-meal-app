import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import addMealAction from '../../action/addMealAction';
import { ADD_MEAL_SUCCESS, ADD_MEAL_FAILURE } from '../../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('addMeal action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch ADD_MEAL_SUCCESS action', (done) => {
    moxios.stubRequest('/meals', {
      status: 201,
      response: {
        data: { message: 'Meal added successfully' },
      },
    });

    const expectedActions = [
      { type: ADD_MEAL_SUCCESS, payload: true },
      { payload: 0, type: 'UPLOAD_IMAGE_PROGRESS' },
      { payload: '', type: 'IMAGE_UPLOAD_URL' },
    ];

    const store = mockStore({});

    store.dispatch(addMealAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch ADD_MEAL_FAILURE action', (done) => {
    moxios.stubRequest('/meals', {
      status: 400,
      response: {
        data: { message: 'Invalid token' },
      },
    });

    const expectedActions = [
      { type: ADD_MEAL_FAILURE, payload: false },
    ];

    const store = mockStore({ });

    store.dispatch(addMealAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
