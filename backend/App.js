const path = require("path");
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./router/routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use(express.static(path.join(__dirname, "./public")));

// API routes
app.use("/", mainRouter);

// Fallback to index.html for SPA
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public", "index.html"));
});

mongoose.connect(process.env.MONGO_KEY)
    .then(() => {
        console.log(`✅ Successfully connected to the database!`);
    })
    .catch((err) => {
        console.error(`❌ Failed to connect to the database:`, err);
    });


app.use("/", mainRouter);

////// Start server
const PORT = process.env.PORT || 2002;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
