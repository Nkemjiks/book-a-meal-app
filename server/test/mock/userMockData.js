import bycrypt from 'bcrypt';

export default {
  validUserDetailFirst: {
    fullName: 'Rebecca Deo',
    email: 'rebeccadeo@gmail.com',
    phoneNumber: '078920839',
    password: 'testing',
    address: '43, Agege Road, Lagos',
  },
  validUserDetailSecond: {
    fullName: '  Jack    Stone  ',
    email: 'jackstone@gmail.com',
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
  invalidUserDetailNamethird: {
    fullName: 'Mbonu 123ghyw',
    email: 'rebeccadeo@gmail.com',
    phoneNumber: '078920839',
    password: 'testing',
    address: '43, Agege Road, Lagos',
  },
  invalidUserDetailEmailSecond: {
    fullName: 'Rebecca Smith',
    email: 'rebeccasmithgmail.com',
    phoneNumber: '078920839',
    password: 'testing',
    address: '43, Agege Road, Lagos',
  },
  invalidUserDetailEmailThird: {
    fullName: 'Rebecca Smith',
    email: 'rebeccasmith@gmail',
    phoneNumber: '078920839',
    password: 'testing',
    address: '43, Agege Road, Lagos',
  },
  invalidUserDetailPhoneNumberFirst: {
    fullName: 'Rebecca Smith',
    email: 'rebeccasmith@gmail.com',
    phoneNumber: '078920dsfs839',
    password: 'testing',
    address: '43, Agege Road, Lagos',
  },
  invalidUserDetailPhoneNumberSecond: {
    fullName: 'Rebecca Smith',
    email: 'rebeccasmith@gmail.com',
    phoneNumber: '078920%^  839',
    password: 'testing',
    address: '43, Agege Road, Lagos',
  },
  invalidUserDetailPasswordFirst: {
    fullName: 'Rebecca Smith',
    email: 'rebeccasmith@gmail.com',
    phoneNumber: '078920839',
    password: '<script></script>',
    address: '43, Agege Road, Lagos',
  },
  invalidUserDetailPasswordSecond: {
    fullName: 'Rebecca Smith',
    email: 'rebeccasmith@gmail.com',
    phoneNumber: '078920839',
    password: '  dkd87id',
    address: '43, Agege Road, Lagos',
  },
  invalidUserDetailAddressSecond: {
    fullName: 'Rebecca Smith',
    email: 'rebeccasmith@gmail.com',
    phoneNumber: '078920839',
    password: 'testing',
    address: '13B, Third <> Street',
  },
  invalidUserDetailAddressThird: {
    fullName: 'Rebecca Smith',
    email: 'rebeccasmith@gmail.com',
    phoneNumber: '078920839',
    password: 'testing',
    address: '28, Alagomeji = 1, 2= 4',
  },
  validUserLoginDetails: {
    email: 'rebeccadeo@gmail.com',
    password: bycrypt.hashSync('testing', 10),
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
    email: 'rebeccadeo@gmail.com',
    password: bycrypt.hashSync('testing', 10),
  },
  validUserLoginDetailsFirst: {
    email: 'rebeccadeo@gmail.com',
    password: 'testing',
  },
  validUserLoginDetailsSecond: {
    email: 'jackstone@gmail.com',
    password: 'testing',
  },
  invalidUserLoginPasswordSecond: {
    email: 'rebeccadeo@gmail.com',
    password: 'testingjs',
  },
  nonExistingUserFirst: {
    email: 'robertkate@gmail.com',
    password: 'testing',
  },
  invalidUserLoginDetailsThird: {
    email: 'rebeccasmithgmail',
    password: 'testing',
  },
  invalidUserLoginDetailPasswordFirst: {
    email: 'rebeccasmith@gmail.com',
    password: 'test<>ing',
  },
  catererLoginDetailsFirst: {
    email: 'janedeo@gmail.com',
    password: 'testing',
  },
  catererLoginDetailsSecond: {
    email: 'alexjames@gmail.com',
    password: 'testing',
  },
};
