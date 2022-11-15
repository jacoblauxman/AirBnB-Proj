// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
//phase5
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
//

const router = express.Router();


//phase5
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
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  handleValidationErrors
];
//

// backend/routes/api/users.js
// ...

// Sign up
router.post(
  '/',
  //phase5
  validateSignup,
  //
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;

    const userNameExists = await User.findOne({ where: { username } })
    const userEmailExists = await User.findOne({ where: { email } })

    if (userNameExists) {

      const err = new Error('User already exists')
      err.statusCode = 403
      err.errors = ['User with that username already exists']
      err.message = 'User with that username already exists'

      res.status(403).json({
        title: 'User already exists',
        message: 'Username already exists',
        statusCode: 403,
        errors: err.errors
      })

    } else if (userEmailExists) {
      const err = new Error('User already exists')

      err.statusCode = 403
      err.errors = ['User with that email already exists']
      err.message = 'Email already exists'

      res.status(403).json({
        title: 'User already exists',
        message: 'Email already exists',
        statusCode: 403,
        errors: err.errors
      })
    }

    // needs help - modify
    else if (!email || !password || !username || !firstName || !lastName) {

      res.status(400).json({
        message: 'Validation error',
        statusCode: 400,
        errors: [
          'Invalid email',
          'Username is required',
          'First Name is required',
          'Last Name is required'
        ]
      })
    }


    const user = await User.signup({ email, username, password, firstName, lastName });

    let token = await setTokenCookie(res, user);

    let result = user.toJSON();

    delete result.createdAt
    delete result.updatedAt
    //not needed --v
    // result.token = token

    return res.json({
      user: { ...result }
    });
  }
);



module.exports = router;
