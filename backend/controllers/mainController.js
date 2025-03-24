const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const userDB = require("../schemas/userSchema");


module.exports = {
    registerUser: async (req, res) => {
        const {username, password} = req.body;

        const userExists = await userDB.findOne({username});
        if (userExists) return res.status(400).json({message: "User exists", error: true, success: false});

        const salt = await bcrypt.genSalt(5);
        const hash = await bcrypt.hash(password, salt);

        const user = {
            username,
            password: hash
        };
        const newUser = new userDB(user);
        await newUser.save();
        res.status(201).json({message: "register", error: false, success: true, newUser});

    },
    loginUser: async (req, res) => {
        const {username, password} = req.body;
        try {
            const myUser = await userDB.findOne({username});
            if (!myUser) return res.status(404).json({message: "User not found", error: true, success: false});

            const samePassword = await bcrypt.compare(password, myUser.password);//->pirmas passwordas is frontendo kur atsiunte useris, antras is DB

            if (!samePassword) return res.status(401).json({message: "incorrect credentials", error: true, success: false});

            let user = {
                username: myUser.username,
                _id: myUser._id,
                image: myUser.image,
            };

            const token = jwt.sign(user, process.env.SECRET_KEY);//useris irasomas i token

            return res.status(200).json({message: "User logged in", error: false, success: true, token, user});
        } catch (error) {
            res.status(500).json({message: "Server error", error: true, success: false});
        }
    },
}