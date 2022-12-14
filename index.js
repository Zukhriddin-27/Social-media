const express = require('express')
const mongoose = require('mongoose')

const { MONGO_URI } = require('./config/key')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000
require('./models/user')
require('./models/post')

mongoose.connect(MONGO_URI)

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server has been starter port ${PORT}`)
})
