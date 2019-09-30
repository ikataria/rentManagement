const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/rentManagement', (err, data) => {
    if (err) {
        console.log(`Can't make Connection with database`)
    } else {
        console.log('Connected with database')
    }
})

const routes = require('./routes/routes')
app.use('/api', routes)


app.listen(5000, () => {
    console.log('Listening on PORT 5000')
})