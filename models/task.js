const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const TaskSchema = new mongoose.Schema({
    ids: String,
    task: String,
  })
  
  TaskSchema.set('toJSON', {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      }
    })

    /*task.save().then(result => {
  console.log('task saved!')
  mongoose.connection.close()
})*/

module.exports = mongoose.model('Task', TaskSchema)