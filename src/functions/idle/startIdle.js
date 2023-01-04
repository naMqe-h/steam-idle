const SteamUser = require('steam-user')

module.exports = startIdle = async (socket, body) => {
    const accountsStatus = {}

    try {
        body.forEach(userDetails => {
            const user = new SteamUser({ enablePicsCache: true, })

            user.on('steamGuard', (domain, callback) => {
                socket.emit('type-steam-guard', {
                    title: `Provide Steam Guard Code for ${userDetails.accountName}`,
                    content: "Steam Guard code needed from email ending in " + domain
                })
                socket.on('steam-guard-code', (code) => {
                    callback(code)
                })
            })

            global.activeUsers[userDetails.accountName] = user
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
        console.log("🚀 ~ file: startIdle.js:41 ~ startIdle ~ err", err)
    }

    const sendAnswer = setInterval(() => {
        if(Object.keys(accountsStatus).length === body.length) {
            socket.emit('success', accountsStatus)
            return clearInterval(sendAnswer)
        }
    }, 1000)
}