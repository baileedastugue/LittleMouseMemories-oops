const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
require('dotenv').config();
const jwt = require('jsonwebtoken');


// User Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new users
// @access  Public
router.post('/', (req, res) => {
    const { 
        firstName,
        lastName, 
        email,
        password, 
        password2 } = req.body;

   let errors = [];
   // check required fields
   if (!firstName || 
        !lastName || 
        !email || 
        !password || 
        !password2) {
    //    errors.push({
    //        msg: "Please fill in all fields"
    //    })
        return res.status(400).json({ msg: 'Please fill in all fields'});
   }
   if (password !== password2) {
        // errors.push({
        //     msg: "Passwords need to match"
        // })
        return res.status(400).json({ msg: 'Passwords need to match'});
    }
    if (password.length < 6) {
        // errors.push ({
        //     msg: "Password should be at least 6 characters"
        // })
        return res.status(400).json({ msg: 'Password should be at least 6 characters'});
    }
    // if (errors.length > 0) {
    //     res.render("register", {
    //         errors, 
    //         firstName, 
    //         lastName, 
    //         email, 
    //         password, 
    //         password2
    //     })
    // } else {
        else {
        User.findOne({ email })
            .then(user => {
                if(user) {
                    // user exists
                    // errors.push( {
                    //     msg: "Email is already registered"
                    // })
                    // res.render("register", {
                    //     errors, 
                    //     firstName, 
                    //     lastName, 
                    //     email, 
                    //     password, 
                    //     password2
                    // })
                    return res.status(400).json({ msg: 'User already exists '});
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
                                    // req.flash(
                                    //     "success_msg", 
                                    //     "You are now registered and can log in"
                                    // );
                                    // res.send(user);
                                    // res.send(process.env.JWT_SECRET);
                                    jwt.sign(
                                        { id: user.id },
                                        // can add name + whatever }
                                        process.env.JWT_SECRET,
                                        // token lasts for 1 hour
                                        { expiresIn: 3600 },
                                        (err, token) => {
                                            if(err) throw err;
                                            res.json({
                                                token,
                                                user: {
                                                    id: user.id,
                                                    firstName: user.firstName,
                                                    lastName: user.lastName,
                                                    email: user.email
                                                }
                                            });
                                        }
                                    );
                                    // res.redirect("/users/login");
                                })
                                .catch(err => console.log(err));
                        })
                    })                    
                }
            })
    }
});

module.exports = router;