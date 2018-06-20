import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedManageOrder, { ManageOrder } from '../../../../components/Caterer/ManageOrder';
import userInformation from '../../../../mocks/userInformation';
import localStorageMock from '../../../../mocks/localStoragemock';
import orders from '../../../../mocks/customerOrder';

window.localStorage = localStorageMock;

const props = {
  getUserDetailsAction: jest.fn(),
  getCatererOrderAction: jest.fn(),
  getAllCatererOrderAction: jest.fn(),
  allOrders: orders,
  orders: {},
  history: {},
  orderModified: false,
};

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = mockStore({
  userInformation,
});


describe('ManageOrder Component', () => {
  const mountWrapper = mount(<ManageOrder {...props} />);
  it('should render unconnected component properly', () => {
    expect(mountWrapper.find('h1').length).toBe(2);
    expect(mountWrapper.find('h3').length).toBe(2);
    expect(mountWrapper.find('h4').length).toBe(16);
    expect(mountWrapper.find('div').length).toBe(13);
    expect(mountWrapper.find('h3').first().text()).toBe('Today Order Summary');
    expect(mountWrapper.find('h1').first().text()).toBe('Incoming Orders');
    expect(mountWrapper.find('h3').last().text()).toBe('All Order Summary');
    expect(mountWrapper.find('h1').last().text()).toBe('Details of All Orders');
    const getCatererOrderActionSpy = jest.spyOn(mountWrapper.instance().props, 'getCatererOrderAction');
    const getAllCatererOrderActionSpy = jest.spyOn(mountWrapper.instance().props, 'getAllCatererOrderAction');
    expect(getCatererOrderActionSpy).toHaveBeenCalled();
    expect(getAllCatererOrderActionSpy).toHaveBeenCalled();
  });
  it('should update state for only allOrders', () => {
    mountWrapper.setProps({ orders });
    expect(mountWrapper.state().orders.data.message).toBe('You have placed the following orders');
    expect(mountWrapper).toBeDefined();
    mountWrapper.unmount();
  });
  it('should render connected component properly', () => {
    const connectedWrapper = shallow(<ConnectedManageOrder {...props} store={store} />);
    expect(connectedWrapper.length).toBe(1);
  });
});
