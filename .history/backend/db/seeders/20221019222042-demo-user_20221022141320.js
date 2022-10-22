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
        ownerId: 2,
        address: '234BadDayAhead St',
        city: 'Elsewherez',
        state: 'Behindz',
        country: 'daMoon',
        lat: 20.76543321,
        lng: -20.7654321,
        name: 'SECONDPLACE',
        description: 'A second place to waste ya days',
        price: 32.10
      },
      {
        ownerId: 1,
        address: '456IsItEnough Dr',
        city: 'Buh',
        state: 'Buu',
        country: 'Bruuuh',
        lat: 666.1111111,
        lng: -666.1111111,
        name: 'THIRDTURD',
        description: 'A third turd of words for durv',
        price: 666.66
      }
    ], {})

    await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 2,
        review: 'wow, whaddaSpot!! love it',
        stars: 4
      },
      {
        spotId: 2,
        userId: 1,
        review: 'how do you not have a toilet',
        stars: 2
      },
      {
        spotId: 3,
        userId: 3,
        review: 'oh yeah cant wait to come back',
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: 'wow, whaddaSpot!! love it',
        stars: 4
      },
      {

      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
