const pro = require('../model/model')
const cart = require('../model/cart')
// let product = []

exports.process = (req,res)=>{
    res.render('editing',{editing:false})
}
exports.items = (req,res) =>{
    // product.push({title : req.body.title,desc:req.body.desc,price:req.body.price})
    const prod = new pro(req.body.title,req.body.desc,req.body.price)
    prod.save()
    res.redirect('/products')
}
exports.getProduct = (req,res) =>{
    const productId = req.params.productId
    pro.findById(productId, product =>{
        // console.log(product)
        res.render('details',{product:product})
    })
    // res.redirect('/')
}

exports.postEditProduct=(req,res)=>{
    
}

exports.editProduct=(req,res)=>{
    const editMode = req.query.edit;
    if(!editMode){
       return res.redirect('/')
    }
    const prodId = req.params.productId;
    pro.findById(prodId,product=>{
        if(!product){
            return res.redirect('/');
        }
        res.render('editing',{
            editing:editMode,
            product:product
        })
    })
    
}

exports.postcart=(req,res) =>{
    const prodId = req.body.productId
    pro.findById(prodId,(products)=>{
        console.log(products.price)
        cart.addProducts(prodId,products.price)
    })
    // console.log(prodId)
    res.redirect('/products')
}

exports.output = (req,res) =>{
    // console.log(product)
    pro.fetchAll((products)=>{
        res.render('products',{products,editing:false})
        console.log(products)
    })
    // res.render('products',{product})
}