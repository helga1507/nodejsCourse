const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('main', {titlePage: 'Home page', url: '/'});
});

module.exports = router;