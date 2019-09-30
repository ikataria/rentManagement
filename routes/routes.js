const express = required('express')
const app = express.Router()

app.post('/register', require('./register'))

module.exports = app