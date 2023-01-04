const express = require('express')
const router = express.Router()
const userSchema = require('../schemas/user-schema')
const uniqid = require('uniqid')
const bcrypt = require('bcrypt')


// const saltRounds = 10;
// const passw = 'text'

// const hashPassword = await bcrypt.hash(passw, saltRounds)

// await new userSchema({
//     userId: uniqid(),
//     name: 'naMqe',
//     email: 'naMqe07@gmail.com',
//     password: hashPassword,
//     subscription: 'Premium',
//     steamAccounts: []
// }).save()

router.post('/create', async (req, res) => {

})

module.exports = router