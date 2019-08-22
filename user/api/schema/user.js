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

module.exports = userSchema;
