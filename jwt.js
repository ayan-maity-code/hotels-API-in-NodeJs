const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtAuthMiddleware = (req,res,next) =>{

    //first check request header has authorization or not

    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({error: "Invalid Token"});
    //extract jwt from request header
    const token = req.headers.authorization.split(' ')[1];

    if(!token) return res.status(401).json({error: "Unauthorized"});

    try {
        //verify jwt token
       const decoded =  jwt.verify(token, process.env.JWT_SECRET); // return payload if verification successful

       // attach user info to request object
       req.user = decoded;
       next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Invalid Token"});        
    }
}

// function to generate jwt token

const generateToken = (userData) => {
    // generate jwt token using user data
    return jwt.sign({userData}, process.env.JWT_SECRET,{expiresIn:"1d"});
}



module.exports = {jwtAuthMiddleware, generateToken};