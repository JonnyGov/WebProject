const Mutex = require('async-mutex').Mutex;
const mongoose = require('mongoose')
const schemas=require('./schemas')

url="mongodb+srv://new_user1:5LZMx3NSsooYdD19@cluster0.zu8ll.mongodb.net/web_project?retryWrites=true&w=majority"
url="mongodb+srv://yona:1234@cluster0.gzmkq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

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
            response.status(200)
            response.json(user);
            console.log("DB sign in respons sent")
        }
    })
    
  }


  function addUser(username,password,list,response)
  {
    User.findOne({ username:`${username}`,password:`${password}`},function(err,user)
    {
      
        if (err)
        {
            response.status(404).end()
            console.log("DB Error")
        }   
        else if( user!=null)
        {
            response.status(200)
            response.json(null);
            console.log("user exists in Db")

        }
        else
        {
            let jsonlist= JSON.stringify(list)
            User({
                username,
                password,lists:jsonlist
              }).save()
              response.status(200)
              response.send("UserRegisted")
        }
    })
    
  }

  let clientLock = new Mutex()
    async function updateUser(username,password,lists,response){
        let release = await clientLock.acquire();
    User.findOneAndRemove({ username:`${username}`,password:`${password}`},function(err,user)
    {
        
        if (err)
        {
            response.status(404).end()
            console.log("DB Error or user dosent exist in DB")
            console.log(err)

        }   
        else
                 {
                    let jsonlist= JSON.stringify(lists)
                     User({
                        username:username,
                         password:password,lists:jsonlist
                      }).save()
                       response.status(200)
                       response.send("UserUpdated")
                 }
        release()      
    })
   
 }



  module.exports={findUserAndPassword,addUser,updateUser}