require('dotenv').config();
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
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
     // body('password2').custom((value, { req }) => {
     //      if (value !== req.body.password) {
     //           console.log(value);
     //           console.log(req.body.password === req.body.password2);
     //           throw new Error('Passwords do not match');
     //      }
     //      return true;
     // }),
     async (req, res) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          }

          const { firstName, lastName, email, password } = req.body;

          try {
               let user = await User.findOne({ email });
               // See if user exists
               if (user) {
                    return res
                         .status(400)
                         .json({ errors: [{ msg: 'User already exists' }] });
               }
               const avatar = gravatar.url(email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm',
               });
               user = new User({
                    firstName,
                    lastName,
                    email,
                    password,
                    avatar,
               });

               // Encrypt password
               const salt = await bcrypt.genSalt(10);

               user.password = await bcrypt.hash(password, salt);

               await user.save();

               // Return json web token
               const payload = {
                    user: {
                         id: user.id,
                    },
               };

               jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: 36000 },
                    (err, token) => {
                         if (err) throw err;
                         res.json({ token });
                    }
               );
          } catch (err) {
               console.error(err.message);
               res.status(500).send('Server error');
          }
     }
);

module.exports = router;
