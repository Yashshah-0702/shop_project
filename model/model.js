const fs = require('fs')
const path = require('path')

const cart = require('./cart')

const getProductsFromFile = cb => {
    const p = path.join(path.dirname(process.mainModule.filename),'data','products.json')
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  };

module.exports = class Product{
    
    constructor(id,t,d,p){
        this.id=id
        this.title = t
        this.desc = d
        this.price = p
    }
    
    save() {
      getProductsFromFile(products => {
    const p = path.join(path.dirname(process.mainModule.filename),'data','products.json')
        if (this.id) {
          const existingProductIndex = products.findIndex(
            prod => prod.id === this.id
          );
          const updatedProducts = [...products];
          updatedProducts[existingProductIndex] = this;
          fs.writeFile(p, JSON.stringify(updatedProducts), err => {
            console.log(err);
          });
        } else {
          // let products=[]
          this.id = Math.random().toString();
          products.push(this);
          fs.writeFile(p, JSON.stringify(products), err => {
            console.log(err);
          });
        }
      });
    }

    static delete(id){
      getProductsFromFile(products =>{
      const p = path.join(path.dirname(process.mainModule.filename),'data','products.json')
        const product = products.find(prod=> prod.id === id)
        const productIndex = products.filter(prod=> prod.id !== id)
       fs.writeFile(p,JSON.stringify(productIndex),err=>{
        if(!err){
            cart.deleteProduct(id,product.price)
        }
       })
      })
    }

    static fetchAll(cb){
      const p = path.join(path.dirname(process.mainModule.filename),'data','products.json')
      getProductsFromFile(cb)
    }

    static findById(id,cb){
      getProductsFromFile(products =>{
        const product = products.find(p=> p.id === id)
        cb(product)
      })
    }
}