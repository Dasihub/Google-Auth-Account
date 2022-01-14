const {Router} = require('express')
const GoogleController = require('../controller/GoogleController')

const router = Router()

router.post('/google-login', GoogleController.login)

module.exports = router