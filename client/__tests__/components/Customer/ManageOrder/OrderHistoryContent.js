import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedOrderHistoryContent, { OrderHistoryContent } from '../../../../components/Customer/ManageOrder/OrderHistoryContent';
import userInformation from '../../../../mocks/userInformation';
import orders from '../../../../mocks/customerOrder';
import createModalDomNode from '../../../../mocks/createModalDomNode';

const props = {
  modifyOrderAction: jest.fn(),
  getCustomerOrderHistoryAction: jest.fn(),
  history: {},
  order: orders.data[0],
  orderModified: true,
};

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = mockStore({
  userInformation,
  customerOrder: {
    customerOrderHistory: {},
    error: null,
  },
  singleRequest: {
    orderModified: false,
  },
});


describe('OrderHistoryContent Component', () => {
  createModalDomNode();
  const mountWrapper = mount(<OrderHistoryContent {...props} store={store} />);
  it('should render unconnected component properly', () => {
    expect(mountWrapper.find('Modal').length).toBe(1);
    expect(mountWrapper.find('.orderHistory').length).toBe(1);
    expect(mountWrapper.find('p').length).toBe(5);
    expect(mountWrapper.find('div').length).toBe(3);
  });
  it('should call the openEditModal method and update state', () => {
    const openEditModalSpy = jest.spyOn(mountWrapper.instance(), 'openEditModal');
    const getTotalSpy = jest.spyOn(mountWrapper.instance(), 'getTotal');
    const event = {
      target: {
        id: '7eeebb0e-74a2-4d3e-8f9e-afd51806ddce',
      },
    };
    mountWrapper.instance().openEditModal(event);
    mountWrapper.instance().getTotal();
    expect(openEditModalSpy).toHaveBeenCalled();
    expect(getTotalSpy).toHaveBeenCalled();
    expect(mountWrapper.state().deliveryAddress).toBe('');
    expect(mountWrapper.state().orderId).toBe('7eeebb0e-74a2-4d3e-8f9e-afd51806ddce');
    expect(mountWrapper.state().modifyModalIsOpen).toBe(true);
  });
  it('should call the get quantity method and update state', () => {
    const getQuantitySpy = jest.spyOn(mountWrapper.instance(), 'getQuantity');
    const getTotalSpy = jest.spyOn(mountWrapper.instance(), 'getTotal');
    mountWrapper.setState({
      orders: [{ mealId: '7eeebb0e-74a2-4d3e-8f9e-afd51806ddce', quantity: 3 }],
      originalOrder: [{ mealId: '7eeebb0e-74a2-4d3e-8f9e-afd51806ddce', quantity: 3 }],
      mealsInOrder: [{ mealPrice: 500, quantity: 3 }],
    });
    mountWrapper.instance().getQuantity('7eeebb0e-74a2-4d3e-8f9e-afd51806ddce', 4, 500);
    mountWrapper.instance().getTotal();
    expect(getQuantitySpy).toHaveBeenCalled();
    expect(getTotalSpy).toHaveBeenCalled();
    expect(mountWrapper.state().orders[0].quantity).toBe(4);
    expect(mountWrapper.state().mealsInOrder[0].mealPrice).toBe(500);
    expect(mountWrapper.state().total).toBe(2000);
  });
  it('should call the handle change method to update state', () => {
    const handleChangeSpy = jest.spyOn(mountWrapper.instance(), 'handleChange');
    const event = {
      target: {
        name: 'deliveryAddress',
        value: '12B Agege',
      },
    };
    mountWrapper.instance().handleChange(event);
    expect(mountWrapper.state().deliveryAddress).toBe('12B Agege');
    expect(handleChangeSpy).toHaveBeenCalled();
  });
  it('should call handleSubmit to modify the order', () => {
    const handleSubmitSpy = jest.spyOn(mountWrapper.instance(), 'handleSubmit');
    const modifyOrderActionSpy = jest.spyOn(mountWrapper.instance().props, 'modifyOrderAction');
    const event = {
      preventDefault: jest.fn(),
    };
    mountWrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(modifyOrderActionSpy).toHaveBeenCalled();
  });
  it('should call the closeEditModal method and update state', () => {
    const closeEditModalSpy = jest.spyOn(mountWrapper.instance(), 'closeEditModal');
    mountWrapper.instance().closeEditModal();
    expect(closeEditModalSpy).toHaveBeenCalled();
    expect(mountWrapper.state().modifyModalIsOpen).toBe(false);
  });
  it('should render connected component properly', () => {
    const connectedWrapper = shallow(<ConnectedOrderHistoryContent {...props} store={store} />);
    expect(connectedWrapper.length).toBe(1);
  });
});
