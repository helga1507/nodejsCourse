const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product
    .save()
    .then(result => {
      console.log('Created Product', result);
      res.redirect('/');
    });

};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if(!editMode)
    return res.redirect('/');

  const {productId} = req.params;

  Product.findById(productId)
    .then(product => {
      if(!product)
        return res.redirect('/');

      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product
      });
    });

};

exports.postEditProduct = (req, res) => {
  const {title, imageUrl, price, description, productId} = req.body;
  const product = new Product(title, imageUrl, description, price,productId);
  product
    .save()
    .then(result => {
      console.log('UPDATED PRODUCT');
      res.redirect('/admin/products');
    });

};

exports.postDeleteProduct = (req, res) => {
  const {productId} = req.body;

  Product.deleteById(productId);
  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product
    .fetchAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    });
};
