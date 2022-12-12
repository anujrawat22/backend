const mongoose = require("mongoose")


const todoschema = mongoose.Schema({
    taskname : String,
   status :String,
   tag  :String
})


const TodoModel = mongoose.Schema("todo",todoschema)

module.exports = {TodoModel}