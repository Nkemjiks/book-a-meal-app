import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import { MealsAvailable } from '../../../../components/Caterer/ManageMenu/MealsAvailable';

const props = {
  addMealIdToArray: jest.fn(),
  mealsInMenuId: ['ad0ea613-d643-4e4f-a5be-31dcc00ad654', '7eeebb0e-74a2-4d3e-8f9e-afd51806ddce'],
  meal: {
    id: '187f9c04-1eb0-4237-9c4a-f3c08e9bca25',
    name: 'Potato Chips',
    imageURL: 'http://res.cloudinary.com/dqsmurjpg/image/upload/v1528622614/d7tsvgmvaixm6mepkiy4.jpg',
    price: 800,
  },
};

Enzyme.configure({ adapter: new Adapter() });


describe('MealsAvailable Component', () => {
  const mountWrapper = mount(<MealsAvailable {...props} />);
  it('should render unconnected component properly', () => {
    expect(mountWrapper.find('p').length).toBe(2);
    expect(mountWrapper.find('img').length).toBe(1);
    expect(mountWrapper.find('div').length).toBe(3);
    expect(mountWrapper.find('input').length).toBe(1);
  });
  it('should call the handleClick method to update parent state', () => {
    const handleClickSpy = jest.spyOn(mountWrapper.instance(), 'handleClick');
    const addMealIdToArraySpy = jest.spyOn(mountWrapper.instance().props, 'addMealIdToArray');
    const event = {
      target: {
        id: '187f9c04-1eb0-4237-9c4a-f3c08e9bca25',
        checked: true,
      },
    };
    mountWrapper.instance().handleClick(event);
    expect(handleClickSpy).toHaveBeenCalled();
    expect(addMealIdToArraySpy).toHaveBeenCalled();
  });
});
