const mongoose = require('mongoose');

//define  connection
const mongoURL = 'mongodb://localhost:27017/hotels'; // replace hotels with any name 

// const mongoURL = 'mongodb+srv://ayan309:ayan1234@cluster0.dfzrz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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