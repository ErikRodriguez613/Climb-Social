const express = require('express');
const router = express.Router();
const user = require('../implementation/user');
const location = require('../../location/implementation/location');
const { checkSchema, validationResult } = require('express-validator/check');

//user check schema for put and posts
const userSchema = {
  email: {
    in: ['body'],
    isEmail: {
      errorMessage: 'Email must be a valid email'
    },
    isEmpty: {
      errorMessage: 'Email is required',
      negated: true,
      options: { ignore_whitespace: true }
    },
    normalizeEmail: {
      options: {
        all_lowercase: true
      }
    }
  },
  firstName: {
    in: ['body'],
    isEmpty: {
      errorMessage: 'FirstName is required',
      negated: true,
      options: { ignore_whitespace: true }
    },
    trim: {
      options: [[' ']]
    }
  },
  lastName: {
    in: ['body'],
    isEmpty: {
      errorMessage: 'LastName is required',
      negated: true,
      options: { ignore_whitespace: true }
    },
    trim: {
      options: [[' ']]
    }
  },
  password: {
    in: ['body'],
    isLength: {
      errorMessage: 'Password must be at least 8 chars long',
      options: { min: 8 }
    },
    matches: {
      errorMessage:
        'Password must contain a lowercase letter, uppercase letter, number, and a special symbol (!@#$%^&*)',
      options: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&*])(?=.{8,})'
    }
  },
  city: {
    in: ['body'],
    isEmpty: {
      errorMessage: 'City is required',
      negated: true,
      options: { ignore_whitespace: true }
    },
    trim: {
      options: [[' ']]
    },
    customSanitizer: {
      options: value => {
        let sanitizedValue = value.toLowerCase();
        return sanitizedValue;
      }
    }
  },
  state: {
    in: ['body'],
    isEmpty: {
      errorMessage: 'State is required',
      negated: true,
      options: { ignore_whitespace: true }
    },
    trim: {
      options: [[' ']]
    },
    customSanitizer: {
      options: value => {
        let sanitizedValue = value.toLowerCase();
        return sanitizedValue;
      }
    }
  },
  country: {
    in: ['body'],
    isEmpty: {
      errorMessage: 'Country is required',
      negated: true,
      options: { ignore_whitespace: true }
    },
    trim: {
      options: [[' ']]
    },
    customSanitizer: {
      options: value => {
        let sanitizedValue = value.toLowerCase();
        return sanitizedValue;
      }
    }
  }
};

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
