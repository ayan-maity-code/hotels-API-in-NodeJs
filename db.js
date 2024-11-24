const mongoose = require('mongoose');

//define  connection
const mongoURL = 'mongodb://localhost:27017/hotels'; // replace hotels with any name 

// established connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true, // resquired parameter
    useUnifiedTopology:true // required parameter

})

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