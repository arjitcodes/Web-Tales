const express = require('express');
const router = express.Router()
const { isLogin } = require('../middlewares/login');
// const Blog = require('./models/blog');
const Blog = require('./../models/blog');



router.use('/admin/*', isLogin, (req, res, next) => {
    if (!req.isValidAdmin) {
        res.status(404).render('404');
    } else {
        next()
    }
})


router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/admin', isLogin, (req, res) => {
    if (!req.isValidAdmin) {
        res.redirect('login')
    } else {
        res.render('admin')
    }
})

router.get('/admin/blogs', (req, res) => {
    Blog.find().sort({ date: -1 })
        .then((result) => {
            res.render('adminblog', { blogs: result });
        })
        .catch((err) => {
            console.log(err);
            res.render('404',{msg:"Server problrm"})
        })
})

router.get('/admin/new-blog', (req, res) => {
    res.render('addBlog')
})

router.get("/admin/new-admin", (req, res) => {

    res.render("new-admin")

})

router.get('/updateBlog/:id', (req, res) => {
    const { id } = req.params;
    Blog.findById(id)
        .then((result) => {
            res.render('updateBlog', { blog: result, id })
        })
        .catch(((err) => {
            console.log(err);
            res.render('404',{msg:"Server problrm"})
        }))
})


module.exports = router;