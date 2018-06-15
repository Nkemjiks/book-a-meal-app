import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Routes from '../../components/Routes';

Enzyme.configure({ adapter: new Adapter() });

const wrapper = shallow(<Routes />);

describe('Container Component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders page Route', () => {
    expect((wrapper).find('Provider').length).toBe(1);
    expect((wrapper).find('Router').length).toBe(1);
    expect((wrapper).find('Switch').length).toBe(1);
    expect((wrapper).find('Route').length).toBe(4);
    expect((wrapper).find('UserProtected').length).toBe(2);
    expect((wrapper).find('RoleProtected').length).toBe(3);
  });
});
