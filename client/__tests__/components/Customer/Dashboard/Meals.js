import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedMeals, { Meals } from '../../../../components/Customer/Dashboard/Meals';
import userInformation from '../../../../mocks/userInformation';
import { mainMenu } from '../../../../mocks/menu';

const response = {
  response: {
    status: 201,
  },
};

const promise = Promise.resolve(response);

const props = {
  getUserDetailsAction: jest.fn(),
  placeOrderAction: jest.fn(() => promise),
  getMealsInMenuAction: jest.fn(),
  refreshTokenRequest: jest.fn(),
  history: {},
  mealsInMenu: mainMenu,
  orderPlaced: false,
};

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = mockStore({
  userInformation,
  getAllMenu: {
    mealsInMenu: [],
  },
  singleRequest: {
    orderPlaced: false,
  },
});


describe('Meals Component', () => {
  const mountWrapper = mount(<Meals {...props} />);
  jest.useFakeTimers();
  it('should render unconnected component properly', () => {
    expect(mountWrapper.find('#customer-dashboard-flex').length).toBe(1);
    expect(mountWrapper.find('#menu').length).toBe(1);
    expect(mountWrapper.find('h1').length).toBe(1);
    expect(mountWrapper.find('div').length).toBe(17);
    expect(mountWrapper.find('#cart').length).toBe(1);
    expect(mountWrapper.find('#items').length).toBe(1);
    expect(mountWrapper.find('input').length).toBe(1);
    expect(mountWrapper.find('button').length).toBe(1);
    expect(mountWrapper.find('button').text()).toBe('Place Order');
  });
  it('should call component did mount to dispatch action', () => {
    const getUserDetailsActionSpy = jest.spyOn(mountWrapper.instance().props, 'getUserDetailsAction');
    const getMealsInMenuActionSpy = jest.spyOn(mountWrapper.instance().props, 'getMealsInMenuAction');
    expect(mountWrapper).toBeDefined();
    expect(mountWrapper.state().allMenu).not.toBe([]);
    expect(getUserDetailsActionSpy).toHaveBeenCalled();
    expect(getMealsInMenuActionSpy).toHaveBeenCalled();
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
  it('should call the add meal to cart method with the same meal and update state for isAlreadyAdded', () => {
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
    const removeMealFromCartSpy = jest.spyOn(mountWrapper.instance(), 'removeMealFromCart');
    const getTotalSpy = jest.spyOn(mountWrapper.instance(), 'getTotal');
    mountWrapper.instance().removeMealFromCart('7eeebb0e-74a2-4d3e-8f9e-afd51806ddce');
    mountWrapper.instance().getTotal();
    expect(removeMealFromCartSpy).toHaveBeenCalled();
    expect(getTotalSpy).toHaveBeenCalled();
    expect(mountWrapper.state().order[0]).toBe(undefined);
    expect(mountWrapper.state().mealDetails[0]).toBe(undefined);
    expect(mountWrapper.state().total).toBe(0);
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
    jest.runAllTimers();
  });
  it('should update state after order is placed', () => {
    mountWrapper.setProps({ orderPlaced: true });
    expect(mountWrapper.state().order[0]).toBe(undefined);
    expect(mountWrapper.state().mealDetails[0]).toBe(undefined);
    expect(mountWrapper.state().total).toBe(0);
    expect(mountWrapper.state().isAlreadyAdded).toBe(false);
    expect(mountWrapper.state().deliveryAddress).toBe('');
    expect(mountWrapper.state().selectedMeal[0]).toBe(undefined);
  });
  it('should render connected component properly', () => {
    const connectedWrapper = shallow(<ConnectedMeals {...props} store={store} />);
    expect(connectedWrapper.length).toBe(1);
  });
});
