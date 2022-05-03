const express = require('express')
const expressjoi = require('@escook/express-joi')
const { update_user_schema,update_pwd_schema,update_avatar_schema } = require('../schema/user')
const router = express.Router()

const { getUserInfo ,updateUserInfo,updatePwd,updateAvatar}  =require('../router_handler/userinfo')
//获取用户信息
router.get('/userinfo', getUserInfo)

router.post('/update-info',expressjoi(update_user_schema),updateUserInfo)

router.post('/update-pwd',expressjoi(update_pwd_schema),updatePwd)

router.post('/update-avatar',expressjoi(update_avatar_schema),updateAvatar)

module.exports = router