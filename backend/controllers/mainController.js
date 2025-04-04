const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const userDB = require("../schemas/userSchema");
const postDB = require("../schemas/postSchema");
const commentDB = require("../schemas/commentSchema");
const messageDB = require("../schemas/messageSchema");

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

        const myUser = await userDB.findOne({username});
        if (!myUser) return res.status(404).json({message: "User not found", error: true, success: false});

        const samePassword = await bcrypt.compare(password, myUser.password);//->pirmas passwordas is frontendo kur atsiunte useris, antras is DB

        if (!samePassword) return res.status(401).json({message: "incorrect credentials", error: true, success: false});

        let user = {
            username: myUser.username,
            _id: myUser._id,
            image: myUser.image,
            favorites: myUser.favorites
        };

        const token = jwt.sign(user, process.env.SECRET_KEY);//useris irasomas i token
        return res.status(200).json({message: "User logged in", error: false, success: true, token, user});
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
        return res.status(201).json({message: "Post created", error: false, success: true, post: newPost});
    },
    getAllPosts: async (req, res) => {
        //populate = automatiškai prijunk man kitą kolekciją, pagal šitą ID, ir duok reikiamus laukus.
        const posts = await postDB.find().populate('user', 'username image').populate('comments');
        if (!posts || posts.length === 0) {
            return res.status(404).json({message: "Posts not found", error: true, success: false});
        }
        // console.log(posts);
        return res.status(200).json({message: "All posts", error: false, success: true, posts});
    },
    toggleFavorite: async (req, res) => {
        const {postId} = req.body;
        const userId = req.user._id;

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
    },
    getUserByUsername: async (req, res) => {
        const myUsername = req.params.username;
        // console.log(myUsername)
        let user = await userDB.findOne({username: myUsername});

        if (!user) {
            return res.status(404).json({message: "User not found", error: true});
        }
        user = user.toObject();
        delete user.password;
        res.status(200).json({message: "User found", error: false, user});

    },
    updateProfile: async (req, res) => {
        const {username, image, password, confirmPassword} = req.body;
        const userId = req.user._id;

        const updateData = {};

        if (username) {
            const existingUser = await userDB.findOne({username, _id: {$ne: userId}});
            if (existingUser) {
                return res.status(400).json({message: "Username already taken", error: true});
            }
            updateData.username = username;
        }

        if (image) updateData.image = image;

        if (password || confirmPassword) {
            if (password !== confirmPassword) {
                return res.status(400).json({message: "Passwords do not match", error: true});
            }
            const salt = await bcrypt.genSalt(5);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await userDB.findByIdAndUpdate(userId, updateData, {new: true});

        if (!updatedUser) {
            return res.status(404).json({message: "User not found", error: true});
        }
        res.status(200).json({message: "User updated successfully", success: true, user: updatedUser});
    },
    getUserPosts: async (req, res) => {
        const myUsername = req.params.username;
        // console.log(myUsername);
        const user = await userDB.findOne({username: myUsername});
        // console.log(user);
        if (!user) {
            return res.status(404).json({message: "User not found", error: true});
        }
        const posts = await postDB.find({user: user._id}).populate("user");

        res.status(200).json({message: "User posts found", error: false, posts});
    },
    getPostById: async (req, res) => {
        const postId = req.params.postId;
        const post = await postDB.findById(postId).populate('user', 'username image');
        if (!post) {
            return res.status(404).json({message: "Post not found", error: true});
        }

        const comments = await commentDB.find({post: postId}).populate('commentAuthor', 'username');

        res.status(200).json({message: "Post found", error: false, singlePost: post, comments});
    },
    createComment: async (req, res) => {
        const {commentText, postId} = req.body;
        const commentAuthor = req.user._id;

        const post = await postDB.findById(postId);
        if (!post) {
            return res.status(404).json({message: "Post not found", error: true});
        }

        const newComment = new commentDB({
            text: commentText,
            commentAuthor,
            post: postId,
        });
        await newComment.save();

        post.comments.push(newComment._id);
        await post.save();

        res.send({message: "Comment created", error: false, success: true, comment: newComment});
    },
    getFavoritePosts: async (req, res) => {
        const {favorites} = req.body;

        const favoritePosts = await postDB.find({_id: {$in: favorites}}).populate('user', 'username image').populate('comments');

        res.status(200).json({message: "Favorite posts", error: false, success: true, favoritePosts});

    },
    createMessage: async (req, res) => {
        const {receiverUsername, text} = req.body;
        const senderId = req.user._id;

        if (!text || !receiverUsername) {
            return res.status(400).json({message: "Invalid message data", error: true});
        }

        const receiver = await userDB.findOne({username: receiverUsername});

        if (!receiver) {
            return res.status(404).json({message: "Receiver not found", error: true});
        }

        const newMessage = new messageDB({
            sender: senderId,
            receiver: receiver._id,
            text
        });

        await newMessage.save();

        res.status(201).json({message: "Message sent", error: false, success: true, newMessage});

    },
    getMessages: async (req, res) => {
        const userId = req.user._id;
        const messages = await messageDB
            .find({receiver: userId})
            .populate('sender', 'username image') // duoda info apie siuntėją
            .sort({time: -1}); // naujausios viršuje

        res.status(200).json({message: "Messages fetched", error: false, success: true, messages});
    },
    deleteMessage: async (req, res) => {
        const {messageId} = req.params;

        const message = await messageDB.findById(messageId);

        if (!message) {
            return res.status(404).json({message: "Message not found", error: true});
        }

        await messageDB.findByIdAndDelete(messageId);

        res.status(200).json({message: "Message deleted", error: false, success: true});
    }
}
