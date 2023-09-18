const express = require('express');
const router = express.Router();
const Blog = require('./../models/blog');

router.get('/', (req, res) => {
    Blog.find().sort({ date: -1 })
        .then((result) => {
            res.render('index', {
                blogs: result, months: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ]
            });
        })
        .catch((err) => console.log(err))
})


router.get("/blog/:id", (req, res) => {
    const { id } = req.params;
    Blog.findById(id)
        .then((result) => {
            res.render('blog', { blog: result })
        })
        .catch((err) => {
            console.log("Blog not available")
        })
})

router.get("/about", (req, res) => {
    res.render("about")
})

router.get("/contacts", (req, res) => {
    res.render("contacts")
})


module.exports = router