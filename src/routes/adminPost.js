const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin')
const bcrypt = require('bcrypt');
const { isLogin } = require('../middlewares/login');


router.post("/login", async (req, res) => {

    const { adminId, password } = req.body;
    if (!password || !adminId || password.length < 8 || adminId.length < 8) {
        res.json({ success: false, error: "Enter valid details" })
        console.log("1")
    }
    else {
        const admin = await Admin.findOne({ id: adminId })
        if (!admin) {
            res.json({ success: false, error: "Enter valid details" })
            console.log("2")
        }
        else {
            const isCorrectPass = bcrypt.compareSync(password, admin.password);
            if (!isCorrectPass) {
                res.json({ success: false, error: "Enter valid details4" })
            } else {
                const token = jwt.sign({ id: admin._id }, `${process.env.SECRET_KEY}`, { expiresIn: '24h' });

                //    console.log(token)
                res.cookie('sessionId', token)
                // res.json({ success: true })
                res.redirect('/admin')
            }
        }
    }

})


router.post("/admin/newAdmin", isLogin, async (req, res) => {
    if (req.isValidAdmin) {
        const { adminId, password, confirmPassword } = req.body;
        console.log(req.body)
        if (password !== confirmPassword) {
            res.json({ success: false, err: "Password & confirm password didn't match" })
        } else {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(password, salt);
            const willAdmin = new Admin({ id: adminId, password: hash })
            const response = await willAdmin.save()
            res.json(response)
        }
    } else {
        res.json({ success: false })
    }
})



module.exports = router;
