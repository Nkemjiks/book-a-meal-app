const order = {
  data: {
    message: 'You have placed the following orders',
    data: [
      {
        id: '5f6b6b16-a20e-4f9d-9559-9812ad7ad030',
        date: 'Sun Jun 10 2018',
        time: '18:37',
        userId: '4094ad8a-be5e-43a4-8c58-3e0c680f5fc9',
        deliveryAddress: '',
        isDeleted: false,
        createdAt: '2018-06-10T17:37:02.098Z',
        updatedAt: '2018-06-10T17:37:02.098Z',
        meals: [
          {
            id: '7eeebb0e-74a2-4d3e-8f9e-afd51806ddce',
            name: 'Akara and Cornflakes',
            imageURL: 'http://res.cloudinary.com/dqsmurjpg/image/upload/v1528629249/mfubswklwgzblxqdb3c1.jpg',
            price: 500,
            isDeleted: false,
            orderItems: {
              quantity: 4,
              createdAt: '2018-06-10T17:37:02.115Z',
              updatedAt: '2018-06-10T20:29:32.939Z',
              mealId: '7eeebb0e-74a2-4d3e-8f9e-afd51806ddce',
              orderId: '5f6b6b16-a20e-4f9d-9559-9812ad7ad030',
            },
          },
        ],
        user: {
          id: '4094ad8a-be5e-43a4-8c58-3e0c680f5fc9',
          fullName: 'Andela Bayo',
          email: 'mbonunkemjika@ymail.com',
          phoneNumber: '2334',
          address: '12B agege',
        },
      },
      {
        id: '432c8857-5a91-495f-abaa-90da4cb738bb',
        date: 'Mon Jun 11 2018',
        time: '21:43',
        userId: '4094ad8a-be5e-43a4-8c58-3e0c680f5fc9',
        deliveryAddress: '',
        isDeleted: false,
        createdAt: '2018-06-11T20:43:04.952Z',
        updatedAt: '2018-06-11T20:43:04.952Z',
        meals: [{
          id: '7eeebb0e-74a2-4d3e-8f9e-afd51806ddce',
          name: 'Akara and Cornflakes',
          imageURL: 'http://res.cloudinary.com/dqsmurjpg/image/upload/v1528629249/mfubswklwgzblxqdb3c1.jpg',
          price: 500,
          isDeleted: false,
          orderItems: {
            quantity: 5,
            createdAt: '2018-06-11T20:43:04.977Z',
            updatedAt: '2018-06-11T20:43:28.904Z',
            mealId: '7eeebb0e-74a2-4d3e-8f9e-afd51806ddce',
            orderId: '432c8857-5a91-495f-abaa-90da4cb738bb',
          },
        }],
        user: {
          id: '4094ad8a-be5e-43a4-8c58-3e0c680f5fc9',
          fullName: 'Andela Bayo',
          email: 'mbonunkemjika@ymail.com',
          phoneNumber: '2334',
          address: '12B agege',
        },
      }],
    totalExpenses: 4500,
  },
};

export default order;
