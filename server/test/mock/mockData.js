export default {
  validUserDetailFirst: {
    fullName: 'Rebecca Deo',
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
  validUserLoginDetailsFirst: {
    email: 'rebeccadeo@gmail.com',
    password: 'testing',
  },
  invalidUserLoginPasswordSecond: {
    email: 'rebeccadeo@gmail.com',
    password: 'testingjs',
  },
  invalidUserLoginDetailPasswordFirst: {
    email: 'rebeccasmith@gmail.com',
    password: 'test<>ing',
  },
  invalidUserLoginDetailsThird: {
    email: 'rebeccasmithgmail',
    password: 'testing',
  },
  nonExistingUserFirst: {
    email: 'robertkate@gmail.com',
    password: 'testing',
  },
  customerLoginDetailsFirst: {
    email: 'anitajoe@gmail.com',
    password: 'testing',
  },
  customerLoginDetailsSecond: {
    email: 'samjohn@gmail.com',
    password: 'testing',
  },
  catererLoginDetailsSecond: {
    email: 'alexjames@gmail.com',
    password: 'testing',
  },
  catererLoginDetailsFirst: {
    email: 'janedeo@gmail.com',
    password: 'testing',
  },
  updateRoleFirst: {
    businessName: 'Best Food',
    logoURL: 'www.image.com/jdjd',
    businessAddress: '12B, Agege Road',
  },
  updateRoleSecond: {
    businessName: '',
    logoURL: 'www.image.com/jdjd',
    businessAddress: '12B, Agege Road',
  },
  updateRoleThird: {
    businessName: 'Best Food',
    logoURL: '',
    businessAddress: '12B, Agege Road',
  },
  updateRoleFourth: {
    businessName: 'Best Food',
    logoURL: 'www.image.com/jdjd',
    businessAddress: '',
  },
  firstMeal: {
    name: 'Jollof Rice with salad',
    price: 200,
    imageURL: 'www.image.com/kdeu8dy',
  },
  secondMeal: {
    name: '',
    price: 200,
    imageURL: 'www.image.com/kdeu8dy',
  },
  thirdMeal: {
    name: 'Jo',
    price: 200,
    imageURL: 'www.image.com/kdeu8dy',
  },
  fourthMeal: {
    name: 'Jollof Rice with salad',
    price: '200f',
    imageURL: 'www.image.com/kdeu8dy',
  },
  fifthMeal: {
    name: 'Jollof Rice with salad',
    price: 200,
    imageURL: 'imagekdeu8dy',
  },
  addMealProd: {
    meals: ['82a712ab-fd6e-4b68-bc63-c34f5f1ba7f1'],
  },
  addMealProdSec: {
    meals: ['82a712ab-fd6e-4b68-bc63-c34f5f1ba7f1', '82a712ab-fd6e-4b68-bc63-c34f5f1ba7d3'],
  },
  addMealProdThird: {},
  updateMealProd: {
    meals: ['91f77b21-56ed-4260-a935-7dfed583bc4b'],
  },
  removeMealProd: {
    meals: ['91f77b21-56ed-4260-a935-7dfed583bc4b', '91f77b21-56ed-4260-a935-7dfed583bc5e'],
  },
  placeOrderDev: {
    catererId: 'dcb5c503-ba35-4aed-810e-685b57a6c82b',
    meals: [
      {
        mealId: '8f17a141-7c02-40f5-8c28-c8c520f9946d',
        quantity: 5,
      },
    ],
  },
  placeOrderProd: {
    catererId: 'dcb5c503-ba35-4aed-810e-685b57a6c82b',
    meals: [
      {
        mealId: '82a712ab-fd6e-4b68-bc63-c34f5f1ba7f1',
        quantity: 5,
      },
    ],
  },
  placeOrderProdSec: {},
  placeOrderProdThird: {
    catererId: 'dcb5c503-ba35-4aed-810e-685b57a6c82b',
    meals: [
      {
        mealId: '82a712ab-fd6e-4b68-bc63-c34f5f1ba7f1',
        quantity: '5t',
      },
    ],
  },
  placeOrderProdFourth: {
    catererId: 'dcb5c503-ba35-4aed-810e-685b57a6c82b',
    meals: [
      {
        mealId: '82a712ab-fd6e-4b68-bc63-c34f5f1ba7f1',
        quantity: 25,
      },
    ],
  },
  modifyOrderProd: {
    meals: [
      {
        mealId: '82a712ab-fd6e-4b68-bc63-c34f5f1ba7f1',
        quantity: 8,
      },
    ],
  },
};
