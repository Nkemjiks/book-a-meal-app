import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedMealsAdded, { MealsAdded } from '../../../../components/Caterer/ManageMeal/MealsAdded';
import userInformation from '../../../../mocks/userInformation';
import localStorageMock from '../../../../mocks/localStoragemock';
import createModalDomNode from '../../../../mocks/createModalDomNode';
import { meals } from '../../../../mocks/catererMealDetails';

window.localStorage = localStorageMock;

const props = {
  modifyMealAction: jest.fn(),
  getMealsAction: jest.fn(),
  deleteMealAction: jest.fn(),
  imageUploadAction: jest.fn(),
  meal: {
    id: '187f9c04-1eb0-4237-9c4a-f3c08e9bca25',
    name: 'Potato Chips',
    imageURL: 'http://res.cloudinary.com/dqsmurjpg/image/upload/v1528622614/d7tsvgmvaixm6mepkiy4.jpg',
    price: 800,
  },
  meals,
};

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = mockStore({
  userInformation,
  getAllMenu: {
    allMenu: [],
  },
  getMeals: {
    meals: {},
  },
  singleRequest: {
    mealModified: false,
  },
  imageUpload: {
    imageURL: '',
  },
  uploadProgress: {
    imageUploadProgress: 0,
  },
});


describe('ManageMenu Component', () => {
  createModalDomNode();
  const mountWrapper = mount(<MealsAdded {...props} />);
  it('should render unconnected component properly', () => {
    expect(mountWrapper.find('img').length).toBe(1);
    expect(mountWrapper.find('i').length).toBe(2);
    expect(mountWrapper.find('div').length).toBe(3);
  });
  it('should update state when menu is passed as a prop', () => {
    mountWrapper.setProps({ imageUploadProgress: 80 });
  });
  it('should update state when menu is passed as a prop', () => {
    mountWrapper.setProps({ mealDeleted: true });
  });
  it('should update state when menu is passed as a prop', () => {
    mountWrapper.setProps({ mealModified: true });
  });
  it('should call the handle change method to update state', () => {
    const handleChangeSpy = jest.spyOn(mountWrapper.instance(), 'handleChange');
    const event = {
      target: {
        name: 'mealName',
        value: 'Bread',
      },
    };
    mountWrapper.instance().handleChange(event);
    expect(mountWrapper.state().mealName).toBe('Bread');
    expect(handleChangeSpy).toHaveBeenCalled();
  });
  it('should call the imageUploadHandler method to update state', () => {
    const imageUploadHandlerSpy = jest.spyOn(mountWrapper.instance(), 'imageUploadHandler');
    const imageUploadActionSpy = jest.spyOn(mountWrapper.instance().props, 'imageUploadAction');
    const event = {
      preventDefault: jest.fn(),
    };
    mountWrapper.instance().imageUploadHandler(event);
    expect(imageUploadHandlerSpy).toHaveBeenCalled();
    expect(imageUploadActionSpy).toHaveBeenCalled();
  });
  it('should call the selectFileHandler method to update state', () => {
    const selectFileHandlerSpy = jest.spyOn(mountWrapper.instance(), 'selectFileHandler');
    const event = {
      target: {
        files: ['riceandbeans.jpg'],
      },
    };
    mountWrapper.instance().selectFileHandler(event);
    expect(mountWrapper.state().selectedFile).toBe('riceandbeans.jpg');
    expect(selectFileHandlerSpy).toHaveBeenCalled();
  });
  it('should call the openEditModal method to update state', () => {
    const openEditModalSpy = jest.spyOn(mountWrapper.instance(), 'openEditModal');
    const event = {
      target: {
        id: '187f9c04-1eb0-4237-9c4a-f3c08e9bca25',
      },
    };
    mountWrapper.instance().openEditModal(event);
    expect(openEditModalSpy).toHaveBeenCalled();
    expect(mountWrapper.state().mealId).toBe('187f9c04-1eb0-4237-9c4a-f3c08e9bca25');
  });
  it('should call the openDeleteModal method to update state', () => {
    const openDeleteModalSpy = jest.spyOn(mountWrapper.instance(), 'openDeleteModal');
    const event = {
      target: {
        id: '187f9c04-1eb0-4237-9c4a-f3c08e9bca25',
      },
    };
    mountWrapper.instance().openDeleteModal(event);
    expect(openDeleteModalSpy).toHaveBeenCalled();
    expect(mountWrapper.state().mealId).toBe('187f9c04-1eb0-4237-9c4a-f3c08e9bca25');
  });
  it('should call the closeEditModal method to update state', () => {
    const closeEditModalSpy = jest.spyOn(mountWrapper.instance(), 'closeEditModal');
    mountWrapper.instance().closeEditModal();
    expect(closeEditModalSpy).toHaveBeenCalled();
    expect(mountWrapper.state().modifyModalIsOpen).toBe(false);
  });
  it('should call the closeDeleteModal method to update state', () => {
    const closeDeleteModalSpy = jest.spyOn(mountWrapper.instance(), 'closeDeleteModal');
    mountWrapper.instance().closeDeleteModal();
    expect(closeDeleteModalSpy).toHaveBeenCalled();
    expect(mountWrapper.state().deleteModalIsOpen).toBe(false);
  });
  it('should call the handleDeleteMeal method to delete meal', () => {
    const handleDeleteMealSpy = jest.spyOn(mountWrapper.instance(), 'handleDeleteMeal');
    const deleteMealActionSpy = jest.spyOn(mountWrapper.instance().props, 'deleteMealAction');
    const event = {
      preventDefault: jest.fn(),
    };
    mountWrapper.instance().handleDeleteMeal(event);
    expect(handleDeleteMealSpy).toHaveBeenCalled();
    expect(deleteMealActionSpy).toHaveBeenCalled();
  });
  it('should call the handleModifyMeal to an empty meal', () => {
    const handleModifyMealSpy = jest.spyOn(mountWrapper.instance(), 'handleModifyMeal');
    const modifyMealActionSpy = jest.spyOn(mountWrapper.instance().props, 'modifyMealAction');
    mountWrapper.setState({
      mealName: '',
    });
    const event = {
      preventDefault: jest.fn(),
    };
    mountWrapper.instance().handleModifyMeal(event);
    expect(handleModifyMealSpy).toHaveBeenCalled();
    expect(modifyMealActionSpy).not.toHaveBeenCalled();
  });
  it('should call the handleModifyMeal to modify a meal with the same meal detail', () => {
    const handleModifyMealSpy = jest.spyOn(mountWrapper.instance(), 'handleModifyMeal');
    const modifyMealActionSpy = jest.spyOn(mountWrapper.instance().props, 'modifyMealAction');
    mountWrapper.setState({
      mealName: 'Potato Chips',
      price: 800,
    });
    const event = {
      preventDefault: jest.fn(),
    };
    mountWrapper.instance().handleModifyMeal(event);
    expect(handleModifyMealSpy).toHaveBeenCalled();
    expect(modifyMealActionSpy).not.toHaveBeenCalled();
  });
  it('should call the handleModifyMeal to modify a meal with new meal details', () => {
    const handleModifyMealSpy = jest.spyOn(mountWrapper.instance(), 'handleModifyMeal');
    const modifyMealActionSpy = jest.spyOn(mountWrapper.instance().props, 'modifyMealAction');
    mountWrapper.setState({
      mealName: 'Rice and Beans',
      price: 400,
    });
    const event = {
      preventDefault: jest.fn(),
    };
    mountWrapper.instance().handleModifyMeal(event);
    expect(handleModifyMealSpy).toHaveBeenCalled();
    expect(modifyMealActionSpy).toHaveBeenCalled();
  });
  it('should render connected component properly', () => {
    const connectedWrapper = shallow(<ConnectedMealsAdded {...props} store={store} />);
    expect(connectedWrapper.length).toBe(1);
  });
});
