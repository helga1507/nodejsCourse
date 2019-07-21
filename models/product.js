const mongodb = require('mongodb');
const {getDb} = require('../util/database');

// const fs = require('fs');
// const path = require('path');
//
// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'products.json'
// );
//
// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

module.exports = class Product {
  constructor(title, imageUrl, description, price, id) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this._id = id;
  }

  save() {
    const db = getDb();
    let dbOp = db.collection('products');
    const _id = new mongodb.ObjectId(this._id);

    if(this._id){
      dbOp = dbOp.updateOne({_id}, {$set: {...this, _id}});
    }
    else {
      dbOp = dbOp.insertOne(this);
    }

    return dbOp
      .then(result => {
        console.log('result', result);
        return result;
      })
      .catch(err => {
        console.log('error insert', err)
      });
  }

  static fetchAll() {
    const db = getDb();

    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log('products',products)
        return products;
      })
      .catch(err => {
        console.log('error fetchAll', err)
      });
  }

  static findById(prodId){
    const db = getDb();

    return db
      .collection('products')
      .find({_id: new mongodb.ObjectId(prodId)})
      .next()
      .then(product => {
        console.log('products',product)
        return product;
      })
      .catch(err => {
        console.log('error findById', err)
      });
  }
};
