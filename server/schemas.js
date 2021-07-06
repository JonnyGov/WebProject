
const user = {
    username: {
      type: String,
      required: [true, 'Username is required']
    },
    password: {
      type: String,
      required: [true, 'Created date is required']
    }
}
const tasks={
  title:{
    type: String
  },
  body:{
    type : String
  },
  isDone:{
    type: Boolean
  }
}

module.exports={user, tasks}
