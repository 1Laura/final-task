const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        minlength: 4,
        maxlength: 20,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minlength: 4,
        maxlength: 20,
    },
});

const user = mongoose.model("users", userSchema);
module.exports = user;