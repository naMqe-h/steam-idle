const userSchema = require("../../schemas/user-schema")
const uniqid = require('uniqid')


module.exports = createAccount = async (socket, body) => {
    console.log(body)
    const data = await userSchema.findOne({ email: body.email })

    if(data) {
        const message = {
            success: false,
            content: 'An account with given e-mail address already exists. Use another address and try again.'
        }
        return socket.emit("create-account-email-exist", message)
    }

    await new userSchema({
        userId: uniqid(),
        username: body.username,
        email: body.email,
        password: body.password,
        subscription: 'Free',
        steamAccounts: []
    }).save()

    const message = {
        success: true,
        content: 'Registration was successful. Log in to access the control panel.'
    }
    return socket.emit('create-account-success', message)



}