const { response } = require('express')
const db = require('../db/index')


exports.getCates = (req,res) =>{
  const querySql = 'select * from ev_article_cate'
  db.query(querySql,(err,result)=>{
    if(err) return res.cc(err)
    res.send({status:0,message:'文章分类获取成功!',data:result})
  })
}
exports.addCate = (req,res) =>{
  const { name,alias } = req.body
  const querySql = 'select * from ev_article_cate where name = ? or alias = ?'
  db.query(querySql,[name,alias],(err,q_result)=>{
    if(err) return res.cc(err)
    if(q_result.length === 2) return res.cc('文章分类名和分类别名被已存在!')
    if(q_result.length ===1 && name === q_result[0].name && alias === q_result[0].alias) 
      return res.cc('文章分类名、分类别名被同一条数据占用!')
    if(q_result.length ===1 && name === q_result[0].name) return res.cc('文章分类名已存在!')
    if(q_result.length ===1 && alias === q_result[0].alias) return res.cc('文章分类别名已存在!')

    const addSql = 'insert into ev_article_cate set ?'
    db.query(addSql,req.body,(err,add_result)=>{
      if(err) return res.cc(err)
      if(add_result.affectedRows !== 1) return res.cc('新增文章分类失败!')
      res.cc('新增文章分类成功!',0)
    })
  })
}

//根据id删除文章分类
exports.deleteCate = (req,res) =>{
  const deleteSql = 'delete from ev_article_cate where id = ?'
  db.query(deleteSql,req.params.id,(err,result)=>{
    if(err) return res.cc(err)
    if(result.affectedRows !== 1 ) return res.cc('文章分类删除失败!')
    res.cc('文章分类删除成功!',0) 
  })
}

//软删除文章分类
exports.deleteSoftCate = (req,res) =>{
  const softDelSql = 'update ev_article_cate set deleted = ? where id = ?'
  db.query(softDelSql,[1,req.params.id],(err,result)=>{
    if(err) return res.cc(err)
    if(result.affectedRows !== 1 ) return res.cc('文章分类删除失败!')
    res.cc('文章分类删除成功!',0) 
  })
}
//根据id获取文章分类
exports.getCateById = (req,res) =>{
  const sql = 'select * from ev_article_cate  where id = ?'
  db.query(sql,req.params.id,(err,result)=>{
    if(err) return res.cc(err)
    if(result.length !== 1 ) return res.cc('文章分类获取失败!')
    res.send({status:0,message:'文章分类获取成功',data:result[0]})
  })
}
//根据id修改文章分类
exports.updateCateById = (req,res) =>{
//查重
  const {id, name,alias } = req.body
  const querySql = 'select * from ev_article_cate where id != ? and (name = ? or alias = ?)'
  db.query(querySql,[id,name,alias],(err,q_result)=>{
    if(err) return res.cc(err)
    if(q_result.length === 2) return res.cc('文章分类名和分类别名被已存在!')
    if(q_result.length ===1 && name === q_result[0].name && alias === q_result[0].alias) 
      return res.cc('文章分类名、分类别名被同一条数据占用!')
    if(q_result.length ===1 && name === q_result[0].name) return res.cc('文章分类名已存在!')
    if(q_result.length ===1 && alias === q_result[0].alias) return res.cc('文章分类别名已存在!')

      const sql = 'update  ev_article_cate set ?  where id = ?'
      db.query(sql,[req.body,id],(err,result)=>{
        if(err) return res.cc(err)
        if(result.affectedRows !== 1 ) return res.cc('文章分类修改失败!')
        res.send({status:0,message:'文章分类修改成功' })
      })
    })
}
