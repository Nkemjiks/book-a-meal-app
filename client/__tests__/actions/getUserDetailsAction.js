import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { GET_USER_DETAILS_SUCCESS } from '../../actionTypes';
import getUserDetailsAction from '../../action/getUserDetailsAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('should update the user details in the store', () => {
    const user = {
      id: '4094ad8a-be5e-43a4-8c58-3e0c680f5fc9',
      fullName: 'Andela Bayo',
      email: 'mbonunkemjika@ymail.com',
      phoneNumber: '2334',
      role: 'caterer',
      address: '12B agege',
    };
    const expectedAction = [{
      type: GET_USER_DETAILS_SUCCESS,
      payload: user,
    }];
    const initialState = {
      user: {},
      error: null,
    };
    const store = mockStore({ initialState });

    store.dispatch(getUserDetailsAction(user));
    expect(store.getActions()).toEqual(expectedAction);
  });
});
