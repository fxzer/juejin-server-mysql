//导入验证规则包
const Joi = require('joi')

//定义验证规则
const username = Joi.string().alphanum().min(3).max(10).required()
const password = Joi.string().pattern(/^[\S]{6,12}$/).required()

//暴露验证规则
exports.reg_login_schema = {
  body:{
    username,password
  }
}