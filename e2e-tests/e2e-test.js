/* eslint-disable */
module.exports = {
  'Visit landing page': function (client) {
    client
      .url('http://localhost:8000/#/')
      .waitForElementVisible('body', 3000);

    client.expect.element('.signin').to.be.present;
    client.expect.element('img').to.be.present;
    client.expect.element('#app-summary').to.be.present;
    client.expect.element('#steps').to.be.present;
    client.expect.element('.signup').to.be.present;
  },

  'Signup to the application': function (client) {
    client
      .click('.signup')
      .pause(1000)
      .waitForElementVisible('body', 1000)
      .assert.containsText('h1', 'Sign Up Now')
      .setValue('input:nth-child(1)', 'Jane Doir')
      .pause(1000)
      .setValue('input:nth-child(2)', 'janedoir@gmail.com')
      .pause(1000)
      .setValue('input:nth-child(3)', '09083748376')
      .pause(1000)
      .setValue('input:nth-child(4)', 'testing')
      .pause(1000)
      .setValue('input:nth-child(5)', '12, Agege Road, Lagos')
      .pause(1000)
      .submitForm('form')
      .pause(2000)
      .assert.containsText('h1', 'Available Menu');
  },

  'Update user role': function (client) {
    client
      .click('#nav-setting')
      .pause(2000)
      .click('.update-role')
      .pause(1000)
      .setValue('input:nth-child(1)', 'Accenture Meals')
      .pause(1000)
      .setValue('input:nth-child(2)', '12, Agege Road, Lagos')
      .pause(1000)
      .setValue('input.imageSelector', require('path').resolve(__dirname + '../../../../../downloads/food.jpg'))
      .pause(1000)
      .click('.uploadButton')
      .pause(40000)
      .click('.update')
      .pause(1000)
      .waitForElementVisible('body', 2000)
      .assert.containsText('.no-meal', 'You have not set the menu');
  },

  'Logout of the application': function (client) {
    client
      .click('#nav-setting-caterer')
      .pause(3000)
      .click('.logout-button')
      .pause(5000)
      .waitForElementVisible('body', 3000)
      .assert.containsText('h1', 'Sign in');
  },

  'Login to the application': function (client) {
    client
      .setValue('input:nth-child(1)', 'alexjames@gmail.com')
      .pause(1000)
      .setValue('input:nth-child(2)', 'testing')
      .pause(1000)
      .submitForm('form')
      .pause(3000)
      .assert.containsText('h1', 'Available Menu');
  },

  'Navigate to the caterer dashboard': function (client) {
    client
      .click('#nav-setting')
      .pause(2000)
      .click('.caterer-panel')
      .pause(2000)
      .waitForElementVisible('body', 3000)
      .assert.containsText('h1:nth-child(1)', 'Menu');
  },

  'Add a meal': function (client) {
    client
      .click('.meal')
      .pause(5000)
      .setValue('input[type="text"]', 'Beans and Dodo')
      .pause(5000)
      .setValue('input[type="number"]', '500')
      .pause(1000)
      .setValue('input.imageSelector', require('path').resolve(__dirname + '../../../../../downloads/food.jpg'))
      .pause(1000)
      .click('.uploadButton')
      .pause(40000)
      .click('#enabledAddMealButton')
      .pause(10000)
      .assert.containsText('p:nth-child(2)', 'Beans and Dodo')
      .assert.containsText('p:nth-child(3)', '500');
  },

  'Modify a meal': function (client) {
    client
      .click('#modify-div .fa-edit')
      .pause(2000)
      .clearValue('.update-price')
      .pause(2000)
      .setValue('.update-price', '700')
      .pause(1000)
      .click('.modify-btn')
      .pause(3000)
      .assert.containsText('p:nth-child(3)', '700');
  },

  'Delete a meal': function (client) {
    client
      .click('#modify-div .fa-trash-alt')
      .pause(2000)
      .click('.yes')
      .pause(2000)
      .assert.containsText('p:nth-child(2)', 'Potato Chips')
      .assert.containsText('p:nth-child(3)', '450');
  },

  'Create a menu': function (client) {
    client
      .pause(5000)
      .click('.set-menu')
      .pause(2000)
      .click('.meal-avaliable:nth-child(1) input[type="checkbox"]')
      .pause(2000)
      .click('.meal-avaliable:nth-child(2) input[type="checkbox"]')
      .pause(3000)
      .click('#enabledAddMealButton')
      .pause(5000)
      .assert.containsText('p', 'Potato Chips')
      .assert.containsText('p:nth-child(3)', '450');
  },

  'Remove a meal from the menu': function (client) {
    client
      .click('.menu')
      .pause(2000)
      .click('.menu-created:nth-child(1) .remove-meal')
      .pause(3000)
      .assert.containsText('p', 'Yam and Egg')
      .assert.containsText('p:nth-child(3)', '550');
    client.expect.element('input[type="checkbox"]:nth-child(1)').to.not.have.attribute('checked');
  },

  'Logout of the application again': function (client) {
    client
      .click('#nav-setting-caterer')
      .pause(3000)
      .click('.logout-button')
      .pause(5000)
      .waitForElementVisible('body', 3000)
      .assert.containsText('h1', 'Sign in');
  },

  'Login to the application and go to the next page': function (client) {
    client
      .setValue('input:nth-child(1)', 'anitajoe@gmail.com')
      .pause(1000)
      .setValue('input:nth-child(2)', 'testing')
      .pause(1000)
      .submitForm('form')
      .pause(2000)
      .assert.containsText('h1', 'Available Menu')
      .execute('scrollTo(0, 420)')
      .pause(3000)
      .click('.pagination li:nth-child(2) a')
      .pause(2000)
      .assert.containsText('.business-name', 'Alex');
  },

  'Click on a menu to view the meals': function (client) {
    client
      .click('.menu-main #menu-info')
      .pause(3000)
      .assert.containsText('.caterer-info h3', 'Avaliable Meals')
      .pause(5000);
  },

  'Place an order': function (client) {
    client
      .click('.add-i')
      .pause(2000)
      .clearValue('input[type="number"]')
      .setValue('input[type="number"]', '3')
      .pause(1000)
      .setValue('input[type="text"]', '12B, Ilupeju, Lagos')
      .pause(3000)
      .click('.button')
      .pause(5000);
  },

  'Check order history for customer': function (client) {
    client
      .click('#nav-setting')
      .pause(3000)
      .click('.dropdown-content .customer-order')
      .pause(2000)
      .click('h1')
      .pause(4000)
      .waitForElementVisible('body', 3000)
      .assert.containsText('#orderHistory:nth-child(1) > p', 'Yam and Egg')
      .assert.containsText('#orderHistory:nth-child(1) > p', '3');
  },

  'Modify an order': function (client) {
    client
      .click('.fa-edit')
      .pause(3000)
      .clearValue('input[type="number"]')
      .pause(2000)
      .setValue('input[type="number"]', '2')
      .pause(3000)
      .click('#enabledAddMealButton')
      .pause(5000)
      .waitForElementVisible('body', 3000)
      .assert.containsText('#orderHistory:nth-child(1) > p', 'Yam and Egg')
      .assert.containsText('#orderHistory:nth-child(1) > p', '2');
  },

  'Logout of the application(Customer)': function (client) {
    client
      .click('#nav-setting')
      .pause(3000)
      .click('.logout-button')
      .pause(5000)
      .waitForElementVisible('body', 3000)
      .assert.containsText('h1', 'Sign in');
  },

  'Login to the application(caterer)': function (client) {
    client
      .setValue('input:nth-child(1)', 'alexjames@gmail.com')
      .pause(1000)
      .setValue('input:nth-child(2)', 'testing')
      .pause(1000)
      .submitForm('form')
      .pause(3000)
      .assert.containsText('h1', 'Available Menu');
  },

  'Navigate to the caterer dashboard to view recieved orders': function (client) {
    client
      .click('#nav-setting')
      .pause(2000)
      .click('.caterer-panel')
      .pause(2000)
      .waitForElementVisible('body', 3000)
      .assert.containsText('h1:nth-child(1)', 'Menu');
  },

  'Caterer should view all orders received': function (client) {
    client
      .click('.view-order')
      .pause(3000);
    client.expect.element('.orders-placed:nth-child(1)').to.not.be.present;
    client.expect.element('.orders-placed:nth-child(2)').to.not.be.present;
    client.expect.element('.order-info').to.be.present;
    client.end();
  },
};
