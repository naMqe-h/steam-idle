const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const reqArray = {
    type: Array,
    required: true
}

const reqNumber = {
    type: Number,
    required: true
}

const reqBoolean = {
    type: Boolean,
    required: true
}


const steamAccountSchema = new mongoose.Schema({
    userId: reqString,
    accountName: reqString,
    password: reqString,
    apps: reqArray,
    idledHours: reqNumber,
    status: reqString,
    steamGuard: reqBoolean,
})

module.exports = mongoose.model('SteamAccount', steamAccountSchema, 'steam-accounts')