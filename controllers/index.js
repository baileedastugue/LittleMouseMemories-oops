const axios = require("axios");
const db = require("../models");
const express = require("express");
const path = require("path");
const router = express.Router();

// Landing page
router.get("/", (req, res) => {
    res.render("welcome");
})

// Dashboard
router.get("/dashboard", (req, res) => {
    res.render("dashboard");
})

module.exports = router;