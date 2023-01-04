const express = require('express')
const router = express.Router()
const SteamUser = require('steam-user')

const activeUsers = {}

router.post('/start', async (req, res) => {
    const accountsStatus = {}

    try {
        const { body } = req

        body.forEach(userDetails => {
            const user = new SteamUser({ enablePicsCache: true, })
            activeUsers[userDetails.accountName] = user
            user.on('error', (error) => {
                accountsStatus[userDetails.accountName] = {
                    success: false,
                    status: error.message
                }
            })
    
            user.logOn(userDetails)
            
            user.on('loggedOn', async () => {
                console.log(`${userDetails.accountName} logged in`)
                user.setPersona(userDetails.steamStatus)
                user.gamesPlayed(userDetails.games, true)
                // const apps = await user.getUserOwnedApps(`[U:1:${user.steamID.accountid}]`)
                accountsStatus[userDetails.accountName] = {
                    success: true,
                    status: 'Logged in'
                }
            })
        })
        
    } catch (err) {
        console.log("🚀 ~ file: account.routes.js:8 ~ router.post ~ err", err.message)
    }
    
    const sendAnswer = setInterval(() => {
        if(Object.keys(accountsStatus).length === req.body.length) {
            res.status(200).json(accountsStatus)
            return clearInterval(sendAnswer)
        }
    }, 1000)
})

router.post('/stop', async (req, res) => {
    const accountsStatus = {}
    try {
        const { body } = req

        body.forEach((userDetails) => {
            if(activeUsers[userDetails.accountName]) {
                activeUsers[userDetails.accountName].logOff()
                accountsStatus[userDetails.accountName] = {
                    success: true,
                    status: 'Logged out'
                }
            } else {
                accountsStatus[userDetails.accountName] = {
                    success: false,
                    status: 'The account was not logged in'
                }
            }
        })
        
    } catch (err) {
        console.log("🚀 ~ file: account.routes.js:8 ~ router.post ~ err", err.message)
    }

    const sendAnswer = setInterval(() => {
        if(Object.keys(accountsStatus).length === req.body.length) {
            res.status(200).json(accountsStatus)
            return clearInterval(sendAnswer)
        }
    }, 1000)
})

module.exports = router