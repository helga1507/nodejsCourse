const path = require('path');
const express = require('express');
const rootDir = require('../util/path');

const router = express.Router();
const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
});

// /admin/add-product => POST
router.post('/add-product', (req, res) => {
  products.push(req.body);

  res.redirect('/');
});

exports.routes = router;
exports.products = products;