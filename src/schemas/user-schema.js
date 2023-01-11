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
    username: reqString,
    email: reqString,
    password: reqString,
    subscription: reqString,
    steamAccounts: reqArray,
    referrer: {
        type: String,
        required: false
    },
})

module.exports = mongoose.model('User', userSchema, 'users')