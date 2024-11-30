const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const Person = require("./modules/Person");



//Authentication
passport.use(new localStrategy(async (username,password,done)=>{
    try {
    //   console.log('Received Credentials:', username,password);

      const user = await Person.findOne({username:username});
      if(!user){
        return done(null,false,{message:"User not found"});
      }

      const isPasswordmatch = await user.comparePassword(password);
      if(isPasswordmatch){
       return done(null,user);
      }else{
        return done(null,false,{message:"Incorrect Password"});
      }
      
    } catch (error) {
      return done(error);
    }
}))

module.exports = passport;