const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('main', {titlePage: 'Home page', url: '/'});
});

module.exports = router;