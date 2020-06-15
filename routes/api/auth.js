require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');


// User Model
const User = require('../../models/User');

// @route   POST api/auth
// @desc    Authenticate user
// @access  Public
router.post('/', (req, res) => {
    const { 
        email,
        password, 
        } = req.body;

   let errors = [];
   // check required fields
   if (!email || !password) {
    //    errors.push({
    //        msg: "Please fill in all fields"
    //    })
        return res.status(400).json({ msg: 'Please fill in all fields'});
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
                if (!user) {
                    // errors.push( {
                    //     msg: "User does not exist"
                    // })
                    // res.render("register", {
                    //     errors, 
                    //     firstName, 
                    //     lastName, 
                    //     email, 
                    //     password, 
                    //     password2
                    // })
                    return res.status(400).json({ msg: 'User does not exist'});
                } else {
                    bcrypt.compare(password, user.password)
                        .then(isMatch => {
                            if(!isMatch) return res.status(400).json({ msg: 'invalid credientials' });
                            else {
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
                            }
                        })    
                }
            })
    }
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});


module.exports = router;