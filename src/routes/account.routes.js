const express = require('express')
const router = express.Router()
const SteamUser = require('steam-user')

router.post('/start', async (req, res) => {
    const accounts = {}
    try {
        const { body } = req

        body.forEach(userDetails => {
            const user = new SteamUser()
            user.on('error', (error) => {
                accounts[userDetails.accountName] = error.message
                console.log(`${userDetails.accountName} - ${error.message}`)
            })
    
            user.logOn(userDetails)
            
            user.on('loggedOn', async () => {
                console.log(`${userDetails.accountName} logged in`)
                accounts[userDetails.accountName] = 'logged in'
                user.setPersona(1)
                user.gamesPlayed(userDetails.games, true)
            })
        })
        
    } catch (err) {
        console.log("🚀 ~ file: account.routes.js:8 ~ router.post ~ err", err.message)
    }
    
    const sendAnswer = setInterval(() => {
        if(Object.keys(accounts).length === req.body.length) {
            res.status(200).json(accounts)

            return clearInterval(sendAnswer)
        }
    }, 1000)
})

router.post('/stop', async (req, res) => {
    const accounts = {}
    try {
        const { body } = req

        //! stop
        
    } catch (err) {
        console.log("🚀 ~ file: account.routes.js:8 ~ router.post ~ err", err.message)
    }
    res.send('ok')
})

module.exports = router