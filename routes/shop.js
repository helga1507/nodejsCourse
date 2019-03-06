const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res) => {
  //without .pug and folders (it was define in app.use)
  res.render('shop', {prods: adminData.products, pageTitle: 'Shop', path: '/'});
});

module.exports = router;