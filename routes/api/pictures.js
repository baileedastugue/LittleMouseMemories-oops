const db = require('../../models');
const Picture = db.Picture;
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// @route   GET api/pictures
// @desc    Get all pictures
// @access  Private
router.get('/', auth, async (req, res) => {
     try {
          console.log(req.user.id);
          const picture = await Picture.find({
               user: req.user.id,
          });

          if (!picture) {
               res.status(400).json({
                    msg: 'There are no pictures in this album',
               });
          }
     } catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
     }
});

// @route   POST api/pictures
// @desc    Post a new picture
// @access  Public
router.post('/', (req, res) => {
     const newPicture = new Pictures({
          image: req.body.image,
     });

     newPicture.save().then((picture) => res.json(picture));
});

// @route   DELETE api/albums/:id
// @desc    Delete an album
// @access  Public
router.delete('/:id', (req, res) => {
     Pictures.findById(req.params.id)
          .then((picture) =>
               picture.remove().then(() => res.json({ success: true }))
          )
          .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
