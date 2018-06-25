import expect from 'expect';
import reducer from '../../reducers/getAllMenu';
import * as mocks from '../../mocks/getAllMenuMock';

describe('getAllMenu reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(mocks.initialState);
  });
  it('should handle GET_ALL_MENU_SUCCESS', () => {
    expect(reducer({}, mocks.getAllMenuSuccessAction)).toEqual(mocks.getAllMenuSuccessState);
  });
  it('should handle GET_ALL_MENU_FAILURE', () => {
    expect(reducer({}, mocks.getAllMenuFailureAction)).toEqual(mocks.getAllMenuFailureState);
  });
});
