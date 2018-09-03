import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedManageOrder, { ManageOrder } from '../../../../components/Customer/ManageOrder';
import userInformation from '../../../../mocks/userInformation';
import orders from '../../../../mocks/customerOrder';

const props = {
  getUserDetailsAction: jest.fn(),
  getCustomerOrderHistoryAction: jest.fn(),
  history: {},
  customerOrderHistory: orders,
  orderModified: false,
};

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = mockStore({
  userInformation,
  getCustomerOrderHistory: {
    customerOrderHistory: {},
    error: null,
  },
});


describe('ManageOrder Component', () => {
  const mountWrapper = shallow(<ManageOrder {...props} store={store} />);
  it('should render unconnected component properly', () => {
    expect(mountWrapper.find('.dashboard').length).toBe(1);
    expect(mountWrapper.find('h1').length).toBe(1);
    expect(mountWrapper.find('table').length).toBe(1);
    expect(mountWrapper.find('div').length).toBe(4);
    expect(mountWrapper.find('h1').first().text()).toBe('Order History');
  });
  it('should call component did mount to dispatch action', () => {
    const getUserDetailsActionSpy = jest.spyOn(mountWrapper.instance().props, 'getUserDetailsAction');
    const getCustomerOrderHistoryActionSpy = jest.spyOn(mountWrapper.instance().props, 'getCustomerOrderHistoryAction');
    expect(mountWrapper).toBeDefined();
    expect(mountWrapper.state().customerOrderHistory.message).toBe('You have placed the following orders');
    expect(getUserDetailsActionSpy).toHaveBeenCalled();
    expect(getCustomerOrderHistoryActionSpy).toHaveBeenCalled();
  });
  it('should call component did update to dispatch action', () => {
    mountWrapper.setProps({ orderModified: true });
    const getCustomerOrderHistoryActionSpy = jest.spyOn(mountWrapper.instance().props, 'getCustomerOrderHistoryAction');
    expect(mountWrapper).toBeDefined();
    expect(getCustomerOrderHistoryActionSpy).toHaveBeenCalled();
  });
  it('should render connected component properly', () => {
    const connectedWrapper = shallow(<ConnectedManageOrder {...props} store={store} />);
    expect(connectedWrapper.length).toBe(1);
  });
});
