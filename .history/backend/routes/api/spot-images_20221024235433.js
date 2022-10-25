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

  const image = await SpotImage.findByPk(imageId)

  const spot = await Spot.findOne({
    where: {
      image.spotId: 
    }
  })
})



module.exports = router;
