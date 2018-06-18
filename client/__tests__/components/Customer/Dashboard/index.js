import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedDashboard, { Dashboard } from '../../../../components/Customer/Dashboard';
import userInformation from '../../../../mocks/userInformation';
import localStorageMock from '../../../../mocks/localStoragemock';
import menu from '../../../../mocks/menu';

window.localStorage = localStorageMock;

const props = {
  getUserDetailsAction: jest.fn(),
  placeOrderAction: jest.fn(),
  getAllMenuAction: jest.fn(),
  refreshTokenRequest: jest.fn(),
  history: {},
  allMenu: menu,
  orderPlaced: true,
};

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = mockStore({
  userInformation,
  getAllMenu: {
    allMenu: [],
  },
  singleRequest: {
    orderPlaced: false,
  },
});


describe('Dashboard Component', () => {
  const mountWrapper = mount(<Dashboard {...props} />);
  it('should render unconnected component properly', () => {
    expect(mountWrapper.find('#customer-dashboard-flex').length).toBe(1);
    expect(mountWrapper.find('#menu').length).toBe(1);
    expect(mountWrapper.find('h1').length).toBe(2);
    expect(mountWrapper.find('h4').length).toBe(8);
    expect(mountWrapper.find('div').length).toBe(19);
    expect(mountWrapper.find('p').first().text()).toBe('Opening Hours: 9:00AM - 4:00PM');
    expect(mountWrapper.find('#cart').length).toBe(1);
    expect(mountWrapper.find('#items').length).toBe(1);
    expect(mountWrapper.find('input').length).toBe(1);
    expect(mountWrapper.find('button').length).toBe(1);
    expect(mountWrapper.find('button').text()).toBe('Place Order');
  });
  it('should call component did mount to dispatch action', () => {
    const getUserDetailsActionSpy = jest.spyOn(mountWrapper.instance().props, 'getUserDetailsAction');
    const getAllMenuActionSpy = jest.spyOn(mountWrapper.instance().props, 'getAllMenuAction');
    expect(mountWrapper).toBeDefined();
    expect(mountWrapper.state().allMenu).not.toBe([]);
    expect(getUserDetailsActionSpy).toHaveBeenCalled();
    expect(getAllMenuActionSpy).toHaveBeenCalled();
  });
  it('should call the add meal to cart method and update state', () => {
    const addMealToCartSpy = jest.spyOn(mountWrapper.instance(), 'addMealToCart');
    const getTotalSpy = jest.spyOn(mountWrapper.instance(), 'getTotal');
    mountWrapper.instance().addMealToCart('7eeebb0e-74a2-4d3e-8f9e-afd51806ddce', 'Akara and Cornflakes', 500);
    mountWrapper.instance().getTotal();
    mountWrapper.setState({
      order: [{ mealId: '7eeebb0e-74a2-4d3e-8f9e-afd51806ddce', quantity: 1 }],
      mealDetails: [{ mealPrice: 500, quantity: 1 }],
      selectedMeal: [{ mealId: '7eeebb0e-74a2-4d3e-8f9e-afd51806ddce', mealName: 'Akara and Cornflakes', mealPrice: 500 }],
    });
    expect(addMealToCartSpy).toHaveBeenCalled();
    expect(getTotalSpy).toHaveBeenCalled();
    expect(mountWrapper.state().order[0].quantity).toBe(1);
    expect(mountWrapper.state().selectedMeal[0].mealName).toBe('Akara and Cornflakes');
    expect(mountWrapper.state().mealDetails[0].quantity).toBe(1);
  });
  it('should call the add meal to cart method with the same meal update state for isAlreadyAdded', () => {
    const addMealToCartSpy = jest.spyOn(mountWrapper.instance(), 'addMealToCart');
    const getTotalSpy = jest.spyOn(mountWrapper.instance(), 'getTotal');
    mountWrapper.instance().addMealToCart('7eeebb0e-74a2-4d3e-8f9e-afd51806ddce', 'Akara and Cornflakes', 500);
    mountWrapper.instance().getTotal();
    mountWrapper.setState({
      order: [{ mealId: '7eeebb0e-74a2-4d3e-8f9e-afd51806ddce', quantity: 1 }],
      mealDetails: [{ mealPrice: 500, quantity: 1 }],
      selectedMeal: [{ mealId: '7eeebb0e-74a2-4d3e-8f9e-afd51806ddce', mealName: 'Akara and Cornflakes', mealPrice: 500 }],
    });
    expect(addMealToCartSpy).toHaveBeenCalled();
    expect(getTotalSpy).toHaveBeenCalled();
    expect(mountWrapper.state().order[0].quantity).toBe(1);
    expect(mountWrapper.state().isAlreadyAdded).toBe(true);
    expect(mountWrapper.state().selectedMeal[0].mealName).toBe('Akara and Cornflakes');
    expect(mountWrapper.state().mealDetails[0].quantity).toBe(1);
  });
  it('should call the get quantity method and update state', () => {
    const getQuantitySpy = jest.spyOn(mountWrapper.instance(), 'getQuantity');
    const getTotalSpy = jest.spyOn(mountWrapper.instance(), 'getTotal');
    mountWrapper.instance().getQuantity('7eeebb0e-74a2-4d3e-8f9e-afd51806ddce', 4, 500);
    mountWrapper.instance().getTotal();
    expect(getQuantitySpy).toHaveBeenCalled();
    expect(getTotalSpy).toHaveBeenCalled();
    expect(mountWrapper.state().order[0].quantity).toBe(4);
    expect(mountWrapper.state().mealDetails[0].mealPrice).toBe(500);
    expect(mountWrapper.state().total).toBe(2000);
  });
  it('should call the remove meal from cart method and update state', () => {
    jest.useFakeTimers();
    const removeMealFromCartSpy = jest.spyOn(mountWrapper.instance(), 'removeMealFromCart');
    const getTotalSpy = jest.spyOn(mountWrapper.instance(), 'getTotal');
    mountWrapper.instance().removeMealFromCart('7eeebb0e-74a2-4d3e-8f9e-afd51806ddce');
    mountWrapper.instance().getTotal();
    expect(removeMealFromCartSpy).toHaveBeenCalled();
    expect(getTotalSpy).toHaveBeenCalled();
    expect(mountWrapper.state().order[0]).toBe(undefined);
    expect(mountWrapper.state().mealDetails[0]).toBe(undefined);
    expect(mountWrapper.state().total).toBe(0);
    jest.runAllTimers();
  });
  it('should call the handle change method to update state', () => {
    const handleChangeSpy = jest.spyOn(mountWrapper.instance(), 'handleChange');
    const event = {
      target: {
        name: 'address',
        value: '12B Agege',
      },
    };
    mountWrapper.instance().handleChange(event);
    expect(mountWrapper.state().deliveryAddress).toBe('12B Agege');
    expect(handleChangeSpy).toHaveBeenCalled();
  });
  it('should call the action with an order', () => {
    const handleSubmitSpy = jest.spyOn(mountWrapper.instance(), 'handleSubmit');
    const placeOrderActionSpy = jest.spyOn(mountWrapper.instance().props, 'placeOrderAction');
    const submitButton = mountWrapper.find('.button').first();
    const event = {
      preventDefault: jest.fn(),
    };
    submitButton.simulate('click', event);
    mountWrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(placeOrderActionSpy).toHaveBeenCalled();
  });
  it('should render connected component properly', () => {
    const connectedWrapper = shallow(<ConnectedDashboard {...props} store={store} />);
    expect(connectedWrapper.length).toBe(1);
  });
});
