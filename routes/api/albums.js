require('dotenv').config();
const db = require('../../models');
const Album = db.Album;
const User = db.User;
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
// const {
//      default: AddAlbumForm,
// } = require('../../client/src/components/Album/AddAlbum/AddAlbumForm');

// Dashboard

// @route   GET api/albums/
// @desc    Get current user's albums
// @access  Private
router.get('/', auth, async (req, res) => {
     try {
          const user_id = req.user.id;
          const album = await Album.find({
               user: user_id,
          }).populate('user', ['firstName', 'lastName', '_id']);

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
     console.log(albumId);
     console.log(req.body);
     console.log('line 50');
     try {
          console.log(albumId);
          let album = await Album.findById(albumId);
          console.log(album);
          const isMatch = await bcrypt.compare(password, album.password);
          console.log(isMatch);
          console.log(await bcrypt.compare(password, album.password));
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
          console.log(album_id);
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
          console.log(album);
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

// @route   GET api/albums/:album_id/prompts
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

// @route   DELETE api/albums/:album_id
// @desc    Delete an album
// @access  Private
router.delete('/:album_id', auth, async (req, res) => {
     try {
          // Removes album
          console.log(req.user.id);
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

// @route   DELETE api/albums/
// @desc    Delete profile, albums, and pictures
// @access  Private
router.delete('/', auth, async (req, res) => {
     try {
          console.log(req.user.id);
          // Removes albums
          let thisUser = await User.findOne({ _id: req.user.id });
          console.log(thisUser.album.length);
          for (let i = 0; i < thisUser.album.length; i++) {
               await Album.findByIdAndDelete({ _id: thisUser.album[i] });
          }
          // Removes user
          await User.findOneAndDelete({ _id: req.user.id });

          // todo - remove pictures

          res.json({ msg: 'User deleted' });
     } catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
     }
});

module.exports = router;
