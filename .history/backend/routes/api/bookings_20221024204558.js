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

  // const user = await User.findByPk(userId,  {
  //   attributes: ['id', 'firstName', 'lastName']
  // })

  const bookings = await Booking.findAll({
    where: {
      userId
    },
    include: [
      {
        model: Spot,
        attributes: []
      }
    ],
    attributes: {
      include: [sequelize.col('SpotImages.url'), 'previewImage']
    }
  })


  let currBookings = []

  bookings.forEach(booking => {
    currBookings.push(booking.toJSON())
  })


  console.log(currBookings)
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
