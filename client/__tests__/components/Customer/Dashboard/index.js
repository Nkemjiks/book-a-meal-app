import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedAvaliableMenu, { AvaliableMenu } from '../../../../components/Customer/Dashboard';
import userInformation from '../../../../mocks/userInformation';
import { menu } from '../../../../mocks/menu';

const props = {
  getUserDetailsAction: jest.fn(),
  getAllMenuAction: jest.fn(),
  refreshTokenRequest: jest.fn(),
  history: {
    push: jest.fn(),
  },
  allMenu: menu,
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
    allMenu: [],
  },
});


describe('Meals Component', () => {
  const mountWrapper = mount(<AvaliableMenu {...props} />);
  it('should render unconnected component properly', () => {
    expect(mountWrapper.find('#customer-dashboard').length).toBe(1);
    expect(mountWrapper.find('h1').length).toBe(1);
    expect(mountWrapper.find('div').length).toBe(12);
  });
  it('should call component did mount to dispatch action', () => {
    const getUserDetailsActionSpy = jest.spyOn(mountWrapper.instance().props, 'getUserDetailsAction');
    const getAllMenuActionSpy = jest.spyOn(mountWrapper.instance().props, 'getAllMenuAction');
    expect(mountWrapper).toBeDefined();
    expect(mountWrapper.state().allMenu).not.toBe([]);
    expect(getUserDetailsActionSpy).toHaveBeenCalled();
    expect(getAllMenuActionSpy).toHaveBeenCalled();
  });
  it('should render connected component properly', () => {
    const connectedWrapper = shallow(<ConnectedAvaliableMenu {...props} store={store} />);
    expect(connectedWrapper.length).toBe(1);
  });
});
