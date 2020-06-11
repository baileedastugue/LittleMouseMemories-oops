const axios = require("axios");
const db = require("../models");
const express = require("express");
const path = require("path");
const router = express.Router();


router.get("/register", (req, res) => {
    res.render("register");
})

router.get("/login", (req, res) => {
    // res.render(path.join(__dirname, '../public/views', 'index.handlebars'));
    res.render("login");
})

router.post("/register", (req, res) => {
   const {
    firstName, lastName, email, username, password, password2
   } = req.body;
   console.log(firstName);

   let errors = [];

   // check required fields
   if (!firstName || !lastName || !email || !username || !password || !password2) {
       errors.push({
           msg: "Please fill in all fields"
       })
   }
   if (password !== password2) {
        errors.push({
            msg: "Passwords need to match"
        })
    }

    if (password.length < 6) {
        errors.push ({
            msg: "Password should be at least 6 characters"
        })
    }

    if (errors.length > 0) {
        res.render("register", {
            errors, 
            firstName, 
            lastName, 
            email, 
            username, 
            password, 
            password2
        })
    } else {
        res.send("pass");
    }
});


module.exports = router;