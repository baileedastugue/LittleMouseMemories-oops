var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PromptSchema = new Schema({
     prompt: {
          type: String,
          required: true,
     },
     response: {
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
          required: true,
          default: Date.now,
     },
     dateRecorded: {
          type: Date,
          required: true,
          default: Date.now,
     },
     uploadedBy: {
          type: String,
          required: true,
     },
});

module.exports = Prompt = mongoose.model('prompt', PromptSchema);
