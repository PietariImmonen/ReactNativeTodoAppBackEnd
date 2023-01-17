require('dotenv').config()
const express = require('express')
const app = express()
const Task = require('./models/task')
var cors = require('cors')
const tasksRouter = require('./controllers/tasks')

app.use(cors())
app.use(express.json())
app.use(tasksRouter)

  

const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})