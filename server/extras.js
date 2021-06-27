
connectionString="mongodb+srv://new_user1:5LZMx3NSsooYdD19@cluster0.zu8ll.mongodb.net/web_project?retryWrites=true&w=majority"



const mongoose = require('mongoose')
const schemas=require('./schemas')

const userSchema = new mongoose.Schema(schemas.user)
const User = mongoose.model('users', userSchema)
 
async function createUser(username,password) {
  return new User({
    username,
    password,
  }).save()
}

async function findUser(username) {
  return await User.findOne({ username })
}

async function addUsers(username,password) {
    const connector = mongoose.connect(connectionString)

  
    let user = await connector.then(async () => {
      return findUser(username)
    })
  
    if (!user) {
      user = await createUser(username,password)
    }
  
    console.log(user)
    process.exit(0)
  }
const add2Users=function(){
addUsers("jim","1234")
addUsers("bob","1234")
}

module.exports={add2Users}