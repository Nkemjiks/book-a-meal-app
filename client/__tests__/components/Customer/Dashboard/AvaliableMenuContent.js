import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedAvaliableMenuContent, { AvaliableMenuContent } from '../../../../components/Customer/Dashboard/AvaliableMenuContent';
import userInformation from '../../../../mocks/userInformation';
import { menuCaterer } from '../../../../mocks/menu';

const props = {
  getUserDetailsAction: jest.fn(),
  getAllMenuAction: jest.fn(),
  refreshTokenRequest: jest.fn(),
  history: {
    push: jest.fn(),
  },
  menu: menuCaterer,
  match: {
    params: {
      id: 30,
    },
  },
};

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = mockStore({
  userInformation,
  getAllMenu: {
    mealsInMenu: [],
  },
});


describe('Meals Component', () => {
  const mountWrapper = mount(<AvaliableMenuContent {...props} />);
  it('should render unconnected component properly', () => {
    expect(mountWrapper.find('#menu-info').length).toBe(1);
    expect(mountWrapper.find('h3').length).toBe(1);
    expect(mountWrapper.find('div').length).toBe(3);
    expect(mountWrapper.find('p').length).toBe(1);
  });
  it('should call the handle click method and load the meals page', () => {
    const handleClickSpy = jest.spyOn(mountWrapper.instance(), 'handleClick');
    mountWrapper.instance().handleClick();
    expect(handleClickSpy).toHaveBeenCalled();
  });
  it('should render connected component properly', () => {
    const connectedWrapper = shallow(<ConnectedAvaliableMenuContent {...props} store={store} />);
    expect(connectedWrapper.length).toBe(1);
  });
});
