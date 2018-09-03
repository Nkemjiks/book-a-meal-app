import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedNavbar, { Navbar } from '../../components/Navbar';
import userInformation from '../../mocks/userInformation';
import createModalDomNode from '../../mocks/createModalDomNode';
import { defaultProps, customerUserProps, catererUserProps, catererProps } from '../../mocks/navbarProps';

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


describe('Navbar Component', () => {
  createModalDomNode();
  it('should render unconnected component properly', () => {
    const wrapper = shallow(<Navbar {...defaultProps} />);
    expect(wrapper.find('#nav').length).toBe(1);
    expect(wrapper.find('img').length).toBe(1);
  });
  it('should render a navabar component with a login and signup button properly', () => {
    const wrapper = shallow(<Navbar {...defaultProps} />);
    expect(wrapper.find('Link').length).toBe(3);
    expect(wrapper.find('button').length).toBe(4);
    expect(wrapper.find('button').last().text()).toBe('SIGN UP');
  });
  it('should render a navabar component with a dropdown and a link to become a caterer', () => {
    const wrapper = shallow(<Navbar {...customerUserProps} />);
    expect(wrapper.find('Link').length).toBe(3);
    expect(wrapper.find('button').length).toBe(4);
    expect(wrapper.find('button').first().text()).toBe('Upload');
    expect(wrapper.find('button').last().text()).toBe('Logout');
  });
  it('should render a navabar component with a dropdown and a link to caterer panel', () => {
    const wrapper = shallow(<Navbar {...catererUserProps} />);
    expect(wrapper.find('Link').length).toBe(4);
    expect(wrapper.find('i').length).toBe(1);
    expect(wrapper.find('button').length).toBe(3);
    expect(wrapper.find('button').last().text()).toBe('Logout');
  });
  it('should render a navabar component with a dropdown and a link to customer dashboard', () => {
    const wrapper = shallow(<Navbar {...catererProps} />);
    expect(wrapper.find('i').length).toBe(1);
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('Link').length).toBe(8);
    expect(wrapper.find('button').length).toBe(6);
    expect(wrapper.find('button').last().text()).toBe('Manage Meals');
  });
  it('should call the handle logout method to logout a user', () => {
    const wrapper = shallow(<Navbar {...customerUserProps} />);
    const handleLogoutSpy = jest.spyOn(wrapper.instance(), 'handleLogout');
    const historySpy = jest.spyOn(wrapper.instance().props.history, 'push');
    wrapper.instance().handleLogout();
    expect(handleLogoutSpy).toHaveBeenCalled();
    expect(historySpy).toHaveBeenCalled();
  });
  it('should call the handle change method to update state', () => {
    const wrapper = shallow(<Navbar {...customerUserProps} />);
    const handleChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange');
    const firstEvent = {
      target: {
        name: 'businessName',
        value: 'Danish Food',
      },
    };
    const secondEvent = {
      target: {
        name: 'businessAddress',
        value: '12B Agege',
      },
    };
    wrapper.instance().handleChange(firstEvent);
    wrapper.instance().handleChange(secondEvent);
    expect(wrapper.state().businessName).toBe('Danish Food');
    expect(wrapper.state().businessAddress).toBe('12B Agege');
    expect(handleChangeSpy).toHaveBeenCalled();
  });
  it('should call the selectFileHandler method to update state', () => {
    const wrapper = shallow(<Navbar {...customerUserProps} />);
    const selectFileHandlerSpy = jest.spyOn(wrapper.instance(), 'selectFileHandler');
    const event = {
      target: {
        files: ['logo.jpg'],
      },
    };
    wrapper.instance().selectFileHandler(event);
    expect(wrapper.state().selectedFile).toBe('logo.jpg');
    expect(selectFileHandlerSpy).toHaveBeenCalled();
  });
  it('should call the imageUploadHandler method to update state', () => {
    const wrapper = shallow(<Navbar {...customerUserProps} />);
    wrapper.setState({
      selectedFile: 'logo.jpg',
    });
    wrapper.setProps({
      imageUploadProgress: 45,
    });
    const imageUploadHandlerSpy = jest.spyOn(wrapper.instance(), 'imageUploadHandler');
    const imageUploadActionSpy = jest.spyOn(wrapper.instance().props, 'imageUploadAction');
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().imageUploadHandler(event);
    expect(imageUploadHandlerSpy).toHaveBeenCalled();
    expect(imageUploadActionSpy).toHaveBeenCalled();
  });
  it('should call the handle role update to update the user role', () => {
    const wrapper = shallow(<Navbar {...customerUserProps} />);
    wrapper.setProps({ imageURL: 'www.image.com' });
    wrapper.setState({
      businessName: 'Danish Food',
      businessAddress: '12B Agege',
    });
    const handleRoleUpdateSpy = jest.spyOn(wrapper.instance(), 'handleRoleUpdate');
    const updateUserRoleActionSpy = jest.spyOn(wrapper.instance().props, 'updateUserRoleAction');
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleRoleUpdate(event);
    expect(handleRoleUpdateSpy).toHaveBeenCalled();
    expect(updateUserRoleActionSpy).toHaveBeenCalled();
  });
  it('should call the openDeleteModal method to update state', () => {
    const wrapper = shallow(<Navbar {...customerUserProps} />);
    const openModalSpy = jest.spyOn(wrapper.instance(), 'openModal');
    wrapper.instance().openModal();
    expect(openModalSpy).toHaveBeenCalled();
    expect(wrapper.state().modalIsOpen).toBe(true);
  });
  it('should call the closeEditModal method to update state', () => {
    const wrapper = shallow(<Navbar {...customerUserProps} />);
    const closeModalSpy = jest.spyOn(wrapper.instance(), 'closeModal');
    wrapper.instance().closeModal();
    expect(closeModalSpy).toHaveBeenCalled();
    expect(wrapper.state().modalIsOpen).toBe(false);
  });
  it('should render connected component properly', () => {
    const connectedWrapper = shallow(<ConnectedNavbar {...props} store={store} />);
    expect(connectedWrapper.length).toBe(1);
  });
});
