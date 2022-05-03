const db = require("../db/index");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const {jwtSecretKey,expiresIn} = require('../config')
//注册
exports.register = (req, res) => {
  let userinfo = req.body;

  //查重
  const querySql = "select * from ev_user where username=?";

  db.query(querySql, userinfo.username, (err, result) => {
    if (err) {
      return res.cc(err);
    }
    if (result.length > 0) {
      return res.cc("该用户已存在!");
    } else {
      //加密
      userinfo.password = bcrypt.hashSync(userinfo.password, 10);

      const insertSql = "insert into ev_user set ?";

      db.query(insertSql, userinfo, (err, insert_result) => {
        if (err) {
          return res.cc(err);
        }
        if (insert_result.affectedRows !== 1) {
          return res.cc("注册用户失败!");
        }
        return res.send({ status: 0, message: "注册用户成功!" });
      });
    }
  });
};

//登录
exports.login = (req, res) => {
  const userinfo = req.body
  const querySql = 'select * from ev_user where username = ?'
  db.query(querySql,userinfo.username,(err,result)=>{
    if(err){
      return res.cc(err)
    }
    if(result.length !== 1){
      return res.cc("该用户不存在!")
    }
    //验证密码是否正确
    const compareRes = bcrypt.compareSync(userinfo.password,result[0].password)
    if(!compareRes){
      return res.cc('密码错误!')
    }
    //服务器生成Token

    // 排除password和头像
    const user = { ...result[0],password:undefined,avatar:undefined}
    //生成token
    const tokenStr = jwt.sign(user,jwtSecretKey,{expiresIn})
    
    return res.send({status:0,message:'登陆成功!',token:'Bearer ' + tokenStr})
  })
};
