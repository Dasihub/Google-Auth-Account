require('dotenv').config()
const {OAuth2Client} = require('google-auth-library')

const client = new OAuth2Client(process.env.GOOGLE_ID)

const users = []

function upsert(array, item) {
    const i = array.findIndex(_item => _item.email === item.email)
    if (i > -1) array[i] = item
    else array.push(item)
}

class GoogleController {
    async login(req, res) {
        try {
            const {token} = req.body

            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_ID
            })
            const {name, email, picture} = ticket.getPayload()
            upsert(users, {name, email, picture})
            res.status(200).json({
                name, email, picture
            })
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new GoogleController()