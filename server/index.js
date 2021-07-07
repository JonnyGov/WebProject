//const Testing=require('./extras')
//Testing.add2Users()

const db=require("./db")
const express = require('express')
const cors = require('cors');
const server = express()

server.use(express.json())
server.use(cors());
//server.use(bodyParser.urlencoded({ extended: true }));
const port = 3001

server.get('/', (req, res) => {
    res.send('This is the server!')
  })

server.get('/api/login/:userName/:password', (req, response) => {
//example http://localhost:3001/api/login/:jonny/:1234
    const username=(req.params.userName).replace(':', '')
    const password=(req.params.password).replace(':', '')
    console.log(username,password)
    db.findUserAndPassword(username,password,response)
  })

  server.post('/api/register/:userName/:password', (req, response) => {
        const username=(req.params.userName).replace(':', '')
        const password=(req.params.password).replace(':', '')
        console.log(username,password)
        db.addUser(username,password,{},response)
      })
var i=0
server.put('/api/update/user', (req, response) => {
        //console.log(req.body)
        console.log("Update!", i)
        db.updateUser(req.body.username,req.body.password,req.body.Lists,response)
        i=i+1
      })

server.listen(port, () => {
        console.log(` server listening at http://localhost:${port}`)
      })