const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
} = require("../controllers/mainController");

const {validateRegister, validateLogin} = require("../middleware/validators");

const userAuth = require("../middleware/userAuth");

// register
router.post("/register", validateRegister, registerUser);

// login
router.post("/login", validateLogin, loginUser);


module.exports = router;