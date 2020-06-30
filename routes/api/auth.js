require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const { check, validationResult, body } = require('express-validator');

// User Model
const User = require('../../models/User');

// @route   GET api/auth
// @desc    Get user data
// @access  Private
router.get('/', auth, async (req, res) => {
     console.log(req.user.id);
     try {
          const user = await User.findById(req.user.id).select('-password');
          res.json(user);
     } catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
     }
});

// @route   POST api/auth
// @desc    Authenticate user + get token
// @access  Public
router.post(
     '/',
     [
          check('email', 'Please include a valid email').isEmail(),
          check('password', 'Password is required').exists(),
     ],
     async (req, res) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          }
          const { email, password } = req.body;

          try {
               let user = await User.findOne({ email });

               // See if user does not exist
               if (!user) {
                    return res
                         .status(400)
                         .json({ errors: [{ msg: 'Invalid credentials' }] });
               }

               // Return json web token
               const payload = {
                    user: {
                         id: user.id,
                    },
               };

               const isMatch = await bcrypt.compare(password, user.password);

               if (!isMatch) {
                    return res
                         .status(400)
                         .json({ errors: [{ msg: 'Invalid credentials' }] });
               }

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
