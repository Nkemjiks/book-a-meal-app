import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { MealsAddedList } from '../../../../components/Caterer/ManageMeal/MealsAddedList';
import { meals } from '../../../../mocks/catererMealDetails';

const props = {
  meals,
};

Enzyme.configure({ adapter: new Adapter() });


describe('MealsAddedList Component', () => {
  const wrapper = shallow(<MealsAddedList {...props} />);
  it('should render unconnected component properly', () => {
    expect(wrapper).toBeDefined();
  });
});
