const axios = require("axios");
const db = require("../models");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("<p>Hi Bailee</p>");
})

    // router.get("/", (req, res) => {
    //     db.Article.find({}).sort({ time: -1}).lean()
    //         .then(function(dbArticle) {
    //             // console.log(dbArticle);
    //             let hbsObject = {
    //                 articles: dbArticle
    //             };
    //             // console.log(hbsObject);
    //             res.render("index", hbsObject);
    //         })
    // })

    // router.get("/saved", (req, res) => {
    //     db.Article.find({
    //         saved: true
    //     }).lean()
    //         .then(function(dbArticle) {
    //             // console.log(dbArticle);
    //             let hbsObject = {
    //                 articles: dbArticle
    //             };
    //             res.render("saved", hbsObject);
    //         })
        
    // })

    // router.get("/clear", (req, res) => {
    //     db.Article.find({}).deleteMany({}).then(dbArticle => {
    //     })
    //     .then(() => {
    //         return res.redirect("/");
    //     })
    //     .catch((err) => {
    //         res.json(err);
    //     })
    // })
    
    // router.get("/articles", (req, res) => {
    //     db.Article.find().sort({ time: -1})
    //         .populate("Article")
    //         .then(dbArticle => {
    //             res.json(dbArticle);
    //             // console.log(dbArticle);
    //         })
    //         .catch((err) => {
    //             res.json(err);
    //         })
    // })
    
    // // grabs article by its id
    // router.get("/articles/:id", (req, res) => {
    //     db.Article.find({
    //         _id: req.params.id
    //     })
    //         // populates all the comments associated with it
    //         .populate("comment")
    //         .then(function(dbArticle) {
    //             res.json(dbArticle);
    //         })
    //         .catch(err => {
    //             res.json(err);
    //         })
    // })
    
    // // saves and updates an article's assoc comment
    // router.post("/articles/:id", function(req, res) {
    //     // Create a new Note in the db
    //     db.Comment.create(req.body)
    //       .then(function(dbComments) {
    //         return db.Article.findOneAndUpdate({
    //             _id: req.params.id
    //         }, { $push: { comment: dbComments._id } }, { new: true });
    //       })
    //       .then(function(dbArticle) {
    //         // If the User was updated successfully, send it back to the client
    //         res.json(dbArticle);
    //       })
    //       .catch(function(err) {
    //         // If an error occurs, send it back to the client
    //         res.json(err);
    //       });
    //   });
    
    // // returns all comments
    // router.get("/comments", function (req, res) {
    //     db.Comment.find({})
    //     .then(function(dbComments) {
    //         res.json(dbComments);
    //     })
    //     .catch(function(err) {
    //         res.json(err);
    //     })
    // })

    // router.put("/saved/:id", (req, res) => {
    //     var condition = "id = " + req.params.id;
    //     db.Article.findOneAndUpdate({
    //         _id: req.params.id
    //     }, {saved: true})
    //         .then(dbArticle => {
    //             res.json(dbArticle);
    //         })
    //         .catch(err => {
    //             res.json(err);
    //         })
    // })

    // router.put("/unsaved/:id", (req, res) => {
    //     var condition = "id = " + req.params.id;
    //     db.Article.findOneAndUpdate({
    //         _id: req.params.id
    //     }, {saved: false})
    //         .then(dbArticle => {
    //             res.json(dbArticle);
    //         })
    //         .catch(err => {
    //             res.json(err);
    //         })
    // })

    module.exports = router;
