const db = require('../../models');
const Album = db.Album;
const User = db.User;
const Picture = db.Pictures;
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route   GET api/pictures/:album_id
// @desc    Get all pictures from a single album
// @access  Public
router.get('/album/:album_id', async (req, res) => {
     try {
          const pictures = await Picture.find({
               album: req.params.album_id,
          }).sort({
               dateUploaded: -1,
          });

          if (!pictures) {
               res.status(400).json({
                    msg: 'Cannot find this album',
               });
          }

          res.json(pictures);
     } catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
     }
});

// @route   GET api/pictures/:picture_id
// @desc    Get a single picture
// @access  Private
router.get('/picture/:picture_id', async (req, res) => {
     try {
          console.log(req.params.picture_id);
          const picture = await Picture.findById(req.params.picture_id);
          res.json(picture);
     } catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
     }
});

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

          try {
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
          } catch (err) {
               console.error(err.message);
               res.status(500).send('Server Error');
          }
     }
);

// @route   DELETE api/pictures/:picture_id
// @desc    Delete a picture
// @access  Public
router.delete('/:picture_id', (req, res) => {
     Picture.findById(req.params.id)
          .then((picture) =>
               picture.remove().then(() => res.json({ success: true }))
          )
          .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;

// @route   GET api/pictures
// @desc    Get all pictures from a certain user
// @access  Public
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
