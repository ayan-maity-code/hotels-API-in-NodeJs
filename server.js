// var fs = require('fs');
// var os = require('os');

// var user = os.userInfo();
// console.log(user);
// console.log(user.username);
// // var callBack = () =>{
// //     console.log('file created');

// // }
// // fs.appendFile('greeting.txt', 'Hello'+user.username+'\n',callBack)

// fs.appendFile('greeting.txt', 'Hello'+user.username+'\n',() => {
//     console.log('file created');
//     }
// )

// var notes = require('./notes');

// var result = notes.addNumber(2,3);

// console.log(result);

// const _ = require('lodash')

// const arr = [1,2,3,'2','4','Ayan','Ayan',3,3,7,7];

// let result = _.uniq(arr);
// console.log(result);

// console.log(_.toLower('AYan'));

const express = require("express");
const app = express();
const Person = require("./modules/Person");
// import db.js
const db = require("./db");

require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // convert the json data into js object data nd store into req.body
const Menu = require("./modules/Menu");
const passport = require("./auth");

// Middleware
const logRequest =  (req,res,next) => {
  console.log(`[${new Date().toLocaleString()}] Request made to ${req.originalUrl}`);
  next(); // move to next phase
  
}
app.use(logRequest);


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false});

app.get("/",function (req, res) {
  res.send("Welcome to Hotel! How can i help you?");
});

// app.post("/person",(req,res) =>{
//     const data = req.body; // assuming that body parser store the data at req.body
//     const newPerson = new Person(data);

//     // newPerson.name = data.name;
//     // newPerson.age = data.age;
//     // newPerson.mobile = data.mobile;
//     // newPerson.work = data.work;
//     // newPerson.email = data.email;
//     // newPerson.address = data.address;
//     // newPerson.salary = data.salary;

//     // save person data to the database

//     // newPerson.save((error,savedPerson) =>{
//     //     if(error){
//     //       console.log("Error in saving data " , error);
//     //       res.status(500).json({error: " Internal Server Error"});

//     //     }else{
//     //       res.status(200).json(savedPerson);
//     //     }
//     // })   // now this method save no longer return the callback or not used bcz of reducing the code readability

// })


const personRoutes = require("./routes/personRoutes");
app.use("/person",personRoutes);

const menuRoutes = require("./routes/menuRoutes");
app.use("/menu",menuRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT);
