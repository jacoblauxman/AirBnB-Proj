// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, sequelize } = require('../../db/models');
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




router.get('/:spotId/reviews', async (req, res) => {
  const { spotId } = req.params;

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
    group: ['Spot.id']
  })

  console.log(req.user.id)
  res.json({
    Spots: allSpots
  })
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



router.get('/:spotId/reviews', async (req, res) => {
  const { spotId } = req.params;

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


  router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const spotId = +req.params.spotId

    const spot = await Spot.findByPk(spotId)
  })

  res.json({
    Reviews: spotReviews
  })
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
      //needed because of aggregates -- toJSON otherwise w/ new variable
      raw: true
    });

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
    }
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

  let updatedSpot = await Spot.findByPk(spotId)

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

  //error handle
  // if (spotId !== userId) {

  // }

  const spot = await Spot.findByPk(spotId);

  await spot.destroy();

  res.status(200).json({ message: 'Successfully deleted' })
})


router.get('/', async (req, res) => {

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
    group: ['Spot.id']
  })


  res.json({
    Spots: allSpots
  })
})




module.exports = router;
