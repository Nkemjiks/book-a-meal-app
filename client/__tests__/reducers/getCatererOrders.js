import expect from 'expect';
import reducer from '../../reducers/getCatererOrders';
import * as mocks from '../../mocks/getCatererOrdersMock';

describe('getCatererOrders reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(mocks.initialState);
  });
  it('should handle GET_CATERER_ORDER_SUCCESS', () => {
    expect(reducer({}, mocks.getOrderSuccessAction)).toEqual(mocks.getOrderSuccessState);
  });
  it('should handle GET_CATERER_ORDER_FAILURE', () => {
    expect(reducer({}, mocks.getOrderFailureAction)).toEqual(mocks.getOrderFailureState);
  });
});
