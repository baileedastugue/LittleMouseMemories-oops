const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
     image: {
          type: String,
          required: true,
     },
     user: {
          type: Schema.Types.ObjectId,
          ref: 'user',
     },
     album: {
          type: Schema.Types.ObjectId,
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

module.exports = Picture = mongoose.model('picture', PictureSchema);
