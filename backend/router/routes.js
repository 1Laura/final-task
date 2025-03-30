const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    createPost,
    getAllPosts,
    toggleFavorite,
    getUserByUsername,
    updateProfile,
    getUserPosts,
} = require("../controllers/mainController");

const {validateRegister, validateLogin} = require("../middleware/validators");

const userAuth = require("../middleware/userAuth");

// register
router.post("/register", validateRegister, registerUser);

// login
router.post("/login", validateLogin, loginUser);

// create post
router.post("/createpost", userAuth, createPost);

// get all posts
router.get("/allposts", userAuth, getAllPosts);

// export router
router.post('/togglefavorite', userAuth, toggleFavorite);

// get user by username
router.get("/user/:username", userAuth, getUserByUsername);

// update profile
router.post("/updateprofile", userAuth, updateProfile);

// toggle favorite
router.post('/togglefavorite', userAuth, toggleFavorite);

//get posts by user
router.get("/user/:username/posts", userAuth, getUserPosts);

module.exports = router;