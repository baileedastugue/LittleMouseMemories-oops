const db = require('../../models');
const Album = db.Album;
const User = db.User;
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

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
               .populate('picture')
               .populate('prompt');

          if (!album) {
               res.status(400).json({
                    msg: 'There are no albums for this user',
               });
          }
          console.log(album);
          res.json(album);
     } catch (err) {
          console.error(err.message);
          if (err.kind === 'ObjectId') {
               return res
                    .status(404)
                    .json({ msg: 'There are no albums for this user' });
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
          const { title } = req.body;
          albumFields.title = title;
          albumFields.user = req.user.id;

          try {
               let objAlbum = Album.find({ user: req.user.id });
               objAlbum = new Album(albumFields);
               await objAlbum.save();
               //    console.log(req.user.id);
               console.log(req.user.id);
               User.findOneAndUpdate(
                    { _id: req.user.id },
                    { $push: { album: objAlbum } },
                    (error, success) => {
                         if (error) {
                              console.log(error);
                         } else {
                              console.log(success);
                              console.log(96);
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
