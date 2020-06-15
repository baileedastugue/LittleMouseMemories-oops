const db = require('../../models');
const Pictures = db.Pictures;
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// @route   GET api/pictures
// @desc    Get all pictures
// @access  Public
router.get('/', (req, res) => {
    Pictures.find() 
        .sort({ date: -1 })
        .then(pictures => res.json(pictures))
    
    // User.findOne({
    //     _id: req.user._id
    // })
    //     .populate("album")
    //     .then(user => {
    //         // console.log("populated album successful");
    //         // console.log(user.album[0]);
    //         res.render("dashboard", {
    //             user: user
    //         });
    //     })
    //     .catch(err => console.log(err));
})

// @route   POST api/pictures
// @desc    Post a new picture
// @access  Public
router.post('/', (req, res) => {
    const newPicture = new Pictures({
        image: req.body.image
    });

    newPicture.save()
        .then(picture => res.json(picture));
})

// @route   DELETE api/albums/:id
// @desc    Delete an album
// @access  Public
router.delete('/:id', (req, res) => {
    Pictures.findById(req.params.id) 
        .then(picture => picture.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});


module.exports = router;