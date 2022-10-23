// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, sequelize } = require('../../db/models');
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
    }
  })

  res.json({
    Reviews: spotReviews
  })
})



router.get('/current', async (req, res) => {

  const currId = req.user.id

  const allSpots = await Spot.findAll({
    where: {
      ownerId: currId
    },
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



router.get('/:spotId', async (req, res) => {
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId, {
    // attributes: {
    //   include: [
    //     [
    //       sequelize.fn('COUNT',)
    //     ]
    //   ]
    // },
    include: [
      {
        model: SpotImage,
        where: {
          spotId
        },
        attributes:
          ['id', 'url', 'preview']

      },
      {
        model: User,
        attributes: []
      }
    ]
  })

  const owner = await User.findOne({
    where: {
      id: spot.ownerId
    },
    attributes: ['id', 'firstName', 'lastName']
  })

  console.log(owner.dataValues)

  res.json({ spot, Owner: owner })
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
