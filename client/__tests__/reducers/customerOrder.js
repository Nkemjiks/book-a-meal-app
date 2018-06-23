import expect from 'expect';
import reducer from '../../reducers/customerOrder';
import * as mocks from '../../mocks/customerOrderMocks';

describe('customerOrder reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(mocks.initialState);
  });
  it('should handle GET_CUSTOMER_ORDER_HISTORY_SUCCESS', () => {
    expect(reducer({}, mocks.getOrderSuccessAction)).toEqual(mocks.getOrderSuccessState);
  });
  it('should handle GET_CUSTOMER_ORDER_HISTORY_FAILURE', () => {
    expect(reducer({}, mocks.getOrderFailureAction)).toEqual(mocks.getOrderFailureState);
  });
  it('should handle PLACE_ORDER_SUCCESS', () => {
    expect(reducer({}, mocks.placeOrderSuccessAction)).toEqual(mocks.placeOrderSuccessState);
  });
  it('should handle PLACE_ORDER_FAILURE', () => {
    expect(reducer({}, mocks.placeOrderFailureAction)).toEqual(mocks.placeOrderFailureState);
  });
  it('should handle MODIFY_ORDER_SUCCESS', () => {
    expect(reducer({}, mocks.modifyOrderSuccessAction)).toEqual(mocks.modifyOrderSuccessState);
  });
  it('should handle MODIFY_ORDER_FAILURE', () => {
    expect(reducer({}, mocks.modifyOrderFailureAction)).toEqual(mocks.modifyOrderFailureState);
  });
});
