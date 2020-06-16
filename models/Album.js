var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumsSchema = new Schema({
     user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
     },
     title: {
          type: String,
          required: true,
     },
     // password: {
     //     type: String
     // },
     date: {
          type: Date,
          default: Date.now,
     },
     pictures: [
          {
               type: Schema.Types.ObjectId,
               ref: 'Picture',
          },
     ],
     prompt: [
          {
               type: Schema.Types.ObjectId,
               ref: 'Prompt',
          },
     ],
});

module.exports = Album = mongoose.model('album', AlbumsSchema);
