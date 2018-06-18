import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import localStorageMock from '../../mocks/localStoragemock';
import Dashboard from '../../components/Customer/Dashboard';
import ManageMeal from './Caterer/ManageMeal';
import { UserProtected, RoleProtected } from '../../components/Protect';

Enzyme.configure({ adapter: new Adapter() });

window.localStorage = localStorageMock;

describe('Protect Component', () => {
  it('renders page Landing Page', () => {
    const wrapper = shallow(<UserProtected path="/customer/dashboard" component={Dashboard} />);
    expect(wrapper).toBeDefined();
  });
  it('renders page Landing Page', () => {
    const wrapper = shallow(<RoleProtected path="/caterer/meal" component={ManageMeal} />);
    expect(wrapper).toBeDefined();
  });
});
