const express = require('express')
const expressjoi = require('@escook/express-joi')
const router = express.Router()
const userHandler = require('../router_handler/user')
const { reg_login_schema } = require('../schema/user')

router.post('/register',expressjoi(reg_login_schema), userHandler.register )

router.post('/login', userHandler.login)

module.exports = router