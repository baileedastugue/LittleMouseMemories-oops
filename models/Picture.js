var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PicturesSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    dateUploaded: {
        type: Date,
        required: true
    },
    dateRecorded: {
        type: Date,
    },
    caption: {
        type: String
    },
    uploadedBy: {
        type: String
    }
});

var Pictures = mongoose.model("Pictures", PicturesSchema);

module.exports = Pictures;