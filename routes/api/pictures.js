const db = require('../../models');
const Album = db.Album;
const User = db.User;
const Picture = db.Pictures;
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route   GET api/pictures
// @desc    Get all pictures from a certain user
// @access  Private
// router.get('/', auth, async (req, res) => {
//      try {
//           console.log(req.user.id);
//           const user = await User.findById(req.user.id);
//           console.log(user);

//           // if (!picture) {
//           //      res.status(400).json({
//           //           msg: 'There are no pictures in this album',
//           //      });
//           // }
//      } catch (err) {
//           console.error(err.message);
//           res.status(500).send('Server error');
//      }
// });

// @route   GET api/pictures/:album_id
// @desc    Get all pictures from a single album
// @access  Private

// @route   GET api/pictures/:picture_id
// @desc    Get a single picture
// @access  Private

// @route   POST api/pictures
// @desc    Post a new picture
// @access  Public
router.post(
     '/:album_id',
     [check('image', 'Please inclde a picture').not().isEmpty()],
     async (req, res) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          }

          const newPicture = new Picture({
               image: req.body.image,
               caption: req.body.caption,
               album: req.params.album_id,
               dateRecorded: req.body.dateRecorded,
               uploadedBy: req.body.uploadedBy,
          });
          const picture = await newPicture.save();

          Album.findOneAndUpdate(
               { _id: req.params.album_id },
               { $push: { pictures: picture } },
               (error, success) => {
                    if (error) {
                         console.log(error);
                    } else {
                         console.log(success);
                         console.log(61);
                    }
               }
          );
          res.json(picture);
     }
);

// @route   DELETE api/albums/:id
// @desc    Delete an album
// @access  Public
router.delete('/:id', (req, res) => {
     Picture.findById(req.params.id)
          .then((picture) =>
               picture.remove().then(() => res.json({ success: true }))
          )
          .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
