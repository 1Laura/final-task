const express = require("express");
const app = express();
app.use(express.json())
require('dotenv').config();
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./router/routes");

mongoose.connect(process.env.MONGO_KEY)
    .then(() => {
        console.log(`✅ Successfully connected to the database!`);
    })
    .catch((err) => {
        console.error(`❌ Failed to connect to the database:`, err);
    });


app.use(cors());

app.use("/", mainRouter);

////// Start server
const PORT = process.env.PORT || 2002;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
