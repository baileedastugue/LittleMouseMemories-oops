const axios = require("axios");
const db = require("../models");
const express = require("express");
const path = require("path");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const User = db.User;
const Album = db.Album;
const Pictures = db.Pictures;

// Landing page
router.get("/", (req, res) => {
    res.render("welcome");
})

// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) => {
    // console.log(req.user);
    
    User.findOne({
        _id: req.user._id
    })
        .populate("album")
        .then(user => {
            // console.log("populated album successful");
            // console.log(user.album[0]);
            res.render("dashboard", {
                user: user
            });
        })
        .catch(err => console.log(err));
})

router.post("/dashboard/album", ensureAuthenticated, (req, res) => {
    // console.log(req.user);
    // console.log("create album");
    // console.log(req.body);
    const title = req.body.title;
    let errors = [];
    if (!title) {
        // send an error if the user does not add a title
        errors.push({
            msg: "Please enter a title for your album"
        });
    }
    if (errors.length > 0) {
        // if there is an error, send it to the page
        res.render("dashboard", {
            errors, 
            user: req.user 
        })
    } else {
        // if the user actually enters a title,
        // this checks to see if that album name already exists
        Album.findOne({ title: title })
            .then(album => {
                if(album) {
                    // if there is an album with that name
                    // push an error
                    errors.push({
                        msg: "Please enter a unique album title"
                    })
                    res.render("dashboard", {
                        errors,
                        user: req.user
                    })
                } else {
                    // if the album title is unique
                    Album.create({ title: title })
                        // that album is created
                        .then(album => {
                            // if the album is successfully created,
                            // update the user's album array so they are associated
                            return User.findOneAndUpdate({
                                _id: req.user._id
                            }, { $push: { album: album._id} }, 
                            { new: true });
                        })
                        .then(album => {
                            // console.log("line 69");
                            // if the album is successfully associated,
                            // send a success message
                            req.flash(
                                "success_msg",
                                "Album created"
                            );
                            res.redirect("/dashboard");
                            
                        }) 
                        .catch(err => console.log(err));
                }
            })
    }
})

router.get("/albums/:id/pictures", (req, res) => {
    res.render("albums", {
        album: req.params.id
    });
    console.log(req.params.id);
    
})

router.post("/albums/:id/pictures", (req, res) => {
    res.send("Aw yeah who wants a picture");
    const image = req.body.image;
    console.log(req.params.id);
    let errors = [];
    if (!image) {
        // send an error if the user does not add a title
        errors.push({
            msg: "Please upload a picture"
        });
    }
    if (errors.length > 0) {
        // if there is an error, send it to the page
        res.render("albums", {
            errors
        })
    } else {
        console.log("no errors");
        Pictures.create({ image: image })
                        // that album is created
                        .then(picture => {
                            // return Album.findOneAndUpdate({
                            //     _id: req.body.id
                            // }, { $push: { pictures: picture } }, 
                            // { new: true });
                            console.log(picture);
                        })
                        .then(picture => {
                            console.log(picture);
                        })
                        .catch(err => console.log(err));
    }
})

router.get("/albums/:id", (req, res) => {
    // console.log(req.params.id);
    Album.findOne({
        title: req.params.id
    })
        .then(album => {
            // console.log(album);
            res.redirect("/albums/"+album._id+"/pictures");
        })
        .catch(err => console.log(err));
    // User.findOne({
    //     _id: req.user._id
    // })
    //     .populate("album")
    //     .then(user => {
    //         // console.log("populated album successful");
    //         console.log("hello from line 102");
    //         console.log(user);
    //         res.send("aw yeah")
    //     })
    //     .catch(err => console.log(err));
})

module.exports = router;