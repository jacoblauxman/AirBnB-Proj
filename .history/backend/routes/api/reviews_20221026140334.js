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



router.get('/current', requireAuth, async (req, res) => {
  // const user = await

  const currId = req.user.id;

  let currReviews = await Review.findAll({
    where: {
      userId: currId
    },

    include: [
      {
        model: User,
        attributes: [
          'id',
          'firstName',
          'lastName'
        ]
      },

      // {
      //   model: Spot,
      //   include: [
      //     {
      //       model: SpotImage,
      //       // as: 'previewImage',
      //       attributes: ['url'],


      //       where: {
      //         preview: true
      //       },
      //       required: false,
      //       attributes: {
      //         exclude: ['createdAt', 'updatedAt'],
      //         include: [
      //           [
      //             sequelize.col('SpotImages.url'),
      //             'previewImage'
      //           ]
      //         ]

      //       },
      //     },
      //   ]
      // },

      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  })

  //get spot info with previewImage to attach

  currReviews = currReviews.toJSON()

  for (let review of currReviews) {
    const spotInfo = await Spot.findOne({
      where: { id: review.spotId },
      include: [
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
          sequelize.col('SpotImages.url'),
          'previewImage'
        ]
      ]
    },
    group: ['Spot.id', 'SpotImages.url'],
   
    })
  }


  res.json({
    Reviews: currReviews
  })
})



router.post('/:reviewId/images', requireAuth, async (req, res) => {
  const reviewId = req.params.reviewId
  const userId = req.user.id
  const url = req.body.url

  // console.log(url)

  const review = await Review.findByPk(reviewId)
  //for EC -- need to ensure review's reviewImage array is < 10
  // {
  //   include: [
  //     {model: ReviewImage}
  //   ]
  // })

  //error handling for non existent review
  if (!review) {
    res.status(404).json({
      message: `Review couldn't be found`,
      statusCode: 404
    })
  }


  let newReviewImage = await ReviewImage.create({
    url, reviewId
  })

  newReviewImage.save()
  newReviewImage = newReviewImage.toJSON()
  delete newReviewImage.createdAt
  delete newReviewImage.updatedAt
  delete newReviewImage.reviewId
  res.json(newReviewImage)
})


//update review
router.put('/:reviewId', requireAuth, async (req, res) => {
  const reviewId = req.params.reviewId
  const userId = req.user.id
  console.log(userId)
  const { review, stars } = req.body;

  //error handling validation of input
  if (!review || !stars) {
    res.status(400).json({
      message: 'Validation error',
      statusCode: 400,
      errors: {
        review: 'Review text is required',
        stars: 'Stars must be an integer from 1 to 5'
      }
    })
  }


  let editedReview = await Review.findByPk(reviewId)

  if (!editedReview) {
    res.status(404).json({
      message: `Review couldn't be found`,
      statusCode: 404
    })
  }

  //error handling if userId doesn't match ownerId
  if (userId !== editedReview.userId) {
    res.status(403).json({
      message: 'Forbidden',
      statusCode: 403
    })
  }

  editedReview.set({
    review, stars, userId
  })

  await editedReview.save()
  res.json(editedReview)
})


//delete review
router.delete('/:reviewId', requireAuth, async (req, res) => {
  const reviewId = req.params.reviewId
  const userId = req.user.id

  const toDelete = await Review.findByPk(reviewId)

  //error handling if spot doesn't exist
  if (!toDelete) {
    res.status(404).json({
      message: `Review couldn't be found`,
      statusCode: 404
    })
  }

  //error handling, authorization
  if (userId !== toDelete.userId) {
    res.status(403).json({
      message: 'Forbidden',
      statusCode: 403
    })
  }

  await toDelete.destroy()

  res.status(200).json({ message: 'Successfully deleted' })
})




router.get('/', async (req, res) => {
  const reviews = await Review.findAll()
  // const user = await User.getUserById()
  const user = await User.findOne(User.scope('currentUser'))

  res.json(reviews, user)
})





module.exports = router;
