const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    }

},{timestamps:true})


const Admin = new mongoose.model("Admin", AdminSchema)

module.exports = Admin