const axios = require("axios");
const db = require("../models");
const express = require("express");
const path = require("path");
const router = express.Router();



router.get("/user/:id?", (req, res) => {
    res.render(path.join(__dirname, '../public/views', 'user.handlebars'));
})

router.get("/album/", (req, res) => {
    res.render(path.join(__dirname, '../public/views', 'album.handlebars'));
})

router.post("/signup/", (req, res) => {
    console.log("req.body", req.body);
    db.User.create(req.body)
        .then(dbUser => {
            console.log("line 23");
        })
        .catch(err => {
            console.log("line 26");
            res.json(err);
        })
        .then(() => {
            return res.redirect("/user")
        })
})

router.post("/signin/", (req, res) => {
    // console.log("req.body", req.body);
    db.User.findOneAndUpdate({
        username: req.body.username,
        password: req.body.password
    }, {signedIn: true}, function (err, results) {
        if (err) {console.log(err)};
        if (results) {
            console.log("user successfully found + signed in");
            return res.redirect("/user/" );
        };
        if (!results) {
            console.log("no user found");
            return res.redirect("/");
        };
    }).lean()
})

module.exports = router;
