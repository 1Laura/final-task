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
    getPostById,
    createComment,
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

// toggle favorite
router.post('/togglefavorite', userAuth, toggleFavorite);

// get user by username
router.get("/user/:username", userAuth, getUserByUsername);

// update profile
router.post("/updateprofile", userAuth, updateProfile);

//get posts by user
router.get("/user/:username/posts", userAuth, getUserPosts);

// get post by id
router.get("/post/:postId", userAuth, getPostById);

// create comment
router.post("/createcomment", userAuth, createComment);


module.exports = router;