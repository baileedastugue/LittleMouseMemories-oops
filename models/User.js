var mongoose = require("mongoose");

// reference to the Schema constructtor
var Schema = mongoose.Schema;
var UserSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: "Password is Required",
        validate: [
          function(input) {
            return input.length >= 6;
          },
          "Password should be longer."
        ]
    },
    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateJoined: {
        type: Date,
        default: Date.now
    },
    // album = object that stores an album ID - this links the ObjectID to the album model
    // allows us to populate the user's profile with associated albums
    album: [
        {
            type: Schema.Types.ObjectId,
            ref: "Album"
        }
    ]
});

// create model from the defined schema, using mongoose's model method
var User =  mongoose.model("User", UserSchema);

module.exports = User;