module.exports = stopIdle = async (socket, body) => {
    const accountsStatus = {}

    try {
        body.forEach((userDetails) => {
            if(activeUsers[userDetails.accountName]) {
                activeUsers[userDetails.accountName].logOff()
                accountsStatus[userDetails.accountName] = {
                    success: true,
                    status: 'Logged out'
                }
                console.log(`${userDetails.accountName} logged out`)
            } else {
                accountsStatus[userDetails.accountName] = {
                    success: false,
                    status: 'The account was not logged in'
                }
            }
        })
        
    } catch (err) {
        console.log("🚀 ~ file: stopIdle.js:24 ~ module.exports=stopIdle= ~ err", err)
    }

    const sendAnswer = setInterval(() => {
        if(Object.keys(accountsStatus).length === body.length) {
            socket.emit('success', accountsStatus)
            return clearInterval(sendAnswer)
        }
    }, 1000)
}