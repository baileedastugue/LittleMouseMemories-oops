require('dotenv').config();
const db = require('../../models');
const Album = db.Album;
const User = db.User;
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

// @route   GET api/albums/
// @desc    Get current user's albums
// @access  Private
router.get('/', auth, async (req, res) => {
     try {
          const user_id = req.user.id;
          const album = await Album.find({
               user: user_id,
          })
               .sort({
                    date: -1,
               })
               .populate('user', ['firstName', 'lastName', '_id']);

          if (!album) {
               res.status(400).json({
                    msg: 'There are no albums for this user',
               });
          }
          res.json(album);
     } catch (err) {
          console.error(err.message);
          if (err.kind == 'ObjectId') {
               res.status(400).json({
                    msg: 'Albums not found',
               });
          }
          res.status(500).send('Server error');
     }
});

// @route   GET api/albums/private
// @desc    Get user data
// @access  Private
router.post('/private/:album_id', async (req, res) => {
     const { albumId, password } = req.body;
     try {
          let album = await Album.findById(albumId);
          const isMatch = await bcrypt.compare(password, album.password);
          if (!isMatch) {
               return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid credentials' }] });
          }
          res.json(album);
     } catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
     }
});

// @route   GET api/albums/:album_id
// @desc    Get pictures and prompts from one album
// @access  Public
router.get('/:album_id', async (req, res) => {
     try {
          // const user_id = req.user.id;
          const album_id = req.params.album_id;
          const album = await Album.find({
               _id: album_id,
          })
               .populate('user', ['firstName', 'lastName', '_id'])
               .populate('pictures', [
                    'image',
                    'dateUploaded',
                    'dateRecorded',
                    'uploadedBy',
                    'caption',
               ])
               .populate('prompts', [
                    'prompt',
                    'response',
                    'dateUploaded',
                    'dateRecorded',
                    'uploadedBy',
               ]);

          if (!album) {
               res.status(400).json({
                    msg: 'This album does not exist for this user',
               });
          }
          res.json(album);
     } catch (err) {
          console.error(err.message);
          if (err.kind === 'ObjectId') {
               return res
                    .status(404)
                    .json({ msg: 'This album does not exist for this user' });
          }
          res.status(500).send('Server error');
     }
});

// @route   GET api/albums/:album_id/pictures
// @desc    Get pictures from one album
// @access  Public
router.get('/:album_id/pictures', async (req, res) => {
     try {
          // const user_id = req.user.id;
          const album_id = req.params.album_id;
          const album = await Album.find({
               _id: album_id,
          })
               .populate('user', ['firstName', 'lastName', '_id'])
               .populate('pictures', [
                    'image',
                    'dateUploaded',
                    'dateRecorded',
                    'uploadedBy',
                    'caption',
               ]);
          if (!album) {
               res.status(400).json({
                    msg: 'This album does not exist for this user',
               });
          }
          res.json(album);
     } catch (err) {
          console.error(err.message);
          if (err.kind === 'ObjectId') {
               return res
                    .status(404)
                    .json({ msg: 'This album does not exist for this user' });
          }
          res.status(500).send('Server error');
     }
});

// @route   GET api/albums/:album_id/
// @desc    Get prompts from one album
// @access  Public
router.get('/:album_id', async (req, res) => {
     try {
          const album = await Album.find({
               _id: album_id,
          })
               .populate('user', ['firstName', 'lastName', '_id'])
               .populate('prompts', [
                    'prompt',
                    'response',
                    'dateUploaded',
                    'dateRecorded',
                    'uploadedBy',
               ]);

          if (!album) {
               res.status(400).json({
                    msg: 'This album does not exist for this user',
               });
          }
          res.json(album);
     } catch (err) {
          console.error(err.message);
          if (err.kind === 'ObjectId') {
               return res
                    .status(404)
                    .json({ msg: 'This album does not exist for this user' });
          }
          res.status(500).send('Server error');
     }
});

// @route   POST api/albums/
// @desc    Post a new album
// @access  Private
router.post(
     '/',
     [auth, [check('title', 'A title is required').not().isEmpty()]],
     async (req, res) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          }
          const albumFields = {};
          const { title, password, passwordRequired } = req.body;
          albumFields.title = title;
          albumFields.passwordRequired = passwordRequired;
          albumFields.user = req.user.id;

          try {
               let objAlbum = Album.find({ user: req.user.id });
               const salt = await bcrypt.genSalt(10);
               albumFields.password = await bcrypt.hash(password, salt);

               objAlbum = new Album(albumFields);
               await objAlbum.save();
               User.findOneAndUpdate(
                    { _id: req.user.id },
                    { $push: { album: objAlbum } },
                    (error, success) => {
                         if (error) {
                              console.log(error);
                         } else {
                              console.log(success);
                         }
                    }
               );
               res.json(objAlbum);
          } catch (err) {
               console.error(err.message);
               res.status(500).send('Server Error');
          }
     }
);

// @route   PUT api/albums/:album_id
// @desc    Update an album name
// @access  Private
router.put(
     '/:album_id',
     [auth, [check('newTitle', 'A new title is required').not().isEmpty()]],
     async (req, res) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          }
          const { newTitle } = req.body;
          try {
               const album_id = req.params.album_id;
               await Album.update(
                    {
                         _id: album_id,
                    },
                    { $set: { title: newTitle } }
               );
               res.json({ msg: 'Album title successfully updated' });
          } catch (err) {
               console.error(err.message);
               res.status(500).send('Server error');
          }
     }
);

// @route   PUT api/albums/password/:album_id
// @desc    Update an album password
// @access  Private
router.put('/password/:album_id', auth, async (req, res) => {
     let { newPassword, passwordRequired } = req.body;
     try {
          const salt = await bcrypt.genSalt(10);
          newPassword = await bcrypt.hash(newPassword, salt);
          await Album.update(
               { _id: req.params.album_id },
               {
                    $set: {
                         password: newPassword,
                         passwordRequired: passwordRequired,
                    },
               }
          );
          res.json({ msg: 'Album password successfully updated' });
     } catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
     }
});

// @route   DELETE api/albums/:album_id
// @desc    Delete an album
// @access  Private
router.delete('/:album_id', auth, async (req, res) => {
     try {
          await Picture.remove({ album: req.params.album_id });
          await Prompt.remove({ album: req.params.album_id });
          await Album.findOneAndDelete({ _id: req.params.album_id });
          await User.update(
               { _id: req.user.id },
               { $pull: { album: { $in: [req.params.album_id] } } },
               { multi: true }
          );
          res.json({ msg: 'Album deleted' });
     } catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
     }
});

module.exports = router;
