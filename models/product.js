const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

const writeProductsToFile = updatedProducts => {
  fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    if(err) console.log('err write products',err);
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if(this.id) {
        const existingProductIndex = products.findIndex(item => item.id === this.id);
        const updatedProducts = [...products];

        updatedProducts[existingProductIndex] = this;

        writeProductsToFile(updatedProducts);
      }
      else {
        this.id = Math.random().toString();
        products.push(this);
        writeProductsToFile(products);
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb){
    getProductsFromFile(products => {
      const product = products.find(item => item.id === id);

      cb(product);
    })
  }

  static deleteById(id){
    getProductsFromFile(products => {
      const updatedProducts = products.filter(item => item.id !== id);

      Cart.deleteProduct(id);
      writeProductsToFile(updatedProducts);
    });
  }
};
