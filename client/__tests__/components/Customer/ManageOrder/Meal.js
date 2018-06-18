import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { Meal } from '../../../../components/Customer/ManageOrder/Meal';

const props = {
  getQuantity: jest.fn(),
  meal: {
    id: '7eeebb0e-74a2-4d3e-8f9e-afd51806ddce',
    name: 'Akara and Cornflakes',
    imageURL: 'http://res.cloudinary.com/dqsmurjpg/image/upload/v1528629249/mfubswklwgzblxqdb3c1.jpg',
    price: 500,
    isDeleted: false,
    orderItems: {
      quantity: 4,
      createdAt: '2018-06-10T17:37:02.115Z',
      updatedAt: '2018-06-10T20:29:32.939Z',
      mealId: '7eeebb0e-74a2-4d3e-8f9e-afd51806ddce',
      orderId: '5f6b6b16-a20e-4f9d-9559-9812ad7ad030',
    },
  },
};

Enzyme.configure({ adapter: new Adapter() });

describe('Meal Component', () => {
  const wrapper = shallow(<Meal {...props} />);
  it('should render unconnected component properly', () => {
    expect(wrapper.find('.cart-order').length).toBe(1);
    expect(wrapper.find('p').length).toBe(2);
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('p').first().text()).toBe('Akara and Cornflakes');
  });
  it('should call handleClick to update parent state', () => {
    const handleChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange');
    const getQuantitySpy = jest.spyOn(wrapper.instance().props, 'getQuantity');
    const event = {
      target: {
        name: 'quatity',
        value: '5',
      },
    };
    wrapper.instance().handleChange(event);
    expect(wrapper).toBeDefined();
    expect(handleChangeSpy).toHaveBeenCalled();
    expect(getQuantitySpy).toHaveBeenCalled();
  });
});
