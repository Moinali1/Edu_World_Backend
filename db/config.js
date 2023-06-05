require("dotenv").config();
const mongoose= require('mongoose');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// socketTimeoutMS: 80000,
// connectTimeoutMS: 5000,

// mongoose.connect('mongodb://localhost:27017/My_Platform', {useNewUrlParser: true, useUnifiedTopology: true});

// mongoose.connect(mongoURI, option);

// for verifying that the connection is done or not
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("!!connection is successfully")
});