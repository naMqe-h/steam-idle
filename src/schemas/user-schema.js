const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const reqArray = {
    type: Array,
    required: true
}

const userSchema = new mongoose.Schema({
    userId: reqString,
    name: reqString,
    email: reqString,
    password: reqString,
    subscription: reqString,
    steamAccounts: reqArray
})

module.exports = mongoose.model('User', userSchema, 'users')