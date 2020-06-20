const db = require('../../models');
const Album = db.Album;
const Prompt = db.Prompt;
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route   GET api/prompts/album/:album_id
// @desc    Get all prompts from a single album
// @access  Public
router.get('/album/:album_id', async (req, res) => {
     try {
          const prompts = await Prompt.find({
               album: req.params.album_id,
          }).sort({
               dateUploaded: -1,
          });

          if (!prompts) {
               res.status(400).json({
                    msg: 'Cannot find this album',
               });
          }

          res.json(prompts);
     } catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
     }
});

// @route   GET api/prompts/:prompt_id
// @desc    Get a single prompt
// @access  Public
router.get('/:prompt_id', async (req, res) => {
     try {
          const prompt = await Prompt.findById(req.params.prompt_id);
          if (!prompt) {
               return res.status(404).json({ msg: 'Post not found' });
          }
          res.json(prompt);
     } catch (err) {
          console.error(err.message);
          if (err.kind === 'ObjectId') {
               return res.status(404).json({ msg: 'Post not found' });
          }
          res.status(500).send('Server error');
     }
});

// @route   POST api/prompts/:album_id
// @desc    Post a new prompt
// @access  Public
router.post(
     '/:album_id',
     [check('prompt', 'Please select a prompt').not().isEmpty()],
     [check('response', 'Please provide a response').not().isEmpty()],
     async (req, res) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          }

          try {
               const newPrompt = new Prompt({
                    prompt: req.body.prompt,
                    response: req.body.response,
                    album: req.params.album_id,
                    dateRecorded: req.body.dateRecorded,
                    uploadedBy: req.body.uploadedBy,
               });
               const prompt = await newPrompt.save();

               Album.findOneAndUpdate(
                    { _id: req.params.album_id },
                    { $push: { prompts: prompt } },
                    (error, success) => {
                         if (error) {
                              console.log(error);
                         } else {
                              console.log(success);
                              console.log(61);
                         }
                    }
               );
               res.json(prompt);
          } catch (err) {
               console.error(err.message);
               res.status(500).send('Server Error');
          }
     }
);

// @route   DELETE api/prompts/:prompt_id
// @desc    Delete a picture
// @access  Public
router.delete('/:prompt_id', auth, async (req, res) => {
     try {
          const prompt = await Prompt.findById(req.params.prompt_id);
          const album = prompt.album;
          const objAlbum = await Album.findById(album);
          const user = objAlbum.user;
          console.log(user, req.user.id);
          if (user.toString() !== req.user.id) {
               return res
                    .status(401)
                    .json({ msg: 'User not authorized to delete post' });
          }
          await Prompt.findByIdAndDelete(req.params.prompt_id);
          if (!prompt) {
               return res.status(404).json({ msg: 'Post not found' });
          }
          res.json({ msg: 'Post deleted' });
     } catch (err) {
          console.error(err.message);
          if (err.kind === 'ObjectId') {
               return res.status(404).json({ msg: 'Post not found' });
          }
          res.status(500).send('Server error');
     }
});
module.exports = router;
