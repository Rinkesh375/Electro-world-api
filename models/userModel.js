const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    orderHistory:{type:[Object],required:true},
    addToCart:{type:[Object],required:true}
},{
    versionKey:false
})

const User = mongoose.model("user",UserSchema);
module.exports = User;
