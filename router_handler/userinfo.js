const db = require("../db/index");
const bcrypt = require("bcryptjs");
//获取信息
exports.getUserInfo = (req, res) => {
  const querySql = "select id, username,email,avatar from ev_user where id = ?";

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
exports.updateUserInfo = (req, res) => {
  const user = req.body;
  const updateSql = "update ev_user set ? where id = ?";
  db.query(updateSql, [user, user.id], (err, result) => {
    if (err) return res.cc(err);
    if (result.affectedRows !== 1) return res.cc("信息更新失败!");
    res.send({
      status: 0,
      message: "信息更新成功!",
    });
  });
};
//更新密码
exports.updatePwd = (req, res) => {
  const querySql = "select * from ev_user where id = ?";
  const updateSql = "update ev_user set password = ? where id = ?";
  // 查询加密后的原密码 对比 前端输入的原密码
  db.query(querySql, req.auth.id, (err, result) => {
    if (err) return res.cc(err);
    if (result.length !== 1) return res.cc("用户不存在!");

    const compareRes = bcrypt.compareSync(req.body.oldPwd, result[0].password);
    if (!compareRes) return res.cc("旧密码错误!");
    //修改密码
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
    db.query(updateSql, [newPwd, req.auth.id], (err, update_result) => {
      if (err) return res.cc(err);
      if (update_result.affectedRows !== 1) return res.cc("密码修改失败!");
      res.send({ status: 0, message: "密码修改成功!" });
    });
  });
};
