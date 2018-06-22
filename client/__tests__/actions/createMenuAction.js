import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import createMenuAction from '../../action/createMenuAction';
import { CREATE_MENU_SUCCESS, CREATE_MENU_FAILURE } from '../../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('createMenuAction action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates CREATE_MENU_SUCCESS when the menu is created', (done) => {
    moxios.stubRequest('/menu', {
      status: 201,
      response: {
        data: { message: 'Menu created successfully' },
      },
    });

    const expectedActions = [
      { type: CREATE_MENU_SUCCESS, payload: true },
    ];

    const store = mockStore({});

    store.dispatch(createMenuAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('creates CREATE_MENU_FAILURE when the menu is not created', (done) => {
    moxios.stubRequest('/menu', {
      status: 400,
      response: {
        data: { message: 'Invalid token' },
      },
    });

    const expectedActions = [
      { type: CREATE_MENU_FAILURE, payload: false },
    ];

    const store = mockStore({});

    store.dispatch(createMenuAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
