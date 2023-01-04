require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', '*')
    next()
})

app.use(bodyParser.json())

app.use('/account', require('./src/routes/account.routes'))

app.use('/', (req, res) => {
    res.send('Steam Idle')
})

app.listen(process.env.PORT, async () => {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI, {
        keepAlive: true,
        dbName: 'steam-idle'
    }, () => console.log('Connected to MongoDB'))
    
    console.log(`Listening on port ${process.env.PORT}`)
})
