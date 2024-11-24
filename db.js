const mongoose = require('mongoose');
require("dotenv").config();
//define  connection

// const mongoURL = 'mongodb://localhost:27017/hotels'; // replace hotels with any name 

const mongoURL = process.env.MONGODB_URL;

// established connection
mongoose.connect(mongoURL);

// get the default connection
const db = mongoose.connection;

// define event listner for database connection
db.on('connected', ()=>{
    console.log("Connected to MongoDB Server");
    
})

db.on('error', (err) => {
    console.log("MongoDb connection error" + err);
    
})

db.on('disconnected', () => {
    console.log("MongoDb connection disconnected");
    
})

// export to server.js file