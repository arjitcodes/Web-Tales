require('dotenv').config()
const express = require('express')
const app = express();
require('./configs/db')

const cookieParser = require('cookie-parser')
const { isLogin } = require('./middlewares/login');

const port = process.env.PORT || 3000


const router=require('./routes/publicGet')
const adminGetRouter=require('./routes/adminGet')
const blogPostRouter=require('./routes/blogPost')
const adminPostRouter=require('./routes/adminPost')

app.use(express.urlencoded());
app.use(express.json())
app.use(cookieParser())



app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use(express.static('public'));
app.use(isLogin)
app.use(router)
app.use(adminGetRouter)
app.use(adminPostRouter)
app.use(blogPostRouter)


app.use('*', (req, res) => {
    res.status(404).render('404');
})

app.listen(port, () => {
    console.log(`WebTales listening on port : ${port}`)
})