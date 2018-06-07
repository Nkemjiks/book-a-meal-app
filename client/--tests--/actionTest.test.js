import loginAction from '../action/loginAction';
import * as types from '../actionTypes';

describe('actions', () => {
  it('should create an action to update the user details state in the store', () => {

    const userDetails = {
      id: 'e802f6b0-341b-4776-8fb7-42136816eee6',
      fullName: 'Ali Coker',
      email: 'alic@gmail.com',
      phoneNumber: '983799878',
      role: 'customer',
      address: '12B agege',
    };

    const expectedAction = {
      type: types.LOGIN_USER_SUCCESS,
      payload: userDetails,
    };

    const action = loginAction(userDetails, true);
    expect(action).toEqual(expectedAction);
  });
});
