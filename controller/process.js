const pro = require('../model/model')
const cart = require('../model/cart')
// let product = []

exports.process = (req,res)=>{
    res.render('editing',{editing:false})
}
exports.items = (req,res) =>{
    // product.push({title : req.body.title,desc:req.body.desc,price:req.body.price})
    const prod = new pro(null,req.body.title,req.body.desc,req.body.price)
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
    const prodId = req.body.productId
    const updateTitle = req.body.title
    const updatedPrice = req.body.price
    const updatedDesc = req.body.desc
    const updatedProduct= new pro(prodId,updateTitle,updatedDesc,updatedPrice)
    updatedProduct.save()
    res.redirect('/products')
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
    res.redirect('/cart')
}

exports.output = (req,res) =>{
    // console.log(product)
    pro.fetchAll((products)=>{
        res.render('products',{products,editing:false})
        console.log(products)
    })
    // res.render('products',{product})
}

exports.postDeleteProduct=(req,res) =>{
    const prodId = req.body.productId
    pro.delete(prodId)
    res.redirect('/products')
}

exports.getCarts=(req,res)=>{
    cart.getCart(Cart=>{
        pro.fetchAll(products=>{
            const cartProducts=[]
            for(let product of products){
                const cartProductsData=Cart.products.find(prod=>prod.id===product.id)
                if(cartProductsData){
                    cartProducts.push({productData:product,qty:cartProductsData.qty})
                }
            }
            res.render('cart',{products:cartProducts})
        })
      
    })
    
}

exports.postcartdelete=(req,res)=>{
    const prodId = req.body.productId
    pro.findById(prodId,product=>{
    cart.deleteProduct(prodId,product.price)
    res.redirect('/cart')
    })
}