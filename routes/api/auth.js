require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// User Model
const User = require('../../models/User');

// @route   GET api/auth
// @desc    Get user data
// @access  Private
router.get('/', auth, async (req, res) => {
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

// @route   PUT api/auth/password
// @desc    Change password
// @access  Private
router.put(
     '/password',
     [
          auth,
          check(
               'newPassword',
               'Please enter a password with 6 or more characters'
          ).isLength({ min: 6 }),
     ],
     async (req, res) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          }
          let user = await User.findById(req.user.id);
          const { oldPassword, newPassword, newPassword2 } = req.body;
          try {
               const isMatch = await bcrypt.compare(oldPassword, user.password);

               if (!isMatch) {
                    return res.status(400).json({
                         errors: [{ msg: 'Incorrect current password' }],
                    });
               }
               const pwMatch = newPassword === newPassword2;
               if (!pwMatch) {
                    return res.status(400).json({
                         errors: [{ msg: 'New passwords do not match' }],
                    });
               }
               const salt = await bcrypt.genSalt(10);
               const encryptedPassword = await bcrypt.hash(newPassword, salt);
               await User.update(
                    { _id: req.user.id },
                    { $set: { password: encryptedPassword } }
               );
               // await user.save();
               res.json({ msg: 'Password successfully updated' });
          } catch (err) {
               console.error(err.message);
               res.status(500).send('Server error');
          }
     }
);

// @route   DELETE api/auth/
// @desc    Delete profile, albums, and pictures
// @access  Private
router.delete('/', auth, async (req, res) => {
     try {
          // Removes user's associated albums, pictures, prompts
          let thisUser = await User.findOne({ _id: req.user.id });
          for (let i = 0; i < thisUser.album.length; i++) {
               await Album.findByIdAndDelete({ _id: thisUser.album[i] });
               await Picture.remove({ album: thisUser.album[i] });
               await Prompt.remove({ album: thisUser.album[i] });
          }

          // Removes user
          await User.findOneAndDelete({ _id: req.user.id });

          res.json({ msg: 'User and all associated data deleted' });
     } catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
     }
});

module.exports = router;
