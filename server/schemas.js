
const user = {
    username: {
      type: String,
      required: [true, 'Username is required']
    },
    password: {
      type: String,
      required: [true, 'Created date is required']
    },
    lists:
    {
      type:Object,
    }
}


module.exports={user}
