export const meals = [
  {
    id: '4311abc4-60d3-4784-a131-81e9c852b4de',
    name: 'Yam and Egg',
    imageURL: 'http://res.cloudinary.com/dqsmurjpg/image/upload/v1528616268/lbzzlrpfxh4xhlpsufu9.jpg',
    price: 200,
  },
  {
    id: '3735009d-269d-4f4d-a1c4-ef1adc1a36fc',
    name: 'Eba and Ogono',
    imageURL: 'http://res.cloudinary.com/dqsmurjpg/image/upload/v1528629501/iiztvo1rfkmffbhcwkyr.jpg',
    price: 500,
  },
  {
    id: '187f9c04-1eb0-4237-9c4a-f3c08e9bca25',
    name: 'Potato Chips',
    imageURL: 'http://res.cloudinary.com/dqsmurjpg/image/upload/v1528622614/d7tsvgmvaixm6mepkiy4.jpg',
    price: 800,
  },
  {
    id: 'ad0ea613-d643-4e4f-a5be-31dcc00ad654',
    name: 'Akara and Pap',
    imageURL: 'http://res.cloudinary.com/dqsmurjpg/image/upload/v1528616144/lod2gpw9zd3ey2yw7n02.jpg',
    price: 400,
  },
  {
    id: '7eeebb0e-74a2-4d3e-8f9e-afd51806ddce',
    name: 'Akara and Cornflakes',
    imageURL: 'http://res.cloudinary.com/dqsmurjpg/image/upload/v1528629249/mfubswklwgzblxqdb3c1.jpg',
    price: 500,
  },
];

export const menu = {
  id: '72698cbe-3208-4155-861f-76a0a4cd4556',
  date: 'Mon Jun 18 2018',
  userId: '4094ad8a-be5e-43a4-8c58-3e0c680f5fc9',
  createdAt: '2018-06-18T12:57:39.972Z',
  updatedAt: '2018-06-18T12:57:39.972Z',
  meals: [
    {
      name: 'Akara and Pap',
      imageURL: 'http://res.cloudinary.com/dqsmurjpg/image/upload/v1528616144/lod2gpw9zd3ey2yw7n02.jpg',
      price: 400,
      menuItems: {
        createdAt: '2018-06-18T12:57:40.027Z',
        updatedAt: '2018-06-18T12:57:40.027Z',
        mealId: 'ad0ea613-d643-4e4f-a5be-31dcc00ad654',
        menuId: '72698cbe-3208-4155-861f-76a0a4cd4556',
      },
    },
    {
      name: 'Akara and Cornflakes',
      imageURL: 'http://res.cloudinary.com/dqsmurjpg/image/upload/v1528629249/mfubswklwgzblxqdb3c1.jpg',
      price: 500,
      menuItems: {
        createdAt: '2018-06-18T12:57:40.027Z',
        updatedAt: '2018-06-18T12:57:40.027Z',
        mealId: '7eeebb0e-74a2-4d3e-8f9e-afd51806ddce',
        menuId: '72698cbe-3208-4155-861f-76a0a4cd4556',
      },
    },
  ],
};
