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
  const userId = req.user.userId

  let image = await SpotImage.findByPk(imageId)

  // image = image.toJSON()

  const spot = await Spot.findOne({
    where: {
      id: image.spotId
    }
  })

  console.log(spot.ownerId)
  HTMLFormControlsCollection.


  //checking for spot ownership before deleting
  // if (spot.ownerId === userId) {
  await image.destroy()

  res.status(200).json({ message: 'Successfully deleted' })
  // }
})



module.exports = router;
