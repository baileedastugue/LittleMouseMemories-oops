var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PicturesSchema = new Schema({
     image: {
          type: String,
          required: true,
     },
     album: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'album',
     },
     dateUploaded: {
          type: Date,
          default: Date.now,
     },
     dateRecorded: {
          type: Date,
     },
     caption: {
          type: String,
     },
     uploadedBy: {
          type: String,
     },
});

module.exports = Picture = mongoose.model('picture', PicturesSchema);
