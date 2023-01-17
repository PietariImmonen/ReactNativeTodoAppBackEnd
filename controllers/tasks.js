const tasksRouter = require('express').Router()
const Task = require('../models/task')

tasksRouter.get('/api/tasks', (req, res) => {
    Task.find({}).then(tasks => {
        res.json(tasks)
    })
})

tasksRouter.post('/api/tasks', (request, response) => {

    const body = request.body
    console.log(body)

    if (body.task === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }

  const task = new Task({
    task: body.task,
  })

  task.save().then(savedTask => {
    response.json(savedTask)
  })
})

tasksRouter.delete('/api/tasks/:id', (request, response) => {
    Task.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => response.json(error))
})

module.exports = tasksRouter