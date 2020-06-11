const axios = require("axios");
const db = require("../models");
const express = require("express");
const path = require("path");
const router = express.Router();

// router.get("/login", (req, res) => {
//     // res.render(path.join(__dirname, '../public/views', 'index.handlebars'));
//     res.send("welcome");
// })

router.get("/register", (req, res) => {
    res.render("register");
})

router.get("/login", (req, res) => {
    // res.render(path.join(__dirname, '../public/views', 'index.handlebars'));
    res.render("login");
})


module.exports = router;