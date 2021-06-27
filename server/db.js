const mongoose = require('mongoose')
const schemas=require('./schemas')

url="mongodb+srv://new_user1:5LZMx3NSsooYdD19@cluster0.zu8ll.mongodb.net/web_project?retryWrites=true&w=majority"
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
console.log("connected!")


const userSchema = new mongoose.Schema(schemas.user)
const User = mongoose.model('users', userSchema)

 function findUserAndPassword(name,pass,response) {
     User.findOne({ username:`${name}`,password:`${pass}`},function(err,user)
    {
        if (err)
        {
            response.status(404).end()
            console.log("DB Error")
        }   
        else
        {
            //sends null if user is not premitted
            response.json(user);
            console.log("user can go in")
        }
    })
    
  }
  module.exports={findUserAndPassword}