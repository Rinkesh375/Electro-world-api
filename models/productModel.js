const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name:{type:String,required:true},
    offer_price:{type:Number,required:true},
    actual_price:{type:Number,required:true},
    key_features:{type:[String],required:true},
    category:{type:String,required:true},
    brand:{type:String,required:true},
    image:{type:String,required:true},
    url:{type:String,required:true},

},{
    versionKey:false
})

const Product = mongoose.model("product",ProductSchema);
module.exports = Product;