import expect from 'expect';
import reducer from '../../reducers/getMealsInMenu';
import * as mocks from '../../mocks/getMealsInMenuMock';

describe('getMealsInMenu reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(mocks.initialState);
  });
  it('should handle GET_MEALS_IN_MENU_SUCCESS', () => {
    expect(reducer(
      {},
      mocks.getMealsInMenuSuccessAction,
    )).toEqual(mocks.getMealsInMenuSuccessState);
  });
  it('should handle GET_MEALS_IN_MENU_FAILURE', () => {
    expect(reducer(
      {},
      mocks.getMealsInMenuFailureAction,
    )).toEqual(mocks.getMealsInMenuFailureState);
  });
});
