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

  const currReviews = await Review.findAll({
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

      {
        model: Spot,
        attributes: {
          exclude: ['createdAt', 'updatedAt'],

        },
        include: [
          {
            model: SpotImage,
            // as: 'previewImage',
            attributes: ['url'],


            where: {
              preview: true
            },
          },
        ]
      },

      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  })


  res.json({
    Reviews: currReviews
  })
})



//need to limit return response
router.post('/:reviewId/images', requireAuth, async (req, res) => {
  const reviewId = req.params.reviewId
  const userId = req.user.id
  const url = req.body.url

  // console.log(url)

  const review = await Review.findByPk(reviewId)
  const spot = await 

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

  let editedReview = await Review.findByPk(reviewId)
  editedReview.set({
    review, stars, userId
    //may not need userId, for time being
  })

  editedReview.save()
  res.json(editedReview)
})


//delete review
router.delete('/:reviewId', requireAuth, async (req, res) => {
  const reviewId = req.params.reviewId
  const userId = req.user.id

  const toDelete = await Review.findByPk(reviewId)

  //error handling
  // if (toDelete.userId !== userId) {

  // }

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
