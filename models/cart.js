const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

const getCartFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if(err)
      cb({products: [], totalPrice: 0});
    else
      cb(JSON.parse(fileContent));
  });
};

const writeCartToFile = updatedCart => {
  fs.writeFile(p, JSON.stringify(updatedCart), err => {
    if(err) console.log('err write cart',err);
  });
};

module.exports = class Cart{
  static addProduct(id, productPrice){
    getCartFromFile(cart => {
      const updatedCart = {...cart};
      const existingProductIndex = updatedCart.products.findIndex(item => item.id === id);
      const existingProduct = updatedCart.products[existingProductIndex];

      let updatedProduct;

      if(existingProduct){
        updatedProduct = {...existingProduct};
        updatedProduct.qty++;

        updatedCart.products[existingProductIndex] = updatedProduct;
      }
      else {
        updatedProduct = {id, qty: 1};
        updatedCart.products = [...updatedCart.products, updatedProduct];
      }

      updatedCart.totalPrice += +productPrice;

      writeCartToFile(updatedCart);
    });
  }

  static deleteProduct(id) {
    getCartFromFile(cart => {
      if(!cart.products.length)
        return true;

      const updatedCart = {...cart};
      const product = updatedCart.products.find(prod => prod.id === id);

      if(product) {
        const productQty = product.qty;
        const productPrice = product.price;

        updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
        updatedCart.totalPrice -= productPrice * productQty;

        writeCartToFile(updatedCart);
      }
    });
  }

  static getCart(cb){
    getCartFromFile(cb);
  }
};