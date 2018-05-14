import bycrypt from 'bcrypt';

export default {
  validUserLoginDetailsFirst: {
    email: 'rebeccadeo@gmail.com',
    password: 'testing',
  },
  validUserLoginDetailsSecond: {
    email: 'jackstone@gmail.com',
    password: 'testing',
  },
  invalidUserLoginDetailsFirst: {
    email: 'rebeccasmithgmail.com',
    password: 'testing',
  },
  invalidUserLoginDetailsSecond: {
    email: 'rebeccasmith@gmail',
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
  invalidUserLoginDetailPasswordSecond: {
    email: 'rebeccasmith@gmail.com',
    password: 'test=ing',
  },
  invalidUserLoginDetailPasswordThird: {
    email: 'rebeccasmith@gmail.com',
    password: 'test  ing',
  },
  invalidUserLoginPasswordFirst: {
    email: 'rebeccasmith@gmail.com',
    password: 'testi',
  },
  invalidUserLoginPasswordSecond: {
    email: 'rebeccasmith@gmail.com',
    password: 'testingjs',
  },
  invalidUserLoginPasswordThird: {
    email: 'rebeccasmith@gmail.com',
    password: 'texting',
  },
  nonExistingUserFirst: {
    email: 'robertkate@gmail.com',
    password: 'testing',
  },
  nonExistingUserSecond: {
    email: 'janedeo@gmail.com',
    password: 'testing',
  },
  nonExistingUserThird: {
    email: 'larrypage@gmail.com',
    password: 'testing',
  },
  userLoginToken: {
    email: 'rebeccadeo@gmail.com',
    password: bycrypt.hashSync('testing', 10),
  },
};
