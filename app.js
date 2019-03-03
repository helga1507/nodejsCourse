const express = require('express');

const app = express();

app.use('/add-product', (req, res, next) => {
  console.log('in the another middleware');


  res.send('<h1>Products</h1>');
});

//use - add new middleware
//default content-type = text/html, charset = utf8
app.use('/', (req, res, next) => {
  console.log('in the another middleware');


  res.send('<h1>Hello</h1>');
});

app.listen(3000);