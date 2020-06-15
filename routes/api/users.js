const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { check, validationResult, body } = require('express-validator');

// User Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post(
     '/',
     [
          check('firstName', 'First name is required').not().isEmpty(),
          check('lastName', 'Last name is required').not().isEmpty(),
          check('email', 'Please include a valid email').isEmail(),
          check(
               'password',
               'Please enter a password with 6 or more characters'
          ).isLength({ min: 6 }),
     ],
     body('passwordConfirmation').custom((value, { req }) => {
          if (value !== req.body.password) {
               throw new Error('Passwords do not match');
          }
          return true;
     }),
     (req, res) => {
          const { firstName, lastName, email, password, password2 } = req.body;
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          } else {
               User.findOne({ email }).then((user) => {
                    if (user) {
                         return res
                              .status(400)
                              .json({ msg: 'User already exists ' });
                    } else {
                         const newUser = User({
                              firstName,
                              lastName,
                              email,
                              password,
                         });

                         // Hashing the password
                         bcrypt.genSalt(10, (err, salt) => {
                              bcrypt.hash(
                                   newUser.password,
                                   salt,
                                   (err, hash) => {
                                        if (err) throw err;
                                        // sets password to hash
                                        newUser.password = hash;

                                        newUser
                                             .save()
                                             .then((user) => {
                                                  jwt.sign(
                                                       { id: user.id },
                                                       // can add name + whatever }
                                                       process.env.JWT_SECRET,
                                                       // token lasts for 1 hour
                                                       { expiresIn: 3600 },
                                                       (err, token) => {
                                                            if (err) throw err;
                                                            res.json({
                                                                 token,
                                                                 user: {
                                                                      id:
                                                                           user.id,
                                                                      firstName:
                                                                           user.firstName,
                                                                      lastName:
                                                                           user.lastName,
                                                                      email:
                                                                           user.email,
                                                                 },
                                                            });
                                                       }
                                                  );
                                                  // res.redirect("/users/login");
                                             })
                                             .catch((err) => console.log(err));
                                   }
                              );
                         });
                    }
               });
          }
     }
);

module.exports = router;
