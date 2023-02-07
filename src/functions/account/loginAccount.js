const userSchema = require("../../schemas/user-schema")
const bcrypt = require('bcryptjs')

module.exports = loginAccount = async (socket, body) => {
    const user = await userSchema.findOne({ email: body.email })

    if(!user) return socket.emit("login-account-email-not-exist", {
            success: false,
            content: 'User with given email address not found'
        })

    const passResult = await bcrypt.compare(body.password, user.password)

    if(!passResult) return socket.emit("login-account-bad-password", {
            success: false,
            content: 'The entered password is incorrect'
        })

    return socket.emit('login-account-success', {
        success: true,
        content: 'You have successfully logged in',
        user
    })

}