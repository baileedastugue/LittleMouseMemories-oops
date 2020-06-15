var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AlbumsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    // password: {
    //     type: String
    // },
    date: {
        type: Date,
        default: Date.now
    },
    pictures: [
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


module.exports = Album = mongoose.model("Album", AlbumsSchema);