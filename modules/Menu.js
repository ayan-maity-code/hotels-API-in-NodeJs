const { values } = require("lodash");
const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:["spicy","sweet","sour"],
        required:true
    },
    is_Drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
        default:[],
        required:true
    },
    num_sales:{
        type:Number,
        required:true,
        default:0
    }
})

const menuItem = mongoose.model("menuItems",menuSchema);
module.exports = menuItem;