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
        required: true
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
        type: Date
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