const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    thumbnail: String,
    title: String,
    tag: String,
    desc: String,
    body: String,
    isStar:{
        type:Boolean,
        default:false
    }
},{ timestamps: true })

const Blog = new mongoose.model('blog', blogSchema)


module.exports = Blog