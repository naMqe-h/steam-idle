require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')

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
    console.log(`Listening on port ${process.env.PORT}`)
})
