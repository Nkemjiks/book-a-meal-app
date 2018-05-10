import bycrypt from 'bcrypt';

export default {
  validUserDetail: {
    fullName: 'Rebecca Smith',
    email: 'rebeccasmith@gmail.com',
    phoneNumber: '078920839',
    password: 'testing',
    address: '43, Agege Road, Lagos',
  },
  emptyUserDetail: {
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    address: '',
  },
  invalidUserDetailName: {
    fullName: '',
    email: 'rebeccasmith@gmail.com',
    phoneNumber: '078920839',
    password: 'testing',
    address: '43, Agege Road, Lagos',
  },
  invalidUserDetailEmail: {
    fullName: 'Rebecca Smith',
    email: 'rebeccasmith @gmail.com',
    phoneNumber: '078920839',
    password: 'testing',
    address: '43, Agege Road, Lagos',
  },
  invalidUserDetailPhoneNumber: {
    fullName: 'Rebecca Smith',
    email: 'rebeccasmith@gmail.com',
    phoneNumber: '078920dsfs839',
    password: 'testing',
    address: '43, Agege Road, Lagos',
  },
  invalidUserDetailPassword: {
    fullName: 'Rebecca Smith',
    email: 'rebeccasmith@gmail.com',
    phoneNumber: '078920839',
    password: '<>',
    address: '43, Agege Road, Lagos',
  },
  invalidUserDetailAddress: {
    fullName: 'Rebecca Smith',
    email: 'rebeccasmith@gmail.com',
    phoneNumber: '078920839',
    password: 'testing',
    address: '       ',
  },
  validUserLoginDetails: {
    email: 'rebeccasmith@gmail.com',
    password: 'testing',
  },
  invalidUserLoginDetails: {
    email: 'rebeccasmithgmail.com',
    password: 'testing',
  },
  invalidUserLoginDetailPassword: {
    email: 'rebeccasmith@gmail.com',
    password: 'test<>ing',
  },
  invalidUserLoginPassword: {
    email: 'rebeccasmith@gmail.com',
    password: 'testi',
  },
  nonExistingUser: {
    email: 'robertkate@gmail.com',
    password: 'testing',
  },
  userLoginToken: {
    email: 'johnAllman@gmail.com',
    password: bycrypt.hashSync('testing', 10),
  },
};
