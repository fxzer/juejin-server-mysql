const { response } = require('express')
const db = require('../db/index')


exports.getArticles = (req,res) =>{
  const querySql = 'select * from ev_article'
  db.query(querySql,(err,result)=>{
    if(err) return res.cc(err)
    res.send({status:0,message:'文章获取成功!',data:result})
  })
}
exports.addArticle = (req,res) =>{
  const { title } = req.body
  const querySql = 'select * from ev_article where title = ?'
  db.query(querySql,title,(err,q_result)=>{
    if(err) return res.cc(err)
    if(q_result.length ===1)   return res.cc('文章标题已被占用!')

    const addSql = 'insert into ev_article set ?'
    db.query(addSql,req.body,(err,add_result)=>{
      if(err) return res.cc(err)
      if(add_result.affectedRows !== 1) return res.cc('新增文章失败!')
      res.cc('新增文章成功!',0)
    })
  })
}

//根据id删除文章
exports.deleteArticle = (req,res) =>{
  const deleteSql = 'delete from ev_article where id = ?'
  db.query(deleteSql,req.params.id,(err,result)=>{
    if(err) return res.cc(err)
    if(result.affectedRows !== 1 ) return res.cc('文章删除失败!')
    res.cc('文章删除成功!',0) 
  })
}
//软删除文章
exports.deleteSoftArticle = (req,res) =>{
  const softDelSql = 'update ev_article set deleted = ? where id = ?'
  db.query(softDelSql,[1,req.params.id],(err,result)=>{
    if(err) return res.cc(err)
    if(result.affectedRows !== 1 ) return res.cc('文章删除失败!')
    res.cc('文章删除成功!',0) 
  })
}
//根据id获取文章
exports.getArticleById = (req,res) =>{
  const sql = 'select * from ev_article  where id = ?'
  db.query(sql,req.params.id,(err,result)=>{
    if(err) return res.cc(err)
    if(result.length !== 1 ) return res.cc('文章获取失败!')
    res.send({status:0,message:'文章获取成功',data:result[0]})
  })
}
//根据id修改文章
exports.updateArticleById = (req,res) =>{
//查重
const {id, title } = req.body
const querySql = 'select * from ev_article where title = ? and id != ?'
db.query(querySql,[title,id],(err,q_result)=>{
  if(err) return res.cc(err)
  if(q_result.length ===1)   return res.cc('文章标题已被占用!')

      const sql = 'update  ev_article set ?  where id = ?'
      db.query(sql,[req.body,id],(err,result)=>{
        if(err) return res.cc(err)
        if(result.affectedRows !== 1 ) return res.cc('文章修改失败!')
        res.send({status:0,message:'文章修改成功' })
      })
    })
}
