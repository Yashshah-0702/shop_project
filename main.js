const express = require('express')
const app = express()
const body = require('body-parser')
const route = require('./routes/route')
const error = require('./controller/error')

app.set('view engine','ejs')
app.set('views','views')

app.use(body.urlencoded({extended:false}))

app.use(route)
app.use(error.page)

app.listen(5600)