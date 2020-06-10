// const axios = require("axios");
// const db = require("../models");
const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
    res.render("index");
})

module.exports = router;