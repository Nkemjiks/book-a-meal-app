export const defaultProps = {
  updateUserRoleAction: jest.fn(),
  history: {
    push: jest.fn(),
  },
  location: {
    pathname: '/',
  },
};
export const customerUserProps = {
  updateUserRoleAction: jest.fn(),
  history: {
    push: jest.fn(),
  },
  location: {
    pathname: '/customer/dashboard',
  },
  user: {
    id: '4094ad8a-be5e-43a4-8c58-3e0c680f5fc9',
    fullName: 'Andela Bayo',
    email: 'mbonunkemjika@ymail.com',
    phoneNumber: '2334',
    role: 'customer',
    address: '12B agege',
  },
  error: null,
};
export const catererUserProps = {
  updateUserRoleAction: jest.fn(),
  history: {
    push: jest.fn(),
  },
  location: {
    pathname: '/customer/dashboard',
  },
  user: {
    id: '4094ad8a-be5e-43a4-8c58-3e0c680f5fc9',
    fullName: 'Andela Bayo',
    email: 'mbonunkemjika@ymail.com',
    phoneNumber: '2334',
    role: 'caterer',
    address: '12B agege',
  },
  error: null,
};
export const catererProps = {
  updateUserRoleAction: jest.fn(),
  history: {
    push: jest.fn(),
  },
  location: {
    pathname: '/caterer/meal',
  },
  user: {
    id: '4094ad8a-be5e-43a4-8c58-3e0c680f5fc9',
    fullName: 'Andela Bayo',
    email: 'mbonunkemjika@ymail.com',
    phoneNumber: '2334',
    role: 'caterer',
    address: '12B agege',
  },
  error: null,
};
