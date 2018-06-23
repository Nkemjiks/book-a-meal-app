import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { OrderHistoryList } from '../../../../components/Customer/ManageOrder/OrderHistoryList';
import orders from '../../../../mocks/customerOrder';

const props = {
  orderDetails: orders.data,
};

Enzyme.configure({ adapter: new Adapter() });

describe('CartContent Component', () => {
  const wrapper = shallow(<OrderHistoryList {...props} />);
  it('should render unconnected component properly', () => {
    expect(wrapper).toBeDefined();
  });
});
