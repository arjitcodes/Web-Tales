const express = require('express');
const router = express.Router();
const multer = require('multer')
const Blog = require('./../models/blog');
const fs = require('fs')
const path = require('path');
const { isLogin } = require('../middlewares/login');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/uploads")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload = multer({ storage: storage })




router.put('/blog/:id', isLogin, async (req, res) => {
    if (req.isValidAdmin) {
        const { id } = req.params;
        console.log(id)
        console.log(req.body)
        const doc = await Blog.findOneAndUpdate({ _id: id }, req.body, {
            new: true
        });

        res.json({ success: true, doc })
    } else {
        res.json({ success: false })
    }
})

router.post('/blog', isLogin, async (req, res) => {
    if (req.isValidAdmin) {
        var { thumbnailUrl, title, tag, desc, body, isStar } = req.body

        if (isStar) {
            await Blog.findOneAndUpdate({ isStar: true }, { isStar: false })
        }

        const newBlog = new Blog({ thumbnail: thumbnailUrl, title, tag, desc, body, isStar })
        const newSavedBlog = await newBlog.save()

        res.redirect(`/blog/${newSavedBlog._id}`)
    } else {
        res.json({ success: false })
    }
})


router.delete("/blog/:id", async (req, res) => {
    if (req.isValidAdmin) {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id)
        res.json({ success: true, deletedBlog })
    } else {
        res.json({ success: false })
    }
})


//blog's images


router.post("/delete", isLogin, (req, res) => {
    if (req.isValidAdmin) {
        const { url } = req.body;
        console.log(req.body)
        const fileName = url.split('uploads/')[1]
        console.log(fileName)
        console.log(path.join(__dirname, `/../public/uploads/${fileName
            }`))

        fs.unlinkSync(path.join(__dirname, `/../public/uploads/${fileName
            }`), function (err) {
                if (err) {
                    console.log(err)
                    res.json({ success: false, err })
                }
                else {
                    res.json({ success: true })
                }
            })
    } else {
        res.json({ success: false })
    }
})



router.post('/uploadCover', upload.single('thumbnail'), (req, res) => {
    res.json({
        "url": `/../../uploads/${req.file.filename}`,
    })
})

router.post("/uploadImage", upload.any(), (req, res) => {
    res.json({
        "uploaded": true,
        "url": `/../../uploads/${req.files[0].filename}`,
    })
})


router.put('/makeStar/:id', isLogin, async (req, res) => {
    if (req.isValidAdmin) {
        const { id } = req.params;
        await Blog.findOneAndUpdate({ isStar: true }, { isStar: false })
        await Blog.findOneAndUpdate({ _id: id }, { isStar: true })
        res.json({ success: true })
    } else {
        res.json({ success: false })
    }
})


module.exports = router;