import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LandingPage from '../../components/LandingPage';

Enzyme.configure({ adapter: new Adapter() });

describe('LandingPage Component', () => {
  it('renders Landing Page correctly', () => {
    const wrapper = shallow(<LandingPage />);
    expect((wrapper).find('#app-summary').length).toBe(1);
    expect((wrapper).find('#steps').length).toBe(1);
    expect((wrapper).find('div').length).toBe(5);
    expect((wrapper).find('p').length).toBe(5);
    expect((wrapper).find('span').length).toBe(2);
    expect((wrapper).find('h1').first().text()).toBe('Register to Order a Meal');
    expect((wrapper).find('p').at(1).text()).toBe('Sign up');
    expect((wrapper).find('p').at(2).text()).toBe('Place Your Order');
    expect((wrapper).find('p').last().text()).toBe('Simply sign up to begin');
  });
});
