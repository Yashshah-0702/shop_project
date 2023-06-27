const fs = require('fs')
const path = require('path')


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
    
    save(){
      if(this.id){
        const existingProductIndex = products.findIndex(prod => prod.id===this.id)
        const updatedProducts = [...products]
        updatedProducts[existingProductIndex]=this
      }
        this.id = Math.random().toString()
        let products = []
      const p = path.join(path.dirname(process.mainModule.filename),'data','products.json')

        fs.readFile(p,(err,fileContent)=>{
            if(!err){
                products=JSON.parse(fileContent)
            }
        products.push(this)
        fs.writeFile(p,JSON.stringify(products),(err)=>{
            console.log(err)
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