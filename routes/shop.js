const path = require('path');
const express = require('express');
const rootDir = require('../util/path');

const router = express.Router();

//use - add new middleware
//default content-type = text/html, charset = utf8
router.get('/', (req, res) => {
  console.log('in the another middleware');

  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
});

module.exports = router;