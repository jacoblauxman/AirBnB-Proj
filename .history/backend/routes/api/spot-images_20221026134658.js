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
  const imageId = req.params.imageId
  const userId = req.user.id


  let image = await SpotImage.findByPk(imageId)

  //error handling if image doesn't exist
  if (!image) {
    res.status(404).json({
      message: `Spot Image couldn't be found`,
      statusCode: 404
    })
  }

  //error handling if spot ownerId doesn't match userId
  const spot = await Spot.findOne({
    where: {
      id: image.spotId
    }
  })

  if (userId !== spot.ownerId) {
    res.status(403).json({})
  }

  console.log(spot.ownerId)
  console.log(userId)


  //checking for spot ownership before deleting
  if (spot.ownerId === userId) {
    await image.destroy()

    res.status(200).json({ message: 'Successfully deleted' })
  }
})



module.exports = router;
