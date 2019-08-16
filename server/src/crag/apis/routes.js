const express = require('express');
const router = express.Router();

// @route GET api/routes
// @desc test route
// @access public
router.get('/', (req, res) => res.send('Routes route'));

module.exports = router;
