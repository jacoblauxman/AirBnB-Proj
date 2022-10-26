// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
//phase5
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { response } = require('express');
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

  const currId = req.user.id

  const allSpots = await Spot.findAll({
    where: {
      ownerId: currId
    },
    include: [

      {
        model: Review,
        attributes: [],
      },
      {
        model: SpotImage,
        attributes: [],
        where: {
          preview: true
        }
      }
    ],

    attributes: {
      include: [
        [
          sequelize.fn("AVG", sequelize.col('Reviews.stars')),
          'avgRating'
        ],
        [
          sequelize.col('SpotImages.url'),
          'previewImage'
        ]
      ]
    },
    group: ['Spot.id', 'SpotImages.url']
  })

  console.log(req.user.id)
  res.json({
    Spots: allSpots
  })
})




router.get('/:spotId/reviews', async (req, res) => {
  const spotId = req.params.spotId;

  const spot = Spot.findByPk(spotId)
  console.log(spot)
  if (!(Object.values(spot).length)) {
    const err = new Error(`Spot couldn't be found`)
    err.title = 'Reference Error'
    err.status = 404
    err.message = `Spot couldn't be found`

    throw err
  }

  const spotReviews = await Review.findAll({
    where: {
      spotId
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  })

  res.json({
    Reviews: spotReviews
  })
})






router.get('/:spotId/bookings',
  requireAuth,
  async (req, res) => {
    const spotId = +req.params.spotId
    const userId = req.user.id

    console.log(spotId)
    console.log(userId)
    const spot = await Spot.findByPk(spotId, {
      raw: true
    })


    //not owner for now
    if (userId !== spot.ownerId) {
      const bookings = await Booking.findAll({
        where: {
          spotId: spot.id
        },
        attributes: ['spotId', 'startDate', 'endDate']
      })

      res.json({ Bookings: bookings })
    }

    if (userId === spot.ownerId) {
      const bookings = await Booking.findAll({
        where: {
          spotId: spot.id
        },
        include:
          [{
            model: User,
            attributes: ['id', 'firstName', 'lastName'],
            where: {
              id: bookings.userId
            }
          }]
      },

      )
      res.json({ Bookings: bookings })
    }
  })



router.post('/:spotId/bookings', requireAuth, async (req, res) => {
  const spotId = req.params.spotId
  const userId = req.user.id

  const { startDate, endDate } = req.body

  const spot = await Spot.findByPk(spotId)
  console.log(userId)
  console.log(spot.ownerId)

  if (spot.ownerId !== userId) {

    let newBooking = await Booking.create({
      spotId: spot.id,
      userId,
      startDate,
      endDate
    })

    newBooking = newBooking.toJSON()

    res.json(newBooking)
  }

})



//still struggling
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const userId = req.user.id
  const spotId = +req.params.spotId
  const { url, preview } = req.body;


  // console.log('userId', userId)
  const theSpot = await Spot.findByPk(spotId, {
    include: { model: SpotImage },
    raw: true
  })

  // PUT if / else error handling
  if (theSpot.ownerId === userId) {

  }

  let newSpotImage = await SpotImage.create({
    url,
    preview,
    spotId
  })

  newSpotImage = newSpotImage.toJSON();


  delete newSpotImage.createdAt
  delete newSpotImage.updatedAt
  delete newSpotImage.spotId

  res.json(newSpotImage)
})


// to be deleted :::::

// router.get('/:spotId/reviews', async (req, res) => {
//   const { spotId } = req.params;

//   const spotReviews = await Review.findAll({
//     where: {
//       spotId
//     },
//     include: [
//       {
//         model: User,
//         attributes: ['id', 'firstName', 'lastName']
//       },
//       {
//         model: ReviewImage,
//         attributes: ['id', 'url']
//       }
//     ]
//   })

//   res.json({
//     Reviews: spotReviews
//   })
// })


router.post('/:spotId/reviews', requireAuth, async (req, res) => {
  const spotId = +req.params.spotId
  const userId = req.user.id
  const { review, stars } = req.body

  console.log(review)
  console.log(stars)
  if (!review || !stars) {
    const err = new Error('Validation error')
    err.status = 400
    err.title = 'Validation Error'
    err.message = 'Validation Error'


    throw err
  }

  const spot = await Spot.findByPk(spotId);



  const newReview = await Review.create({
    review, stars, spotId, userId
  })

  res.json(newReview)
})








router.get('/:spotId', async (req, res) => {
  const spotId = req.params.spotId
  const spot = await Spot.findByPk(spotId,
    {
      include: {
        model: Review,
        attributes: []
      },
      attributes: {
        include: [
          [
            sequelize.fn('COUNT', sequelize.col('Reviews.spotId')),
            'numReviews'
          ],
          [
            sequelize.fn('AVG', sequelize.col('Reviews.stars')),
            'avgStarRating'
          ]
        ]
      },
      group: ['Spot.id', 'Reviews.spotId', 'Reviews.stars'],
      //needed because of aggregates -- toJSON otherwise w/ new variable
      raw: true
    });

  console.log(spot.id)
  if (!spot.id) {
    const err = new Error("Spot couldn't be found")
    err.title = 'Invalid Spot id'
    err.message = "Spot couldn't be found",
      err.status = 404

    throw err
  }



  //getting related images
  const SpotImages = [];
  const relatedImages = await SpotImage.findAll({
    where: {
      spotId
    },
    attributes: ['id', 'url', 'preview']
  })
  relatedImages.forEach(spotImage => {
    SpotImages.push(spotImage.toJSON())
  })

  //get owner
  const owner = await User.findOne({
    where: {
      id: spot.ownerId
    },
    attributes: ['id', 'firstName', 'lastName']
  })

  const Owner = owner.toJSON()


  //applying SpotImages and Owner properties
  spot.SpotImages = SpotImages
  spot.Owner = Owner

  res.json(spot)
})



router.post('/', requireAuth, async (req, res) => {
  const currId = req.user.id
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  console.log(address, city, state, country, lat)
  if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {

    const err = new Error('Validation Error')
    err.status = 400
    err.title = 'Validation Error'
    err.errors = {
      "address": "Street address is required",
      "city": "City is required",
      "state": "State is required",
      "country": "Country is required",
      "lat": "Latitude is not valid",
      "lng": "Longitude is not valid",
      "name": "Name must be less than 50 characters",
      "description": "Description is required",
      "price": "Price per day is required"
    }

    throw err
  }
  // console.log(currId)
  const newSpot = await Spot.create({
    ownerId: currId,
    address, city, state, country,
    lat, lng, name, description, price
  })

  res.json(newSpot)
})



router.put('/:spotId', requireAuth, async (req, res) => {
  const spotId = +req.params.spotId
  const { address, city, state, country, lat, lng, name, description, price } = req.body

  if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {

    const err = new Error('Validation Error')
    err.status = 400
    err.title = 'Validation Error'
    err.errors = {
      "address": "Street address is required",
      "city": "City is required",
      "state": "State is required",
      "country": "Country is required",
      "lat": "Latitude is not valid",
      "lng": "Longitude is not valid",
      "name": "Name must be less than 50 characters",
      "description": "Description is required",
      "price": "Price per day is required"
    }

    throw err
  }

  let updatedSpot = await Spot.findByPk(spotId)

  if (!updatedSpot) {
    const err = new Error("Spot couldn't be found")
    err.title = 'Reference Error'
    err.status = 404

    throw err
  }

  updatedSpot.set({
    address, city, state, country,
    lat, lng, name, description, price
  })


  await updatedSpot.save()
  res.json(updatedSpot)
})



router.delete('/:spotId', requireAuth, async (req, res) => {
  const spotId = +req.params.spotId
  const userId = req.user.id



  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    const err = new Error("Spot couldn't be found")
    err.title = 'Reference Error'
    err.status = 404

    throw err
  }

  //auth error handling -- need to fix
  // if (spot.ownerId !== userId) {

  // }

  await spot.destroy();

  res.status(200).json({ message: 'Successfully deleted' })
})


router.get('/', requireAuth, async (req, res) => {

  //querying filters
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
  const userId = req.user.id

  let pagination = {}
  if (page) {
    if (isNaN(page) && page < 1) {
      page = 1
    } else if (page > 10) {
      page = 10
    } else {
      page = +page
    }
  }

  if (size) {
    if (isNaN(size) && size < 1) {
      size = 1
    } else if (size > 20) {
      size = 20
    } else {
      size = +size
    }
  }

  let limit = size
  let offset = size * (page - 1)

  let where = {}
  if (minLat) where.minLat = minLat
  if (maxLat) where.maxLat = maxLat
  if (minLng) where.minLng = minLng
  if (maxLng) where.maxLng = maxLng
  if (minPrice) where.minPrice = minPrice
  if (maxPrice) where.maxPrice = maxPrice

  //


  const allSpots = await Spot.findAll({
    include: [
      {
        model: Review,
        attributes: []
      },
      {
        model: SpotImage,
        attributes: [],
        where: {
          preview: true
        },
        //from mikeM
        required: false
      }
    ],
    attributes: {
      include: [
        [
          sequelize.fn("AVG", sequelize.col('Reviews.stars')),
          'avgRating'
        ],
        [
          sequelize.col('SpotImages.url'),
          'previewImage'
        ]
      ]
    },
    group: ['Spot.id', 'SpotImages.url'],
    where,
    // limit,
    // offset
  })


  res.json({
    Spots: allSpots, page, size
  })
})




module.exports = router;
