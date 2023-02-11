const steamAccountSchema = require("../../schemas/steamAccount-schema")

module.exports = getSteamAccounts = async (socket, userId) => {
    const steamAccounts = await steamAccountSchema.find({ userId })


    console.log(steamAccounts)

    socket.emit('get-user-steam-accounts-data', steamAccounts)
}   