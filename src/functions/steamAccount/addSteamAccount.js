const steamAccountSchema = require("../../schemas/steamAccount-schema")
const userSchema = require("../../schemas/user-schema")

module.exports = addSteamAccount = async (socket, args) => {
    const account = {
        apps: [],
        idledHours: 0,
        status: 'Offline',
        ...args,
    }

    await steamAccountSchema(account).save()

    await userSchema.findOneAndUpdate({ userId: account.userId }, { $push: { steamAccounts: account.accountName } })

    socket.emit('add-steam-account-succes', {
        success: true,
        content: 'Account has been added successfully',
    })
}