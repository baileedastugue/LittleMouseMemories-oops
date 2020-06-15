const db = require('../../models');
const Album = db.Album;
const User = db.User;
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// Dashboard

// @route   GET api/albums
// @desc    Get current user's albums
// @access  Private
router.get('/', auth, async (req, res) => {
     try {
          console.log(req.user.id);
          const album = await Album.find({
               user: req.user.id,
          }).populate('User', ['firstName']);

          if (!album) {
               res.status(400).json({
                    msg: 'There are no albums for this user',
               });
          }

          res.json(album);
     } catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
     }
});

// @route   POST api/albums
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
          console.log(albumFields);

          try {
               let album = Album.find({ user: req.user.id });
               // create album
               album = new Album(albumFields);
               await album.save();
               res.json(album);
          } catch (err) {
               console.error(err.message);
               res.status(500).send('Server Error');
          }
     }
);

// @route   DELETE api/albums/:id
// @desc    Delete an album
// @access  Public
router.delete('/:id', (req, res) => {
     Album.findById(req.params.id)
          .then((album) =>
               album.remove().then(() => res.json({ success: true }))
          )
          .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;

// // router.post("/dashboard/album", ensureAuthenticated, (req, res) => {

// //         // if the user actually enters a title,
// //         // this checks to see if that album name already exists
// //         Album.findOne({ title: title })
// //             .then(album => {
// //                 if(album) {
// //                     // if there is an album with that name
// //                     // push an error
// //                     errors.push({
// //                         msg: "Please enter a unique album title"
// //                     })
// //                     res.render("dashboard", {
// //                         errors,
// //                         user: req.user
// //                     })
// //                 } else {
// //                     // if the album title is unique
// //                     Album.create({ title: title })
// //                         // that album is created
// //                         .then(album => {
// //                             // if the album is successfully created,
// //                             // update the user's album array so they are associated
// //                             return User.findOneAndUpdate({
// //                                 _id: req.user._id
// //                             }, { $push: { album: album._id} },
// //                             { new: true });
// //                         })
// //                         .then(album => {
// //                             // console.log("line 69");
// //                             // if the album is successfully associated,
// //                             // send a success message
// //                             req.flash(
// //                                 "success_msg",
// //                                 "Album created"
// //                             );
// //                             res.redirect("/dashboard");

// //                         })
// //                         .catch(err => console.log(err));
// //                 }
// //             })
// //     }
// // })

// // router.get("/albums/:id/pictures", (req, res) => {
// //     res.render("albums", {
// //         album: req.params.id
// //     });
// //     console.log(req.params.id);

// // })

// // router.post("/albums/:id/pictures", (req, res) => {
// //     res.send("Aw yeah who wants a picture");
// //     const image = req.body.image;
// //     console.log(req.params.id);
// //     let errors = [];
// //     if (!image) {
// //         // send an error if the user does not add a title
// //         errors.push({
// //             msg: "Please upload a picture"
// //         });
// //     }
// //     if (errors.length > 0) {
// //         // if there is an error, send it to the page
// //         res.render("albums", {
// //             errors
// //         })
// //     } else {
// //         console.log("no errors");
// //         Pictures.create({ image: image })
// //                         // that album is created
// //                         .then(picture => {
// //                             // return Album.findOneAndUpdate({
// //                             //     _id: req.body.id
// //                             // }, { $push: { pictures: picture } },
// //                             // { new: true });
// //                             console.log(picture);
// //                         })
// //                         .then(picture => {
// //                             console.log(picture);
// //                         })
// //                         .catch(err => console.log(err));
// //     }
// // })

// // router.get("/albums/:id", (req, res) => {
// //     // console.log(req.params.id);
// //     Album.findOne({
// //         title: req.params.id
// //     })
// //         .then(album => {
// //             // console.log(album);
// //             res.redirect("/albums/"+album._id+"/pictures");
// //         })
// //         .catch(err => console.log(err));
// //     // User.findOne({
// //     //     _id: req.user._id
// //     // })
// //     //     .populate("album")
// //     //     .then(user => {
// //     //         // console.log("populated album successful");
// //     //         console.log("hello from line 102");
// //     //         console.log(user);
// //     //         res.send("aw yeah")
// //     //     })
// //     //     .catch(err => console.log(err));
// // })
