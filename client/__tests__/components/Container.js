import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Container from '../../components/Container';

Enzyme.configure({ adapter: new Adapter() });

describe('Container Component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Container />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders page Route', () => {
    const wrapper = shallow(<Container />);
    expect((wrapper).find('Provider').length).toBe(1);
    expect((wrapper).find('Router').length).toBe(1);
    expect((wrapper).find('Switch').length).toBe(1);
    expect((wrapper).find('Route').length).toBe(1);
  });
});
