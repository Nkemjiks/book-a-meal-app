import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedSignup, { Signup } from '../../components/Signup';
import userInformation from '../__mocks__/userInformation';

const props = {
  signupAction: jest.fn(),
  history: {
    push: jest.fn(),
  },
};


Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = mockStore({ userInformation });
const wrapper = shallow(<Signup {...props} />);


describe('Signup Component', () => {
  it('should render unconnected component properly', () => {
    expect(wrapper.find('#signup-component').length).toBe(1);
    expect(wrapper.find('#signup-container').length).toBe(1);
    expect(wrapper.find('h1').first().text()).toBe('Sign Up Now');
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(5);
    expect(wrapper.find('button').length).toBe(1);
  });
  it('should call the handle change method to update state', () => {
    const handleChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange');
    const firstEvent = {
      target: {
        name: 'fullName',
        value: 'Mbonu',
      },
    };
    const secondEvent = {
      target: {
        name: 'phoneNumber',
        value: 90678099,
      },
    };
    wrapper.instance().handleChange(firstEvent);
    wrapper.instance().handleChange(secondEvent);
    expect(wrapper.state().fullName).toBe('Mbonu');
    expect(wrapper.state().phoneNumber).toBe(90678099);
    expect(handleChangeSpy).toHaveBeenCalled();
  });
  it('should not call the action with an empty email or password', () => {
    wrapper.setState({
      fullName: 'Jeremy John',
      email: '',
      phoneNumber: '',
      password: 'tester',
      address: '12B, Agege Road',
    });
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const signinSpy = jest.spyOn(wrapper.instance().props, 'signupAction');
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
      fullName: 'Jeremy John',
      email: 'jeremy@gmail.com',
      phoneNumber: 9072873939,
      password: 'tester',
      address: '12B, Agege Road',
    });
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const signinSpy = jest.spyOn(wrapper.instance().props, 'signupAction');
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
    const connectedWrapper = shallow(<ConnectedSignup {...props} store={store} />);
    expect(connectedWrapper.length).toBe(1);
  });
});
