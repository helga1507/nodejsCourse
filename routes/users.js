const express = require('express');

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