const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());

//database URI
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {}
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const userRouter = require('./routes/users');

app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
