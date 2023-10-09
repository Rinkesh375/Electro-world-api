const mongoose = require("mongoose");
const blackListSchema = mongoose.Schema({
        token:{type:String,required:true}
})

module.exports = mongoose.model("blackList",blackListSchema)