const axios = require("axios");
const db = require("../models");
const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
    // res.render(path.join(__dirname, '../public/views', 'index.handlebars'));
    res.render("welcome");
})


module.exports = router;