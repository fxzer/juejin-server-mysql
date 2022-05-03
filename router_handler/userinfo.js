const db = require("../db/index");

//获取信息
exports.getUserInfo = (req, res) => {

  const querySql = "select id, username,email,avatar from ev_user where id = ?"

  db.query(querySql, req.auth.id, (err, result) => {
    if (err) return res.cc(err);
    if (result.length !== 1) return res.cc("获取用户信息失败!");
    res.send({
      status: 0,
      message: "获取用户信息成功!",
      data: result[0],
    });
  });
};
//更新信息
exports.updateUserInfo = (req,res) =>{
  const user = req.body
  const updateSql = 'update ev_user set ? where id = ?'
  db.query(updateSql,[user,user.id],(err,result)=>{
    if(err) return res.cc(err)
    if(result.affectedRows !== 1) return res.cc('信息更新失败!')
    res.send({
      status:0,
      message:"信息更新成功!",
    })
  })
}
