require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const { Server } = require("socket.io");
const startIdle = require('./src/functions/idle/startIdle');
const stopIdle = require('./src/functions/idle/stopIdle');

const app = express()
const httpServer = require('http').createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["Access-Control-Allow-Origin"],
        credentials: true
      }
})
io.on("connection", socket => {
    console.log(`New user connected - ${socket.id}`)

    socket.on('start-idle', (args) => {
        startIdle(socket, args)
    })
    socket.on('stop-idle', (args) => {
        stopIdle(socket, args)
    })
})

httpServer.listen(process.env.PORT, async () => {
    global.activeUsers = {}

    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI, {
        keepAlive: true,
        dbName: 'steam-idle'
    }, () => console.log('Connected to MongoDB'))

    console.log(`Listening on port ${process.env.PORT}`)
})