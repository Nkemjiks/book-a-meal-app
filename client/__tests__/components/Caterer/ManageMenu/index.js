import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedManageMenu, { ManageMenu } from '../../../../components/Caterer/ManageMenu';
import userInformation from '../../../../mocks/userInformation';
import localStorageMock from '../../../../mocks/localStoragemock';
import { meals, menu } from '../../../../mocks/catererMealDetails';

window.localStorage = localStorageMock;

const props = {
  getUserDetailsAction: jest.fn(),
  getMealsAction: jest.fn(),
  getMenuAction: jest.fn(),
  createMenuAction: jest.fn(),
  history: {},
  meals,
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


describe('ManageMenu Component', () => {
  const mountWrapper = mount(<ManageMenu {...props} />);
  it('should render unconnected component properly', () => {
    expect(mountWrapper.find('.dashboard').length).toBe(1);
    expect(mountWrapper.find('h1').length).toBe(2);
    expect(mountWrapper.find('h4').length).toBe(7);
    expect(mountWrapper.find('div').length).toBe(24);
    expect(mountWrapper.find('p').first().text()).toBe('You have not set the menu');
    expect(mountWrapper.find('button').length).toBe(1);
  });
  it('should update state when menu is passed as a prop', () => {
    mountWrapper.setProps({ menu });
    expect(mountWrapper.state().menu.meals[0].name).toBe('Akara and Cornflakes');
  });
  it('should call the addMealIdToArray method and update state when a caterer checks a meal to update menu', () => {
    const addMealIdToArraySpy = jest.spyOn(mountWrapper.instance(), 'addMealIdToArray');
    mountWrapper.instance().addMealIdToArray('187f9c04-1eb0-4237-9c4a-f3c08e9bca25', true);
    mountWrapper.instance().addMealIdToArray('3735009d-269d-4f4d-a1c4-ef1adc1a36fc', true);
    expect(addMealIdToArraySpy).toHaveBeenCalled();
    expect(mountWrapper.state().menuIds.length).toBe(2);
  });
  it('should call the addMealIdToArray method and update state when a caterer wants unchecks a meal to update menu', () => {
    const addMealIdToArraySpy = jest.spyOn(mountWrapper.instance(), 'addMealIdToArray');
    mountWrapper.instance().addMealIdToArray('187f9c04-1eb0-4237-9c4a-f3c08e9bca25', false);
    expect(addMealIdToArraySpy).toHaveBeenCalled();
    expect(mountWrapper.state().menuIds.length).toBe(1);
  });
  it('should call the handleSubmit to update menu', () => {
    const handleSubmitSpy = jest.spyOn(mountWrapper.instance(), 'handleSubmit');
    const createMenuActionSpy = jest.spyOn(mountWrapper.instance().props, 'createMenuAction');
    mountWrapper.instance().handleSubmit();
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(createMenuActionSpy).toHaveBeenCalled();
  });
  it('should update state when menucreated is passed as a prop', () => {
    mountWrapper.setProps({ menuCreated: true });
    expect(mountWrapper.state().menuIds.length).toBe(0);
  });
  it('should render connected component properly', () => {
    const connectedWrapper = shallow(<ConnectedManageMenu {...props} store={store} />);
    expect(connectedWrapper.length).toBe(1);
  });
});
