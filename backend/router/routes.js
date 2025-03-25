const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    createPost,
    getAllPosts,
    toggleFavorite
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
router.post('/toggle-favorite', userAuth, toggleFavorite);

module.exports = router;