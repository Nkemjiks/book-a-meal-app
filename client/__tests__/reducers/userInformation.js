import expect from 'expect';
import reducer from '../../reducers/userInformation';
import * as mocks from '../../mocks/userInformationMock';

describe('userInformation reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(mocks.initialState);
  });
  it('should handle SIGNUP_USER_SUCCESS', () => {
    expect(reducer({}, mocks.signupSuccessAction)).toEqual(mocks.signupSuccessState);
  });
  it('should handle SIGNUP_USER_FAILURE', () => {
    expect(reducer({}, mocks.signupFailureAction)).toEqual(mocks.signupFailureState);
  });
  it('should handle LOGIN_USER_SUCCESS', () => {
    expect(reducer({}, mocks.loginSuccessAction)).toEqual(mocks.loginSuccessState);
  });
  it('should handle LOGIN_USER_FAILURE', () => {
    expect(reducer({}, mocks.loginFailureAction)).toEqual(mocks.loginFailureState);
  });
  it('should handle USER_ROLE_UPDATE_SUCCESS', () => {
    expect(reducer({}, mocks.roleUpdateSuccessAction)).toEqual(mocks.roleUpdateSuccessState);
  });
  it('should handle USER_ROLE_UPDATE_FAILURE', () => {
    expect(reducer({}, mocks.roleUpdateFailureAction)).toEqual(mocks.roleUpdateFailureState);
  });
  it('should handle GET_USER_DETAILS_SUCCESS', () => {
    expect(reducer({}, mocks.userInformationAction)).toEqual(mocks.userInformationState);
  });
});
