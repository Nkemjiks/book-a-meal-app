// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import server from '../app';

// const { expect } = chai;
// const should = chai.should();

// chai.use(chaiHttp);

// describe('Meal API', () => {
//   describe('/POST Meal', () => {
//     const meal = {
//       name: 'Potato fries with beef sauce',
//       price: '5100',
//       image: 'www.image.com/hjw889w',
//     };
//     it('It should return a message for you to provide a valid meal name', (done) => {
//       chai.request(server)
//         .post('/api/v1/meals')
//         .send({
//           name: '',
//           price: '5100',
//           image: 'www.image.com/hjw889w',
//         })
//         .end((err, res) => {
//           expect(res).to.have.status(400);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('Please provide a valid meal name');
//           done();
//         });
//     });
//     it('It should return a message for you to provide a valid meal price', (done) => {
//       chai.request(server)
//         .post('/api/v1/meals')
//         .send({
//           name: 'Potato fries with beef sauce',
//           price: '',
//           image: 'www.image.com/hjw889w',
//         })
//         .end((err, res) => {
//           expect(res).to.have.status(400);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('Please provide a valid meal price');
//           done();
//         });
//     });
//     it('It should return a message for you to provide a valid image URL', (done) => {
//       chai.request(server)
//         .post('/api/v1/meals')
//         .send({
//           name: 'Potato fries with beef sauce',
//           price: '500',
//           image: 678900,
//         })
//         .end((err, res) => {
//           expect(res).to.have.status(400);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('Please provide a valid image URL');
//           done();
//         });
//     });
//     it('It should return a message and a status of 201', (done) => {
//       chai.request(server)
//         .post('/api/v1/meals')
//         .send(meal)
//         .end((err, res) => {
//           expect(res).to.have.status(201);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('New meal added successfully');
//           res.body.data.should.a('array');
//           done();
//         });
//     });
//     it('It should return a message saying "Meal already exist"', (done) => {
//       chai.request(server)
//         .post('/api/v1/meals')
//         .send(meal)
//         .end((err, res) => {
//           expect(res).to.have.status(409);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('Meal already exist');
//           done();
//         });
//     });
//   });
//   describe('/GET Meals', () => {
//     it('it should GET all the meals', (done) => {
//       chai.request(server)
//         .get('/api/v1/meals')
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           res.body.should.be.a('object');
//           res.body.should.have.property('data');
//           res.body.data.should.a('array');
//           done();
//         });
//     });
//   });
//   describe('/PUT/:id Meal', () => {
//     it('it should return a message saying "Meal updated successfully"', (done) => {
//       chai.request(server)
//         .put('/api/v1/meals/2')
//         .send({
//           name: 'Potato fries with pepsi',
//           price: '1800',
//           image: 'www.image.com/dnijd',
//         })
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('Meal updated successfully');
//           res.body.data.should.a('object');
//           done();
//         });
//     });
//     it('it should return a response "Provide a valid meal id"', (done) => {
//       chai.request(server)
//         .put('/api/v1/meals/sfg')
//         .send({})
//         .end((err, res) => {
//           expect(res).to.have.status(404);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('Provide a valid meal id');
//           done();
//         });
//     });
//     it('it should return a response "Meal not found"', (done) => {
//       chai.request(server)
//         .put('/api/v1/meals/6')
//         .send({})
//         .end((err, res) => {
//           expect(res).to.have.status(404);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('Meal not found');
//           done();
//         });
//     });
//     it('it should return a message saying "Please check your meal name"', (done) => {
//       chai.request(server)
//         .put('/api/v1/meals/2')
//         .send({
//           name: '',
//           price: '1800',
//           image: 'www.image.com/dnijd',
//         })
//         .end((err, res) => {
//           expect(res).to.have.status(400);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('Please check your meal name');
//           done();
//         });
//     });
//     it('it should return a message saying "Please provide a valid meal price"', (done) => {
//       chai.request(server)
//         .put('/api/v1/meals/2')
//         .send({
//           name: 'Yam and egg',
//           price: 'jhii',
//           image: 'www.image.com/dnijd',
//         })
//         .end((err, res) => {
//           expect(res).to.have.status(400);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('Please provide a valid meal price');
//           done();
//         });
//     });
//     it('it should return a message saying "Please provide a valid image URL"', (done) => {
//       chai.request(server)
//         .put('/api/v1/meals/2')
//         .send({
//           name: 'Yam and egg',
//           price: '500',
//           image: '',
//         })
//         .end((err, res) => {
//           expect(res).to.have.status(400);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('Please provide a valid image URL');
//           done();
//         });
//     });
//   });
//   describe('/DELETE/:id Meal', () => {
//     it('it should return a status of 200 and a message "Meal deleted successfully"', (done) => {
//       chai.request(server)
//         .delete('/api/v1/meals/2')
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('Meal deleted successfully');
//           done();
//         });
//     });
//     it('it should return a message "Meal does not exist"', (done) => {
//       chai.request(server)
//         .delete('/api/v1/meals/8')
//         .end((err, res) => {
//           expect(res).to.have.status(404);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('Meal not found');
//           done();
//         });
//     });
//     it('it should return a message "Provide a valid meal id"', (done) => {
//       chai.request(server)
//         .delete('/api/v1/meals/asd')
//         .end((err, res) => {
//           expect(res).to.have.status(404);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('Provide a valid meal id');
//           done();
//         });
//     });
//   });
// });
// describe('Menu API', () => {
//   describe('/POST Menu', () => {
//     it('It should return a message "Menu created successfully" and a status of 200', (done) => {
//       chai.request(server)
//         .put('/api/v1/menu/2')
//         .send({})
//         .end((err, res) => {
//           expect(res).to.have.status(201);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('Menu created successfully');
//           res.body.data.should.a('array');
//           done();
//         });
//     });
//     it('It should return a message "Meal not found" and a status of 404', (done) => {
//       chai.request(server)
//         .put('/api/v1/menu/4')
//         .send({})
//         .end((err, res) => {
//           expect(res).to.have.status(404);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('Meal not found');
//           done();
//         });
//     });
//     it('It should return a message "Provide a valid meal id" and a status of 404', (done) => {
//       chai.request(server)
//         .put('/api/v1/menu/abc')
//         .send({})
//         .end((err, res) => {
//           expect(res).to.have.status(404);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('Provide a valid meal id');
//           done();
//         });
//     });
//   });
//   describe('/GET Menu', () => {
//     it('it should GET the menu for the day', (done) => {
//       chai.request(server)
//         .get('/api/v1/menu')
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           res.body.should.be.a('object');
//           res.body.should.have.property('data');
//           done();
//         });
//     });
//   });
// });
// // describe('Order API', () => {
// //   describe('/POST Order', () => {
// //     it('It should return a message and a status of 206', (done) => {
// //       chai.request(server)
// //         .post('/api/v1/order')
// //         .send({})
// //         .end((err, res) => {
// //           expect(res).to.have.status(206);
// //           expect(res).to.be.json;
// //           res.body.should.have.property('message').eql('Order placement data is incomplete');
// //           done();
// //         });
// //     });
// //     it('It should return a JSON response and a status of 200', (done) => {
// //       chai.request(server)
// //         .post('/api/v1/order')
// //         .send({
// //           id: '5',
// //           customerName: 'Hugh Jackman',
// //         })
// //         .end((err, res) => {
// //           expect(res).to.have.status(200);
// //           expect(res).to.be.json;
// //           res.body.should.be.a('object');
// //           done();
// //         });
// //     });
// //   });
// //   describe('/GET order', () => {
// //     it('it should GET all order', (done) => {
// //       chai.request(server)
// //         .get('/api/v1/order')
// //         .end((err, res) => {
// //           expect(res).to.have.status(200);
// //           expect(res).to.be.json;
// //           res.body.should.be.a('object');
// //           done();
// //         });
// //     });
// //   });
// //   describe('/PUT/:id Order', () => {
// //     it('it should a status of 200 and an object', (done) => {
// //       chai.request(server)
// //         .put('/api/v1/order/5')
// //         .send({
// //           add: 'true',
// //           delete: 'true',
// //           addMealName: 'Potato fries',
// //           deleteMealName: 'Yam and fish with vegetable',
// //         })
// //         .end((err, res) => {
// //           expect(res).to.have.status(200);
// //           res.body.should.be.a('object');
// //           done();
// //         });
// //     });
// //   });
// // });

