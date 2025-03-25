const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
        title: {
            type: String,
            required: true,
            maxlength: 100,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        time: {
            type: Date,
            default: Date.now,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        likes: {
            type: Number,
            default: 0
        }
    },
    {timestamps: true});

module.exports = mongoose.model("Post", postSchema);