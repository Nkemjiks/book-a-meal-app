import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NotFound from '../../components/NotFound';

Enzyme.configure({ adapter: new Adapter() });

describe('LandingPage Component', () => {
  it('renders page Landing Page', () => {
    const wrapper = shallow(<NotFound />);
    expect((wrapper).find('div').length).toBe(1);
    expect((wrapper).find('h1').first().text()).toBe('404');
    expect((wrapper).find('h2').first().text()).toBe('Page Not Found');
  });
});
