const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name : String, 
    age : Number,
    email :String,
    password : String,
    contact : Number
})

const UserModel = mongoose.model("user",userSchema)

module.exports = {UserModel}