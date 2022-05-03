//导入验证规则包
const Joi = require('joi')

//定义验证规则
const username = Joi.string().alphanum().min(3).max(10).required()
const nickname = Joi.string().min(3).max(10).required()
const password = Joi.string().pattern(/^[\S]{6,12}$/).required()
const id = Joi.number().integer().min(1).required()
const email = Joi.string().email().required()
const avatar = Joi.string().required()
//暴露注册登录验证规则
exports.reg_login_schema = {
  body:{
   username,password
  }
}
//用户信息更新验证规则
exports.update_user_schema = {
  body:{
    id,nickname,avatar,email
  }
}
//用户修改密码验证规则
exports.update_pwd_schema = {
  body:{
    oldPwd:password,
    //旧密码不能和新密码保持一致 且满足密码校验规则
    newPwd:Joi.not(Joi.ref('oldPwd')).concat(password)
  }
}