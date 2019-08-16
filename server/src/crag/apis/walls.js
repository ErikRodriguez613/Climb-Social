const express = require('express');
const router = express.Router();

// @route GET api/walls
// @desc test route
// @access public
router.get('/', (req, res) => res.send('Walls route'));

module.exports = router;
