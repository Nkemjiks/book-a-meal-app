import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dashboard from '../../components/Customer/Dashboard';
import ManageMeal from '../../components/Caterer/ManageMeal';
import { UserProtected, RoleProtected } from '../../components/Protect';

Enzyme.configure({ adapter: new Adapter() });

describe('Protect Component', () => {
  it('renders UserProtected component', () => {
    const wrapper = shallow(<UserProtected path="/customer/dashboard/0" component={Dashboard} />);
    expect(wrapper).toBeDefined();
  });
  it('renders RoleProtected component', () => {
    const wrapper = shallow(<RoleProtected path="/caterer/meal" component={ManageMeal} />);
    expect(wrapper).toBeDefined();
  });
});
