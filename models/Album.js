var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AlbumsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    picture: [
        {
            type: Schema.Types.ObjectId,
            ref: "Pictures"
        }
    ],
    prompt: [
        {
            type: Schema.Types.ObjectId,
            ref: "Prompt"
        }
    ]
});

var Album = mongoose.model("Album", AlbumsSchema);

module.exports = Album;