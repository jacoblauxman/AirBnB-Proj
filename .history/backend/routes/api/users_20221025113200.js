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
  // handleValidationErrors
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
      err.title = 'Signup Error'
      err.status = 403
      err.errors = { email: 'User with that username already exists' }

      throw err

    } else if (userEmailExists) {
      const err = new Error('User already exists')
      err.title = 'Signup Error'
      err.status = 403
      err.errors = { email: 'User with that email already exists' }

      throw err
    }


    if (!email || !password || !username || !firstName || !lastName) {
      const err = new Error('Validation error')
      err.status = 400,
      err.errors = {
        email: "Invalid email",
        username: "Username is required",
        firstName: "First Name is required",
        lastName: "Last Name is required"
      }
      throw 
    }


    const user = await User.signup({ email, username, password, firstName, lastName });

    await setTokenCookie(res, user);

    //my edit:
    let result = user.toJSON();

    delete result.createdAt
    delete result.updatedAt
    result.token = ''

    return res.json({
      // user,
      //my other edit
      ...result
    });
  }
);



module.exports = router;
