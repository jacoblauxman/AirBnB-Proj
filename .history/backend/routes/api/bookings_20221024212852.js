const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, SpotImage, Review, ReviewImage, sequelize } = require('../../db/models');
//phase5
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { response, urlencoded } = require('express');
//

const router = express.Router();

//copy from USERS -- edit
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];




router.get('/current', requireAuth, async (req, res) => {

  const userId = req.user.id


  const bookings = await Booking.findAll({
    where: {
      userId
    },
  })

  let currBookings = []

  bookings.forEach(booking => {
    currBookings.push(booking.toJSON())
  })

  console.log(currBookings)

  let result = {}

  for (let booking of currBookings) {
    // for (let booking of bookings) {
    console.log(booking, ':: BOOKING')
    const spot = await Spot.findOne({
      where: {
        id: booking.spotId
      },
      include: [{ model: SpotImage, where: { preview: true }, attributes: [] }],
      attributes: {
        include: [
          // 'id', 'ownerId', 'address',
          // 'city', 'state', 'country',
          // 'lat', 'lng', 'name', 'price',
          [sequelize.col('SpotImages.url'), 'previewImage']
        ]
      },
      raw: true
    })
    booking.Spot = spot
    console.log(spot, '::: SPOT')

    console.log(booking, '::: BOOKING.SPOT!!')

    // booking.Spot =
    // console.log(booking.Spot)
    // currBookings.push(booking)
    result.push()
  }

  // console.log(currBookings)

  // bookings.forEach(booking => {
  //   currBookings.push(booking.toJSON())
  // })






  // console.log(currBookings)
  // currBookings.forEach(booking => {
  //   const spot = Spot.findOne({
  //     where: {
  //       id: booking.spotId
  //     }
  //   })
  // })

  res.json({
    Bookings: currBookings
  });
})





router.get('/', async (req, res) => {
  const allBookings = await Booking.findAll();

  res.json(allBookings);
})






module.exports = router;
