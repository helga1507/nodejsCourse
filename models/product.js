const fs = require('fs');
const path = require('path');

const pathToProducts = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(pathToProducts, (err, fileContent) => {
    if(err)
      cb([]);
    else
      cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(t){
    this.title = t;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);

      fs.writeFile(pathToProducts, JSON.stringify(products), err => {
        console.log('err',err);
      });
    });
  }

  static fetchAll(cb){
    getProductsFromFile(cb);
  }
};