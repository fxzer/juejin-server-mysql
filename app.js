const express = require('express')
const app = express()

// 配置跨域
const cors = require('cors')
app.use(cors())


// 解析请求体
app.use(express.urlencoded({extended:false}))


//封装路由错误处理中间件
app.use((req,res,next)=>{
  res.cc = (err,status=1)=>{
    return res.send({status,message:err instanceof Error ? err.message : err})
  }
  next()
})

//解析token中间件(在路由之前)
let { expressjwt } = require("express-jwt");
const config= require('./config')

app.use(expressjwt({secret:config.jwtSecretKey,algorithms: ["HS256"] }).unless({path:[/\/api/]}))
//路由
const userRouter = require('./router/user')
app.use('/api',userRouter)
//用户信息路由
const userinfoRouter = require('./router/userinfo')
app.use('/my',userinfoRouter)

const Joi = require('joi')
//定义错误级别中间件
app.use((err,req,res,next)=>{
  //校验失败
  if(err instanceof Joi.ValidationError) return res.cc(err)
  //认证失败
  if(err.name === 'UnauthorizedError') return res.cc('身份认证失败!')
  //未知错误
  res.cc(err)
})

app.listen(6000,()=>{
  console.log('Server running at http://localhost:6000');
  
})