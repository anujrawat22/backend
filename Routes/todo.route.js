
const express = require("express")
const {TodoModel} = require("../model/todo.model")
const todorouter = express.Router()

todorouter.use(express.json())


todorouter.get("/todos/:todoID",async (req,res)=>{
let userId = req.body
let status = req.query.status
let tag= req.query.tag
let todoid = req.params.todoID
if(status==="pending"){
    const notes = await TodoModel.find({userId,status : "pending"})
    res.send(notes)
}else if(tag==="personal"){
    const notes = await TodoModel.find({userId,status:"done",tag:"personal"})
    res.send(notes)
}else if(todoID){
  const notes = await TodoModel.find({_id:todoid})
  res.send(notes)
}else{
    try{
        const notes = await TodoModel.find({userId})
        res.send(notes)
    }
    catch(err){
    console.log("something went wrong")
    console.log(err)
    }
}



})

todorouter.post("/create",async(req,res)=>{
    
    try{
        const note = await new TodoModel(req.body)
        note.save()
        res.send({"msg":"Note created sucessfully"})
    }
    catch(err){
      console.log({"msg":"something went wrong"})
      console.log(err)
    }
})

todorouter.patch("/update/:updateId",async (req,res)=>{
    const Id = req.params.updateId
    try{
        await TodoModel.findbyIdandupdate({_id : Id},req.body)
        res.send(`todo with ${Id} upadted sucessfully`)
    }
    catch(err){
        console.log(err)
        console.log({"msg":"something went wrong"})
    }
})


todorouter.delete("/delete/:deleteId",async(req,res)=>{
      const id = req.query.params
    try{
     await TodoModel.findbyIdanddelete({_id:id})
     res.send("Todo deleted")

    }
    catch(err){
        console.log({"msg":"something went wrong"})
        console.log(err)
    }
})

module.exports = {todorouter}