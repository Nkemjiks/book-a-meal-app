import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedManageMeal, { ManageMeal } from '../../../../components/Caterer/ManageMeal';
import userInformation from '../../../../mocks/userInformation';
import localStorageMock from '../../../../mocks/localStoragemock';
import { meals } from '../../../../mocks/catererMealDetails';

window.localStorage = localStorageMock;

const props = {
  getUserDetailsAction: jest.fn(),
  getMealsAction: jest.fn(),
  addMealAction: jest.fn(),
  imageUploadAction: jest.fn(),
  history: {},
  meals,
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
  uploadProgress: {
    imageUploadProgress: 0,
  },
});


describe('ManageMeal Component', () => {
  const wrapper = shallow(<ManageMeal {...props} />);
  it('should render unconnected component properly', () => {
    expect(wrapper.find('.dashboard').length).toBe(1);
    expect(wrapper.find('h1').length).toBe(2);
    expect(wrapper.find('h4').length).toBe(4);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('input').length).toBe(3);
    expect(wrapper.find('div').length).toBe(6);
    expect(wrapper.find('h1').first().text()).toBe('Add Meal');
    expect(wrapper.find('button').length).toBe(2);
  });
  it('should call the handle change method to update state', () => {
    const handleChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange');
    const firstEvent = {
      target: {
        name: 'mealName',
        value: 'Rice and Beans',
      },
    };
    const secondEvent = {
      target: {
        name: 'price',
        value: 300,
      },
    };
    wrapper.instance().handleChange(firstEvent);
    wrapper.instance().handleChange(secondEvent);
    expect(wrapper.state().mealName).toBe('Rice and Beans');
    expect(wrapper.state().price).toBe(300);
    expect(handleChangeSpy).toHaveBeenCalled();
  });
  it('should call the selectFileHandler method to update state', () => {
    const selectFileHandlerSpy = jest.spyOn(wrapper.instance(), 'selectFileHandler');
    const event = {
      target: {
        files: ['riceandbeans.jpg'],
      },
    };
    wrapper.instance().selectFileHandler(event);
    expect(wrapper.state().selectedFile).toBe('riceandbeans.jpg');
    expect(selectFileHandlerSpy).toHaveBeenCalled();
  });
  it('should call the imageUploadHandler method to update state', () => {
    const imageUploadHandlerSpy = jest.spyOn(wrapper.instance(), 'imageUploadHandler');
    const imageUploadActionSpy = jest.spyOn(wrapper.instance().props, 'imageUploadAction');
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().imageUploadHandler(event);
    expect(imageUploadHandlerSpy).toHaveBeenCalled();
    expect(imageUploadActionSpy).toHaveBeenCalled();
  });
  it('should call the handleSubmit and return an error if one of the field is empty', () => {
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const addMealActionSpy = jest.spyOn(wrapper.instance().props, 'addMealAction');
    wrapper.setState({
      mealName: '',
    });
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(addMealActionSpy).not.toHaveBeenCalled();
  });
  it('should call the handleSubmit to add a new meal', () => {
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const addMealActionSpy = jest.spyOn(wrapper.instance().props, 'addMealAction');
    wrapper.setProps({ imageURL: 'www.image.com' });
    wrapper.setState({
      mealName: 'Rice and Beans',
    });
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(addMealActionSpy).toHaveBeenCalled();
  });
  it('should update state when a new meal is added successfully', () => {
    wrapper.setProps({ mealAdded: true });
    expect(wrapper.state().mealName).toBe('');
    expect(wrapper.state().price).toBe('');
    expect(wrapper.state().imageURL).toBe('');
    expect(wrapper.state().imageUploadProgress).toBe('');
  });
  it('should render connected component properly', () => {
    const connectedWrapper = shallow(<ConnectedManageMeal {...props} store={store} />);
    expect(connectedWrapper.length).toBe(1);
  });
});
