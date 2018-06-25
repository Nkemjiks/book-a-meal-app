import expect from 'expect';
import reducer from '../../reducers/catererMeals';
import * as mocks from '../../mocks/catererMeals';

describe('catererMeals reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(mocks.initialState);
  });
  it('should handle GET_MEALS_SUCCESS', () => {
    expect(reducer({}, mocks.getMealSuccessAction)).toEqual(mocks.getMealSuccessState);
  });
  it('should handle GET_MEALS_FAILURE', () => {
    expect(reducer({}, mocks.getMealFailureAction)).toEqual(mocks.getMealFailureState);
  });
  it('should handle ADD_MEAL_SUCCESS', () => {
    expect(reducer({}, mocks.mealAddedSucessAction)).toEqual(mocks.mealAddedSucessState);
  });
  it('should handle ADD_MEAL_FAILURE', () => {
    expect(reducer({}, mocks.mealAddedFailureAction)).toEqual(mocks.mealAddedFailureState);
  });
  it('should handle MODIFY_MEAL_SUCCESS', () => {
    expect(reducer({}, mocks.mealModifiedSucessAction)).toEqual(mocks.mealModifiedSucessState);
  });
  it('should handle MODIFY_MEAL_FAILURE', () => {
    expect(reducer({}, mocks.mealModifiedFailureAction)).toEqual(mocks.mealModifiedFailureState);
  });
  it('should handle DELETE_MEAL_SUCCESS', () => {
    expect(reducer({}, mocks.mealDeletedSucessAction)).toEqual(mocks.mealDeletedSucessState);
  });
  it('should handle DELETE_MEAL_FAILURE', () => {
    expect(reducer({}, mocks.mealDeletedFailureAction)).toEqual(mocks.mealDeletedFailureState);
  });
});
