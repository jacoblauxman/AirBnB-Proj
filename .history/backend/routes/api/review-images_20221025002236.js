const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, sequelize } = require('../../db/models');
//phase5
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { response } = require('express');
//

const router = express.Router();



router.delete('/:imageId', requireAuth, async (req, res) => {
  const userId = req.user.id
  const imageId = req.params.imageId

  let image = await ReviewImage.findByPk(imageId)

  // image = image.toJSON()

  const review = await Review.findOne({
    where: {
      id: image.reviewId
    }
  })

  // console.log(spot.ownerId)
  // console.log(userId)


  //checking for spot ownership before deleting
  if (review.userId === userId) {
    await image.destroy()

    res.status(200).json({ message: 'Successfully deleted', statusCode: 200 })
  }

})




module.exports = router;
