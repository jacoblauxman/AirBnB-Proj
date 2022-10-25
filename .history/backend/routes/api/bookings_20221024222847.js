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


  for (let booking of currBookings) {
    const spot = await Spot.findOne({
      where: {
        id: booking.spotId
      },
      include: [
        {
          model: SpotImage,
          where: {
            preview: true
          },
          attributes: []
        }
      ],
      attributes: {
        include: [
          [sequelize.col('SpotImages.url'), 'previewImage']
        ],
        exclude: ['createdAt', 'updatedAt']
      },
      raw: true
    })
    booking.Spot = spot
  }


  res.json({
    Bookings: currBookings
  });
})




// router.get('/:spotId/bookings', requireAuth, async (req, res) => {
//   const spotId = req.params.spotId
//   const userId = req.user.id

//   const spot = await Spot.findByPk(spotId, {
//     include: { model: B }
//   })
//   console.log(spot)

//   // if (spot.ownerId) {

//   // }

//   res.json('testtesttest')
// })



router.delete('/:bookingId', requireAuth, async (req, res) => {
  const userId = req.user.id
  const bookingId = req.params.bookingId

  const booking = await Booking.findByPk(bookingId)

  
})



router.get('/', async (req, res) => {
  const allBookings = await Booking.findAll();

  res.json(allBookings);
})






module.exports = router;
