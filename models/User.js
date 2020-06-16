const mongoose = require('mongoose');
// const LocalStrategy = require("passport-local");
// var passportLocalMongoose = require('passport-local-mongoose');

// reference to the Schema constructtor
const Schema = mongoose.Schema;
const UserSchema = new Schema({
     password: {
          type: String,
          trim: true,
          required: 'Password is Required',
          validate: [
               function (input) {
                    return input.length >= 6;
               },
               'Password should be longer.',
          ],
     },
     email: {
          type: String,
          required: true,
          unique: true,
          match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
     },
     firstName: {
          type: String,
          required: true,
     },
     lastName: {
          type: String,
          required: true,
     },
     registeredDate: {
          type: Date,
          default: Date.now,
     },
     // album = object that stores an album ID - this links the ObjectID to the album model
     // allows us to populate the user's profile with associated albums
     album: [
          {
               type: Schema.Types.ObjectId,
               ref: 'album',
          },
     ],
     avatar: {
          type: String,
     },
});

// create model from the defined schema, using mongoose's model method
// UserSchema.plugin(passportLocalMongoose);

module.exports = User = mongoose.model('user', UserSchema);
