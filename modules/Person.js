const { uniq } = require("lodash");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//create or define person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "manager", "waiter"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  }
});


personSchema.pre("save",async function(next){
  const person = this;
  if(!person.isModified("password")) return next();
    try {
      //generating salt

      const salt = await bcrypt.genSalt(10);

      // hashing password
      const hashPassword = await bcrypt.hash(person.password,salt);
      // override the plain text with hashed password
      person.password = hashPassword;
      next();
    } catch (error) {
      return next(error);
    }
})


personSchema.methods.comparePassword = async function(candidatePassword){
    try {
      const isPasswordMatch = await bcrypt.compare(candidatePassword, this.password);
      return isPasswordMatch; 
      // salt + password = hash = stored hash if match then return true;
    } catch (error) {
      throw error;
    }
}
//create person model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;