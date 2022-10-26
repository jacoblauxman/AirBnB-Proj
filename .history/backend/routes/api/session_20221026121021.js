// backend/routes/api/session.js
const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

//phase5
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//phase5
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    // .withMessage('Please provide a valid email or username.'),
    .withMessage('Email or username is required'),

  check('password')
    .exists({ checkFalsy: true })
    // .withMessage('Please provide a password.'),
    .withMessage('Password is required'),
  // handleValidationErrors
];

// backend/routes/api/session.js
// ...
// Log in
router.post(
  '/',
  //phase5
  validateLogin,
  //
  async (req, res, next) => {
    const { credential, password } = req.body;

    //body validation error
    if (!credential || !password) {
      const err = new Error('Validation error')
      err.status = 400
      err.errors = [{
        "credential": "Email or username is required",
        "password": "Password is required"
      }]
    }
    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Invalid Credentials');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      //mine
      err.message = 'Invalid credentials'
      // return next(err);

      
      // const err = new Error('Invalid credentials');
      // err.status = 401;
      // err.title = 'Login failed';
      // // err.errors = ['The provided credentials were invalid.'];
      // return next(err);


    }

    await setTokenCookie(res, user);


    //edit attempt, my stuff --
    let result = {}
    result.id = user.id
    result.firstName = user.firstName
    result.lastName = user.lastName
    result.email = user.email
    result.username = user.username
    result.token = ''
    //
    return res.json({
      // user
      ...result
    });
  }
);


// backend/routes/api/session.js
// ...
// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);
// ...


// backend/routes/api/session.js
// ...


// Restore session user
router.get(
  '/',
  requireAuth,
  (req, res) => {
    const { user } = req;
    if (user) {
      let result = user.toSafeObject()
      return res.json({
        ...result
      });
    } else return res.json({});
  }
);
// ...



module.exports = router;
