'use strict';

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
// END of new code

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {


    options.tableName = 'Users'

    await queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Jaboc',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Cobe',
        lastName: 'Laux'
      },
      {
        email: 'user1@user.io',
        username: 'Dorkster',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Dex',
        lastName: 'DaBoss'
      },
      {
        email: 'user2@user.io',
        username: 'jadO',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Jad0',
        lastName: 'T'
      },
      {
        email: 'deeeemo@user.io',
        username: 'DemoUser',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Demo',
        lastName: 'User'
      },
      {
        email: 'demo123@user.io',
        username: 'SpotVisiter',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Friendly',
        lastName: 'Person'
      }
    ], {});


    options.tableName = 'Spots'

    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Good Day2You Rd',
        city: 'Somewherez',
        state: 'Overz',
        country: 'daRainbowz',
        lat: 111.1234567,
        lng: -111.1234567,
        name: 'FIRST SPOT STOP',
        description: 'A first spot to stop and plop',
        price: 100.00
      },
      {
        ownerId: 2,
        address: '234 Bad DayAhead St',
        city: 'Elsewherez',
        state: 'Behindz',
        country: 'daMoon',
        lat: 12.76543321,
        lng: -12.7654321,
        name: 'SECOND PLACE',
        description: 'A second place to waste ya days',
        price: 32.00
      },
      {
        ownerId: 1,
        address: '456 IsItEnough Dr',
        city: 'Buh',
        state: 'Buu',
        country: 'Bruuuh',
        lat: 666.1111111,
        lng: -666.1111111,
        name: 'THIRD TIME',
        description: 'A third place of words for durv',
        price: 123.99
      },
      {
        ownerId: 2,
        address: '678 Ok WeWillSee Rd',
        city: 'Another',
        state: 'Cool',
        country: 'Place',
        lat: 21.76543321,
        lng: -21.7654321,
        name: 'ANOTHER ONE ! YES',
        description: 'Could this be THE spot?',
        price: 148.00
      },
      {
        ownerId: 2,
        address: '789 Hmm NotBad Ln',
        city: 'Go',
        state: 'Here',
        country: 'Someday?',
        lat: 22.76543321,
        lng: -22.7654321,
        name: 'CHECK OUT THE SPOT',
        description: 'Another fun thing would be to visit here',
        price: 222.00
      },
      {
        ownerId: 3,
        address: '890 Well HereWeGo Cir',
        city: 'Some',
        state: 'Time',
        country: 'Sooooon',
        lat: 23.76543321,
        lng: -23.7654321,
        name: 'ONE MORE AMAZING PLACE',
        description: 'Cool spot for cool times',
        price: 123.00
      },
      {
        ownerId: 2,
        address: '1112 Some WhereClose ALY',
        city: 'Greatest',
        state: 'Place',
        country: 'Ever',
        lat: 23.76543321,
        lng: -23.7654321,
        name: 'TRY AND FIND A BETTER SPOT',
        description: 'Here is one more description',
        price: 186.00
      },
      {
        ownerId: 1,
        address: '2221 Imaginary Road Dr',
        city: 'Here',
        state: 'IsAnother',
        country: 'Location',
        lat: 23.76543321,
        lng: -23.7654321,
        name: 'TITLE HERE',
        description: 'Description here',
        price: 254.00
      },
      {
        ownerId: 1,
        address: '890 Well HereWeGo Cir',
        city: 'Some',
        state: 'Time',
        country: 'Sooooon',
        lat: 23.76543321,
        lng: -23.7654321,
        name: 'TITLE HERE',
        description: 'Description Here',
        price: 89.00
      },
      {
        ownerId: 4,
        address: '890 Well HereWeGo Cir',
        city: 'Some',
        state: 'Time',
        country: 'Sooooon',
        lat: 23.76543321,
        lng: -23.7654321,
        name: 'TITLE HERE',
        description: 'Description Here',
        price: 122.00
      },
      {
        ownerId: 2,
        address: '890 Well HereWeGo Cir',
        city: 'Some',
        state: 'Time',
        country: 'Sooooon',
        lat: 23.76543321,
        lng: -23.7654321,
        name: 'TITLE HERE',
        description: 'Description Here',
        price: 201.00
      },
      {
        ownerId: 4,
        address: '4423 AnotherAddress Please Ln',
        city: 'Some',
        state: 'Time',
        country: 'Sooooon',
        lat: 23.76543321,
        lng: -23.7654321,
        name: 'TITLE HERE',
        description: 'Description Here',
        price: 175.00
      },

    ], {})

    options.tableName = 'Reviews'

    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 5,
        review: 'wow, whaddaSpot!! love it',
        stars: 4
      },
      {
        spotId: 2,
        userId: 5,
        review: 'how do you not have a toilet',
        stars: 2
      },
      {
        spotId: 2,
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
        userId: 5,
        review: 'nah nah nah, this aint it',
        stars: 1
      },
      {
        spotId: 4,
        userId: 5,
        review: 'been here and wow',
        stars: 4
      },
      {
        spotId: 6,
        userId: 5,
        review: 'always visiting new places and this is one',
        stars: 1
      },
      {
        spotId: 7,
        userId: 5,
        review: 'okay last demo review for now',
        stars: 2
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Liked it okay ish',
        stars: 2
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Liked it okay ish',
        stars: 2
      },
      {
        spotId: 5,
        userId: 3,
        review: 'Decent spot',
        stars: 2
      }
    ])

    options.tableName = 'Bookings'

    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 3,
        startDate: '2022-01-01',
        endDate: '2022-02-02'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2022-06-06',
        endDate: '2022-07-07'
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2022-10-01',
        endDate: '2023-01-02'
      }
    ])


    options.tableName = 'SpotImages'

    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://whatifgaming.com/wp-content/uploads/2021/08/7-Wooden-Modern-House-1024x576.png',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://whatifgaming.com/wp-content/uploads/2021/08/4-Aquarium-House-1024x576.png',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://whatifgaming.com/wp-content/uploads/2021/08/37-Large-Modern-House-1024x576.png',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://whatifgaming.com/wp-content/uploads/2021/08/21-Epic-Modern-House-House-1024x576.png',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://whatifgaming.com/wp-content/uploads/2021/08/21-Epic-Modern-House-House-1024x576.png',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://whatifgaming.com/wp-content/uploads/2021/08/21-Epic-Modern-House-House-1024x576.png',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://whatifgaming.com/wp-content/uploads/2021/08/21-Epic-Modern-House-House-1024x576.png',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://whatifgaming.com/wp-content/uploads/2021/08/21-Epic-Modern-House-House-1024x576.png',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://whatifgaming.com/wp-content/uploads/2021/08/21-Epic-Modern-House-House-1024x576.png',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://whatifgaming.com/wp-content/uploads/2021/08/21-Epic-Modern-House-House-1024x576.png',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://whatifgaming.com/wp-content/uploads/2021/08/21-Epic-Modern-House-House-1024x576.png',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://i.redd.it/nhtbh04es6c51.jpg',
        preview: true
      }
    ])


    options.tableName = 'ReviewImages'

    await queryInterface.bulkInsert(options, [
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
        url: 'http://www.GFY.com'
      }
    ])

  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;

    options.tableName = 'ReviewImages'
    // await queryInterface.bulkDelete(options, {});
    await queryInterface.bulkDelete(options);

    options.tableName = 'SpotImages'

    await queryInterface.bulkDelete(options);

    options.tableName = 'Bookings'

    await queryInterface.bulkDelete(options);

    options.tableName = 'Reviews'

    await queryInterface.bulkDelete(options);

    options.tableName = 'Spots'

    await queryInterface.bulkDelete(options);

    options.tableName = 'Users'

    // await queryInterface.bulkDelete('Users', {
    //   username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    // }, {});

    await queryInterface.bulkDelete(options)

  }
};
