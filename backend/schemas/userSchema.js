const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 4,
            maxlength: 20,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 4,
            maxlength: 200,
        },
        imageUrl: {
            type: String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlXTd6FF5TBJbnQMU3SrwA3JAUMd3Ovu1lvw&s",
        },
        favorites: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }],
    },
    {timestamps: true});

module.exports = mongoose.model("User", userSchema);