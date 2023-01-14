require('dotenv').config()
const express = require('express')
const app = express()
const Task = require('./models/task')
var cors = require('cors')


app.use(cors())
app.use(express.json())

/*task.save().then(result => {
  console.log('task saved!')
  mongoose.connection.close()
})*/



app.get('/api/tasks', (req, res) => {
    Task.find({}).then(tasks => {
        res.json(tasks)
    })
})


app.post('/api/tasks', (request, response) => {

    const body = request.body
    console.log(body)

    if (body.task === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }

  const task = new Task({
    ids: body.ids,
    task: body.task,
  })

  task.save().then(savedTask => {
    response.json(savedTask)
  })
})

app.delete('/api/tasks/:id', (request, response) => {
    Task.findOneAndRemove({id: request.params.id})
      .then(result => {
        response.status(204).end()
      })
      .catch(error => response.json(error))
  })
  

const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})