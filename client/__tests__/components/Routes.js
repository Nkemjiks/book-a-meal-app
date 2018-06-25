import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Routes from '../../components/Routes';

Enzyme.configure({ adapter: new Adapter() });

const wrapper = shallow(<Routes />);

describe('Route Component', () => {
  it('renders Route component correctly', () => {
    expect((wrapper).find('Provider').length).toBe(1);
    expect((wrapper).find('Router').length).toBe(1);
    expect((wrapper).find('Switch').length).toBe(1);
    expect((wrapper).find('Route').length).toBe(4);
    expect((wrapper).find('UserProtected').length).toBe(2);
    expect((wrapper).find('RoleProtected').length).toBe(3);
  });
});
