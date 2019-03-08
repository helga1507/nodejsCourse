const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const users = [];

const router = express.Router();

router.get('/users', (req, res) => {
  res.render('users', {titlePage: 'Users', url: 'admin/users', users});
});

router.post('/add-user', (req, res) => {
  users.push(req.body);

  res.redirect('/');
});

module.exports = router;