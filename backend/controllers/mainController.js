const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const userDB = require("../schemas/userSchema");
const postDB = require("../schemas/postSchema");

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
        res.status(201).json({message: "register", error: false, success: true});

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
    createPost: async (req, res) => {
        const {title, image, description} = req.body;
        const newPost = new postDB({
            image,
            title,
            description,
            user: req.user._id,//is JWT tokeno
        });

        await newPost.save();

        return res.status(201).json({message: "Post created", error: false, success: true, newPost});

    },
    getAllPosts: async (req, res) => {
        //populate = automatiškai prijunk man kitą kolekciją, pagal šitą ID, ir duok reikiamus laukus.
        const posts = await postDB.find().populate("user", "username image");

        if (!posts || posts.length === 0) {
            return res.status(404).json({message: "Posts not found", error: true, success: false});
        }

        console.log(posts);
        return res.status(200).json({message: "All posts", error: false, success: true, posts});
    },
    toggleFavorite: async (req, res) => {
        const userId = req.user._id; // iš JWT middleware
        const postId = req.body.postId;


        const user = await userDB.findById(userId);
        const post = await postDB.findById(postId);

        if (!user || !post) {
            return res.status(404).json({message: "User or Post not found", error: true});
        }

        const alreadyFavorited = user.favorites.includes(postId);

        if (alreadyFavorited) {
            user.favorites = user.favorites.filter(fav => fav.toString() !== postId);
            post.likes = Math.max(0, post.likes - 1);
        } else {
            user.favorites.push(postId);
            post.likes += 1;
        }

        await user.save();
        await post.save();

        res.status(200).json({
            message: alreadyFavorited ? "Removed from favorites" : "Added to favorites",
            favorites: user.favorites,
            likes: post.likes
        });
    }
}