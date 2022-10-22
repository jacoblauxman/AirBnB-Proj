'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Uno',
        lastName: 'OneOne'
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Dos',
        lastName: 'TwoTwo'
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Tres',
        lastName: 'ThreeThree'
      }
    ], {});


    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '123GoodDay2You Rd',
        city: 'Somewherez',
        state: 'Overz',
        country: 'daRainbowz',
        lat: 111.1234567,
        lng: -111.1234567,
        name: 'FIRSTSPOTSTOP',
        description: 'A first spot to stop and plop',
        price: 100.00
      },
      {
        ownerId: 1,
        address: '123GoodDay2You Rd',
        city: 'Somewherez',
        state: 'Overz',
        country: 'daRainbowz',
        lat: 111.1234567,
        lng: -111.1234567,
        name: 'FIRSTSPOTSTOP',
        description: 'A first spot to stop and plop',
        price: 100.00
      },
      {
        ownerId: 2,
        address: '234BadDayAhead St',
        city: 'Elsewherez',
        state: 'Behindz',
        country: 'daMoon',
        lat: 20.76543321,
        lng: -20.7654321,
        name: 'SECONDPLACE',
        description: 'A first spot to stop and plop',
        price: 100.00
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
