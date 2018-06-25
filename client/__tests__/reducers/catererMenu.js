import expect from 'expect';
import reducer from '../../reducers/catererMenu';
import * as mocks from '../../mocks/catererMenuMock';

describe('catererMenu reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(mocks.initialState);
  });
  it('should handle GET_MENU_SUCCESS', () => {
    expect(reducer({}, mocks.getMenuSuccessAction)).toEqual(mocks.getMenuSuccessState);
  });
  it('should handle GET_MENU_FAILURE', () => {
    expect(reducer({}, mocks.getMenuFailureAction)).toEqual(mocks.getMenuFailureState);
  });
  it('should handle CREATE_MENU_SUCCESS', () => {
    expect(reducer({}, mocks.createMenuSucessAction)).toEqual(mocks.createMenuSucessState);
  });
  it('should handle CREATE_MENU_FAILURE', () => {
    expect(reducer({}, mocks.createMenuFailureAction)).toEqual(mocks.createMenuFailureState);
  });
});
