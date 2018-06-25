import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedLogin, { Login } from '../../components/Login';
import userInformation from '../../mocks/userInformation';

const props = {
  loginAction: jest.fn(),
  history: {
    push: jest.fn(),
  },
};


Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = mockStore({ userInformation });
const wrapper = shallow(<Login {...props} />);


describe('Login Component', () => {
  it('should render unconnected component properly', () => {
    expect(wrapper.find('#signin-component').length).toBe(1);
    expect(wrapper.find('#signin-container').length).toBe(1);
    expect(wrapper.find('h1').first().text()).toBe('Sign in');
    expect(wrapper.find('form').length).toBe(1);
  });
  it('should call the handle change method to update state', () => {
    const handleChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange');
    const firstEvent = {
      target: {
        name: 'email',
        value: 'mbonu',
      },
    };
    const secondEvent = {
      target: {
        name: 'password',
        value: 'test',
      },
    };
    wrapper.instance().handleChange(firstEvent);
    wrapper.instance().handleChange(secondEvent);
    expect(wrapper.state().email).toBe('mbonu');
    expect(wrapper.state().password).toBe('test');
    expect(handleChangeSpy).toHaveBeenCalled();
  });
  it('should not call the action with an empty email or password', () => {
    wrapper.setState({
      email: '',
      password: '',
    });
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const signinSpy = jest.spyOn(wrapper.instance().props, 'loginAction');
    const submitButton = wrapper.find('.button').first();
    const event = {
      preventDefault: jest.fn(),
    };
    submitButton.simulate('click', event);
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(signinSpy).not.toHaveBeenCalled();
  });

  it('should call the action with a valid email and password', () => {
    wrapper.setState({
      email: 'saidd@gmail.com',
      password: 'tester',
    });
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const signinSpy = jest.spyOn(wrapper.instance().props, 'loginAction');
    const submitButton = wrapper.find('.button').first();
    const event = {
      preventDefault: jest.fn(),
    };
    submitButton.simulate('click', event);
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(signinSpy).toHaveBeenCalled();
  });

  it('should render connected component properly', () => {
    const connectedWrapper = shallow(<ConnectedLogin {...props} store={store} />);
    expect(connectedWrapper.length).toBe(1);
  });
});
