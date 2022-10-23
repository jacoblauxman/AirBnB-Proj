'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {


    await queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Jaboc',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Uno',
        lastName: 'OneOne'
      },
      {
        email: 'user1@user.io',
        username: 'Dorkster',
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
        review: 'hmm ok but could have had a ceiling',
        stars: 3
      },
      {
        spotId: 3,
        userId: 1,
        review: 'nah nah nah this aint it',
        stars: 1
      },
    ])


    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 3,
        startDate: '01-01-2022',
        endDate: '02-02-2022'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '06-06-2022',
        endDate: '07-07-2022'
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '10-01-2022',
        endDate: '01-02-2023'
      }
    ])


    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'http://www.woopie.com',
        preview: true
      },
      {
        spotId: 2,
        url: 'http://notherenothere.org',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://yeayeayea.com',
        preview: true
      },
      {
        spotId: 1,
        url: 'http://somewhereElsedotCom.com',
        preview: true
      }
    ])


    await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'http://supriseyourselfhere.com'
      },
      {
        reviewId: 2,
        url: 'http://likeJSONbutJason.com'
      },
      {
        reviewId: 3,
        url: 'http://urlsarethemostannoyingseeddata.com'
      },
      {
        reviewId: 4,
        url: 'https://thissiteissuresecure.org'
      },
      {
        reviewId: 5,
       url: 'http://www.GFY.com'}
    ])

  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('ReviewImages', {});

    await queryInterface.bulkDelete('SpotImages', {});

    await queryInterface.bulkDelete('Bookings', {});

    await queryInterface.bulkDelete('Reviews', {});

    await queryInterface.bulkDelete('Spots', {});

    await queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});

  }
};
