import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { CartContent } from '../../../../components/Customer/Dashboard/CartContent';

const props = {
  getQuantity: jest.fn(),
  removeMealFromCart: jest.fn(),
  meal: { mealId: '7eeebb0e-74a2-4d3e-8f9e-afd51806ddce', mealName: 'Akara and Cornflakes', mealPrice: 500 },
};

Enzyme.configure({ adapter: new Adapter() });

describe('CartContent Component', () => {
  const wrapper = shallow(<CartContent {...props} />);
  it('should render unconnected component properly', () => {
    expect(wrapper.find('.cart-order').length).toBe(1);
    expect(wrapper.find('p').length).toBe(2);
    expect(wrapper.find('i').length).toBe(1);
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('.cartdetails').first().text()).toBe('Akara and Cornflakes');
  });
  it('should call handleClick to update parent state', () => {
    const handleChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange');
    const handleRemoveSpy = jest.spyOn(wrapper.instance(), 'handleRemove');
    const getQuantitySpy = jest.spyOn(wrapper.instance().props, 'getQuantity');
    const removeMealFromCartSpy = jest.spyOn(wrapper.instance().props, 'removeMealFromCart');
    const event = {
      target: {
        name: 'id',
        value: '7eeebb0e-74a2-4d3e-8f9e-afd51806ddce',
      },
    };
    wrapper.instance().handleChange(event);
    wrapper.instance().handleRemove(event);
    expect(wrapper).toBeDefined();
    expect(handleChangeSpy).toHaveBeenCalled();
    expect(handleRemoveSpy).toHaveBeenCalled();
    expect(getQuantitySpy).toHaveBeenCalled();
    expect(removeMealFromCartSpy).toHaveBeenCalled();
  });
});
