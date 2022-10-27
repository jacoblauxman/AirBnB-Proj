// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
//phase5
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { response } = require('express');
const { parse } = require('pg-protocol');
//

const router = express.Router();

//copy from USERS --
// edit idea for middleware throwing errors on spot create/updates
const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({ checkFalsy: true })
    .withMessage('Longitude is not valid'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength([{ max: 50 }])
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required'),
  handleValidationErrors
];








router.get('/current', requireAuth, async (req, res) => {

  const currId = +req.user.id

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
        },
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
    group: ['Spot.ownerId', 'Spot.id', 'SpotImages.url']
  })

  // console.log(req.user.id)
  res.json({
    Spots: allSpots
  })
})




router.get('/:spotId/reviews', async (req, res) => {
  const spotId = req.params.spotId;

  const spot = await Spot.findByPk(spotId)

  //error handling if spot doesn't exist
  if (!spot) {
    // const err = new Error(`Spot couldn't be found`)
    // err.title = 'Reference Error'
    // err.status = 404
    // err.message = `Spot couldn't be found`

    // throw err
    res.status(404).json({
      message: `Spot couldn't be found`,
      statusCode: 404
    })
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

    let spot = await Spot.findByPk(spotId)

    //error handling if spot doesn't exist for bookings
    if (!spot) {
      res.status(404).json({
        message: `Spot couldn't be found`,
        statusCode: 404
      })
    }


    //if userId !== ownerId display:
    if (userId !== spot.ownerId) {
      const bookings = await Booking.findAll({
        where: {
          spotId
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
      })

      res.json({ Bookings: bookings })
    }

    // //error handling if spot doesn't have any reviews
    // let noBookings = await Booking.findAll({ where: { spotId } })
    // if (!noBookings) {

    //   res.status(404).json({ message: 'No bookings found!', statusCode: 404 })
    // }
  })



router.post('/:spotId/bookings', requireAuth, async (req, res) => {
  const spotId = req.params.spotId
  const userId = req.user.id
  const { startDate, endDate } = req.body

  //error handling for req body validation - need start and end
  if (!startDate || !endDate) {
    res.status(400).json({
      message: 'Validation error',
      statusCode: 400,
      errors: {
        startDate: 'startDate must be provided',
        endDate: 'endDate must be provided'
      }
    })
  }

  let spot = await Spot.findByPk(spotId)

  //error handling if spot doesn't exist
  if (!spot) {
    res.status(404).json({
      message: `Spot couldn't be found`,
      statusCode: 404
    })
  }

  //error handling - userId cannot match ownerId of booking spot
  if (spot.ownerId == userId) {
    res.status(403).json({
      message: 'Forbidden',
      statusCode: 403
    })
  }

  //error handling - validation : end can't come before start
  if (startDate >= endDate) {
    res.status(400).json({
      message: 'Validation error',
      statusCode: 400,
      errors: {
        endDate: 'endDate cannot be on or before startDate'
      }
    })
  }

  let bookingConflicts = await Booking.findAll({
    where: {
      spotId
    }
  })


  //error handling if booking conflict:
  for (let conflict of bookingConflicts) {
    conflict = conflict.toJSON()
    if ((startDate >= conflict.startDate && startDate <= conflict.endDate) ||
      (endDate >= conflict.startDate && endDate <= conflict.endDate)) {
      res.status(403).json({
        message: 'Sorry, this spot is already booked for the specified dates',
        statusCode: 403,
        errors: {
          startDate: 'Start date conflicts with an existing booking',
          endDate: 'End date conflicts with an existing booking'
        }
      })
    }
  }


  let newBooking = await Booking.create({
    spotId: spot.id,
    userId,
    startDate,
    endDate
  })

  await newBooking.save()

  newBooking = newBooking.toJSON()

  res.json(newBooking)


})



router.post('/:spotId/images',
  requireAuth,
  async (req, res) => {
    const userId = req.user.id
    const spotId = +req.params.spotId
    const { url, preview } = req.body;


    //may break -- testing
    let spot = await Spot.findByPk(spotId)

    // console.log(spot)
    if (!spot) {
      const err = new Error()
      err.message = `Spot couldn't be found`
      res.status(404)
      err.statusCode = 404

      // throw err
      res.json(err)
    }

    if (spot.ownerId !== userId) {
      const err = new Error()
      err.title = 'Authorization Error'
      err.message = 'Forbidden'
      err.statusCode = 403

      res.status(403).json(err)
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
    // }

  })



router.post('/:spotId/reviews',
  requireAuth,
  async (req, res) => {
    const spotId = +req.params.spotId
    const userId = req.user.id
    const { review, stars } = req.body


    //error handling on validating review submission
    if (!review || !stars) {
      const err = new Error('Validation error')
      err.status = 400
      err.title = 'Validation Error'
      err.message = 'Validation Error'
      err.errors = {
        review: 'Review text is required',
        stars: 'Stars must be an integer from 1 to 5',
      }

      throw err
    }

    //error handling if spot doesn't exist
    let spot = await Spot.findByPk(spotId)
    if (!spot) {
      // const err = new Error(`Spot couldn't be found`)
      // err.title = 'Reference Error'
      // err.status = 404
      // err.message = `Spot couldn't be found`

      // // throw err

      res.status(404).json({
        message: `Spot couldn't be found`,
        statusCode: 404
      })
    }

    //error handling if user already has review
    const reviewCheck = await Review.findOne({
      where: {
        spotId, userId
      }
    })

    if (reviewCheck) {
      // const err = new Error('User already has a review for this spot')
      // err.status = 403
      // err.title = 'Review Exists'
      // throw err
      res.status(403).json({
        message: 'User already has a review for this spot',
        statusCode: 403
      })
    }

    const newReview = await Review.create({
      review, stars, spotId, userId
    })

    res.status(201).json(newReview)
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

  // console.log(spot.id)
  if (!spot) {
    const err = new Error("Spot couldn't be found")
    err.title = 'Invalid Spot id'
    err.message = "Spot couldn't be found",
      err.status = 404
    err.statusCode = 404

    // throw err

    res.status(404).json({
      message: `Spot couldn't be found`,
      statusCode: 404
    })
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

  // console.log(address, city, state, country, lat)
  if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {

    // const err = new Error('Validation Error')
    // err.status = 400
    // err.title = 'Validation Error'
    // err.errors = {
    //   "address": "Street address is required",
    //   "city": "City is required",
    //   "state": "State is required",
    //   "country": "Country is required",
    //   "lat": "Latitude is not valid",
    //   "lng": "Longitude is not valid",
    //   "name": "Name must be less than 50 characters",
    //   "description": "Description is required",
    //   "price": "Price per day is required"
    // }
    // throw err

    res.status(400).json({
      message: 'Validation Error',
      statusCode: 400,
      errors: {
        address: 'Street address is required',
        city: 'City is required',
        state: 'State is required',
        country: 'Country is required',
        lat: 'Latitude is not valid',
        lng: 'Longitude is not valid',
        name: 'Name must be less than 50 characters',
        description: 'Description is required',
        price: 'Price per day is required'
      }
    })
  }
  // console.log(currId)
  const newSpot = await Spot.create({
    ownerId: currId,
    address, city, state, country,
    lat, lng, name, description, price
  })

  res.status(201).json(newSpot)
})



router.put('/:spotId', requireAuth, async (req, res) => {
  const spotId = +req.params.spotId
  const userId = req.user.id
  const { address, city, state, country, lat, lng, name, description, price } = req.body


  //error handling - Validation on req.body
  if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {


    res.status(400).json({
      message: 'Validation Error',
      statusCode: 400,
      errors: {
        address: 'Street address is required',
        city: 'City is required',
        state: 'State is required',
        country: 'Country is required',
        lat: 'Latitude is not valid',
        lng: 'Longitude is not valid',
        name: 'Name must be less than 50 characters',
        description: 'Description is required',
        price: 'Price per day is required'
      }
    })

  }

  let updatedSpot = await Spot.findByPk(spotId)


  //error handling if spot doesn't exist
  if (!updatedSpot) {
    // const err = new Error("Spot couldn't be found")
    // err.title = 'Reference Error'
    // err.status = 404

    // throw err
    res.status(404).json({
      message: `Spot couldn't be found`,
      statusCode: 404
    })
  }

  //error handling if userId isn't ownerId
  if (userId !== updatedSpot.ownerId) {
    res.status(403).json({
      message: 'Forbidden',
      statusCode: 403
    })
  }


  //ELSE
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
    // const err = new Error("Spot couldn't be found")
    // err.title = 'Reference Error'
    // err.status = 404

    // throw err
    res.status(404).json({
      message: `Spot couldn't be found`,
      statusCode: 404
    })
  }

  // auth error handling -- need to fix
  if (spot.ownerId !== userId) {
    res.status(403).json({
      message: 'Forbidden',
      statusCode: 403
    })
  }

  await spot.destroy();

  res.status(200).json({
    message: 'Successfully deleted',
    statusCode: 200
  })
})


router.get('/', async (req, res) => {

  //querying filters
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
  let pagination = {}
  let where = {}

  // if (page) {
  //   if (isNaN(page) && page < 1) {
  //     page = 1
  //   } else if (page > 10) {
  //     page = 10
  //   } else {
  //     page = +page
  //   }
  // }

  // if (size) {
  //   if (isNaN(size) && size < 1) {
  //     size = 1
  //   } else if (size > 20) {
  //     size = 20
  //   } else {
  //     size = +size
  //   }
  // }


  // pagination.limit = size
  // pagination.offset = size * (page - 1)
  // // let limit = size
  // // let offset = size * (page - 1)

  // // let where = {}
  // if (minLat) where.minLat = minLat
  // if (maxLat) where.maxLat = maxLat
  // if (minLng) where.minLng = minLng
  // if (maxLng) where.maxLng = maxLng
  // if (minPrice) where.minPrice = minPrice
  // if (maxPrice) where.maxPrice = maxPrice

  // //


  if (Object.keys(req.query).length) {
    let pagination = {}
    let where = {}

    page = +page
    size = +size

    if (page) {
      if (isNaN(page) || page < 1) {
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


    pagination.limit = size
    pagination.offset = size * (page - 1)
    // let limit = size
    // let offset = size * (page - 1)

    // let where = {}
    if (minLat) where.minLat = minLat
    if (maxLat) where.maxLat = maxLat
    if (minLng) where.minLng = minLng
    if (maxLng) where.maxLng = maxLng
    if (minPrice) where.minPrice = minPrice
    if (maxPrice) where.maxPrice = maxPrice

    //


    const allSpots = await Spot.findAll({
      ...pagination, where,
      group: ['Spot.id']
    })
    // console.log(allSpots)

    for (let spot of allSpots) {
      spot = spot.toJSON()
      // console.log(spot)

      const spotImage = await SpotImage.findOne({
        where: { preview: true },
        required: false,
        // attributes: {
        //   include: [
        //     [
        //       sequelize.col('SpotImages.url'),
        //       'previewImage'
        //     ]
        //   ]
        // }
      })
      spot.previewImage = spotImage.url
      // console.log(spotImage.url)

      const spotReviews = await Review.findAll({
        where: { spotId: spot.id }
      })
    }
    

    res.json({ Spots: allSpots, page, size })
  } else {
    //put OG allSpots here



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
      // vv--all breaks with sequelize fn --vv
      // ...pagination
      // where,
      // limit,
      // offset
    })








    res.json({
      Spots: allSpots, page, size
    })
  }
})




module.exports = router;
