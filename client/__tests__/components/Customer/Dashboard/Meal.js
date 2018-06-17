import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { Meal } from '../../../../components/Customer/Dashboard/Meal';

const props = {
  addMealToCart: jest.fn(),
  meal: {
    name: 'Akara and Bread',
    imageURL: 'http://res.cloudinary.com/dqsmurjpg/image/upload/v1528629249/mfubswklwgzblxqdb3c1.jpg',
    price: 500,
    menuItems: {
      createdAt: '2018-06-16T09:48:29.287Z',
      updatedAt: '2018-06-16T09:48:29.287Z',
      mealId: '7eeebb0e-74a2-4d3e-8f9e-afd51806ddce',
      menuId: '196b4ad5-7e15-44b5-a0fd-478763c751d5',
    },
  },
};

Enzyme.configure({ adapter: new Adapter() });

describe('Dashboard Component', () => {
  const wrapper = shallow(<Meal {...props} />);
  it('should render unconnected component properly', () => {
    expect(wrapper.find('#meal-info').length).toBe(1);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('i').length).toBe(1);
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('strong').length).toBe(1);
    expect(wrapper.find('strong').first().text()).toBe('Akara and Bread');
  });
  it('should call handleClick to update parent state', () => {
    const handleClickSpy = jest.spyOn(wrapper.instance(), 'handleClick');
    const addMealToCartSpy = jest.spyOn(wrapper.instance().props, 'addMealToCart');
    const event = {
      target: {
        name: 'id',
        value: '7eeebb0e-74a2-4d3e-8f9e-afd51806ddce',
      },
    };
    wrapper.instance().handleClick(event);
    expect(wrapper).toBeDefined();
    expect(handleClickSpy).toHaveBeenCalled();
    expect(addMealToCartSpy).toHaveBeenCalled();
  });
});
