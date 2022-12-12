const express = require("express")
const {connection} = require("./db")
const {UserModel} = require("./model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {todorouter} = require("./Routes/todo.route")
const {auth} = require("./middleware/authantication")
const cors = require("cors")
const app = express()


app.use(express.json())
app.use(cors({
    origin :"*"
}))
app.get("/",async(req,res)=>{
    const user = await UserModel.find()
    res.send(user)
    
    
    
    });


app.post("/signup",async(req,res)=>{
    const {name,age,email,password,contact} = req.body
    console.log(req.body)
   const userpresent = await UserModel.findOne({email})
   if(userpresent){
    res.send({"msg":"User already exists,try logging in"})
   }else{
    try{
        bcrypt.hash(password, 5,async function(err, hash) {
            // Store hash in your password DB.
            if(err){
                console.log("Something went wrong")
                console.log(err)
            }
            const user = await new UserModel({name,age,email,password:hash,contact})
            user.save()
            res.send({"msg":"Signup Sucessfull"})
        });
    }
    catch(err){
        console.log("Something went wrong")
        console.log(err)
    }
    
   }
})


app.post("/login",async(req,res)=>{
    const {email,password}  = req.body
  
    const user = await UserModel.find({email})
    console.log(user[0]._id)
    if(user.length>0){
        bcrypt.compare(password, user[0].password, function(err, result) {
            if(result){
                const token = jwt.sign({ userId : user[0]._id }, 'hola');
                res.send({"msg" : "Login sucessfull" ,"token" :token})
            }
        });
    }
})


app.use(auth)
app.use("/todo",todorouter)




app.listen(process.env.port,async()=>{
try{
    await connection
    console.log("Connected to DB")
}
catch(err){
    console.log("Connection to DB unsucessfull")
    console.log(err)
}
console.log(`Listening on port ${process.env.port}`)
})


