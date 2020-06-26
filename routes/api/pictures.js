const db = require('../../models');
const Album = db.Album;
const User = db.User;
const Picture = db.Pictures;
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @route   GET api/pictures/album/:album_id
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
router.get('/:picture_id', async (req, res) => {
     try {
          console.log(req.params.picture_id);
          const picture = await Picture.findById(req.params.picture_id);
          if (!picture) {
               return res.status(404).json({ msg: 'Image not found' });
          }
          res.json(picture);
     } catch (err) {
          console.error(err.message);
          if (err.kind === 'ObjectId') {
               return res.status(404).json({ msg: 'Image not found' });
          }
          res.status(500).send('Server error');
     }
});

// @route   POST api/pictures/:album_id
// @desc    Post a new picture
// @access  Public
router.post(
     '/:album_id',
     [check('caption', 'Please include a caption').not().isEmpty()],
     [
          check('dateRecorded', 'Please include the date this photo was taken')
               .not()
               .isEmpty(),
     ],
     [check('uploadedBy', 'Please include your name').not().isEmpty()],
     async (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          }
          if (req.files === null) {
               return res.status(400).json({ msg: 'No file uploaded' });
          }
          const image = req.files.image;
          try {
               cloudinary.uploader.upload(
                    image.tempFilePath,
                    async (err, result) => {
                         const uploadedPicture = result.url;
                         const newPicture = await new Picture({
                              image: uploadedPicture,
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
                                        // console.log(success);
                                        // console.log(61);
                                   }
                              }
                         );
                         res.json(picture);
                    }
               );
          } catch (err) {
               console.error(err.message);
               res.status(500).send('Server Error');
          }
     }
);

// @route   DELETE api/pictures/:picture_id
// @desc    Delete a picture
// @access  Public
router.delete('/:picture_id', auth, async (req, res) => {
     try {
          const picture = await Picture.findById(req.params.picture_id);
          const album = picture.album;
          const objAlbum = await Album.findById(album);
          const user = objAlbum.user;
          console.log(user, req.user.id);
          if (user.toString() !== req.user.id) {
               return res
                    .status(401)
                    .json({ msg: 'User not authorized to delete post' });
          }
          await Picture.findByIdAndDelete(req.params.picture_id);

          await Album.update(
               {},
               { $pull: { pictures: { $in: [req.params.picture_id] } } },
               { multi: true }
          );
          // await User.update(
          //      {},
          //      { $pull: { pictures: { $in: [req.params.picture_id] } } },
          //      { multi: true }
          // );
          if (!picture) {
               return res.status(404).json({ msg: 'Image not found' });
          }

          res.json({ msg: 'Picture deleted' });
     } catch (err) {
          console.error(err.message);
          if (err.kind === 'ObjectId') {
               return res.status(404).json({ msg: 'Image not found' });
          }
          res.status(500).send('Server error');
     }
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
