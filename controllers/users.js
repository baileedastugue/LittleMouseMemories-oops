const axios = require("axios");
const db = require("../models");
const express = require("express");
const path = require("path");
const router = express.Router();
const User = db.User;
const bcrypt = require("bcryptjs");
const passport = require("passport");

router.get("/register", (req, res) => {
    res.render("register");
})

router.get("/login", (req, res) => {
    res.render("login");
})

router.post("/register", (req, res) => {
   const {
    firstName, lastName, email, password, password2
   } = req.body;
   console.log(firstName);

   let errors = [];

   // check required fields
   if (!firstName || !lastName || !email || !password || !password2) {
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
            password, 
            password2
        })
    } else {
        console.log("from line 53");
        User.findOne({ email: email })
            .then(user => {
                if(user) {
                    // user exists
                    errors.push( {
                        msg: "Email is already registered"
                    })
                    res.render("register", {
                        errors, 
                        firstName, 
                        lastName, 
                        email, 
                        password, 
                        password2
                    })
                } else {
                    const newUser = User({
                        firstName,
                        lastName,
                        email,
                        password
                    });

                    // Hashing the password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            // sets password to hash
                            newUser.password = hash;

                            newUser.save()
                                .then(user => {
                                    req.flash(
                                        "success_msg", 
                                        "You are now registered and can log in"
                                    );
                                    res.redirect("/users/login");
                                })
                                .catch(err => console.log(err));
                        })
                    })


                    
                }
            })
    }
});

// login handler
router.post("/login", (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: "/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true
      })(req, res, next);
})

// logout handler
router.get("/logout", (req, res) => {
    req.logout();
    req.flash(
        "success_msg", 
        "You are logged out");
    res.redirect("/users/login");
})

module.exports = router;