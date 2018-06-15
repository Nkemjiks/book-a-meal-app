import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedNavbar, { Navbar } from '../../components/Navbar';
import localStorageMock from '../__mocks__/localStoragemock';
import userInformation from '../__mocks__/userInformation';
import { defaultProps, customerUserProps, catererUserProps, catererProps } from '../__mocks__/navbarProps';

const props = {
  updateUserRoleAction: jest.fn(),
  history: {
    push: jest.fn(),
  },
  location: {
    pathname: '/',
  },
};


Enzyme.configure({ adapter: new Adapter() });


const mockStore = configureMockStore();
const store = mockStore({ userInformation });
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Navbar Component', () => {
  it('should render unconnected component properly', () => {
    const wrapper = shallow(<Navbar {...defaultProps} />);
    expect(wrapper.find('#nav').length).toBe(1);
    expect(wrapper.find('img').length).toBe(1);
  });
  it('should render a navabar component with a login and signup button properly', () => {
    const wrapper = shallow(<Navbar {...defaultProps} />);
    expect(wrapper.find('Link').length).toBe(3);
    expect(wrapper.find('button').length).toBe(2);
    expect(wrapper.find('button').first().text()).toBe('LOGIN');
    expect(wrapper.find('button').last().text()).toBe('SIGN UP');
  });
  it('should render a navabar component with a dropdown and a link to become a caterer', () => {
    const wrapper = shallow(<Navbar {...customerUserProps} />);
    expect(wrapper.find('Link').length).toBe(3);
    expect(wrapper.find('button').length).toBe(2);
    expect(wrapper.find('button').first().text()).toBe('Become a Caterer');
    expect(wrapper.find('button').last().text()).toBe('Logout');
  });
  it('should render a navabar component with a dropdown and a link to caterer panel', () => {
    const wrapper = shallow(<Navbar {...catererUserProps} />);
    expect(wrapper.find('Link').length).toBe(4);
    expect(wrapper.find('i').length).toBe(2);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').last().text()).toBe('Logout');
  });
  it('should render a navabar component with a dropdown and a link to caterer panel', () => {
    const wrapper = shallow(<Navbar {...catererProps} />);
    expect(wrapper.find('i').length).toBe(1);
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('Link').length).toBe(8);
    expect(wrapper.find('button').length).toBe(4);
    expect(wrapper.find('button').last().text()).toBe('Manage Meals');
  });
  it('should call the handle change method to update state', () => {
    const wrapper = shallow(<Navbar {...customerUserProps} />);
    const handleLogoutSpy = jest.spyOn(wrapper.instance(), 'handleLogout');
    const historySpy = jest.spyOn(wrapper.instance().props.history, 'push');
    wrapper.instance().handleLogout();
    expect(handleLogoutSpy).toHaveBeenCalled();
    expect(historySpy).toHaveBeenCalled();
  });
  it('should call the handle change method to update state', () => {
    const wrapper = shallow(<Navbar {...customerUserProps} />);
    const handleRoleUpdateSpy = jest.spyOn(wrapper.instance(), 'handleRoleUpdate');
    const updateUserRoleActionSpy = jest.spyOn(wrapper.instance().props, 'updateUserRoleAction');
    const roleUpdateButton = wrapper.find('.logout').first();
    roleUpdateButton.simulate('click');
    wrapper.instance().handleRoleUpdate();
    expect(handleRoleUpdateSpy).toHaveBeenCalled();
    expect(updateUserRoleActionSpy).toHaveBeenCalled();
  });
  it('should render connected component properly', () => {
    const connectedWrapper = shallow(<ConnectedNavbar {...props} store={store} />);
    expect(connectedWrapper.length).toBe(1);
  });
});
