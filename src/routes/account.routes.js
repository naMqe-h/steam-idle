const express = require('express')
const router = express.Router()
const SteamUser = require('steam-user')

router.post('/add', async (req, res) => {

    res.send('ok')
})

router.delete('/remove', async (req, res) => {
    
    res.send('ok')
})

module.exports = router