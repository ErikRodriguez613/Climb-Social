const express = require('express');
const router = express.Router();
const user = require('../implementation/user');
const userSchema = require('../schema/user');
const { checkSchema, validationResult } = require('express-validator/check');

// @route POST api/users
// @desc test route
// @access public
router.post('/', checkSchema(userSchema), async (req, res) => {
  //handle data errors
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const {
      email,
      firstName,
      lastName,
      password,
      city,
      state,
      country
    } = req.body;
    userExists = await user.userExists(email);
    if (userExists) {
      return res.status(400).json({
        errors: [{ message: 'User already exists' }]
      });
    }
    console.log('user not found, creating a new one');
    await user.createUser(
      firstName,
      lastName,
      email,
      password,
      city,
      state,
      country
    );
    console.log('created user');
    return res.send('User registered');
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
