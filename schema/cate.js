const Joi = require('joi')

const name = Joi.string().min(2).max(10).required()
const alias = Joi.string().alphanum().min(2).max(10) 
const id = Joi.number().integer().min(1).required()
 exports.cate_schema= {
  body:{
    name,alias
  }
}
//对params的id进行验证
exports.delete_cate_schema ={
  params:{
    id
  }
}
//根据id修改文章分类
exports.update_cate_schema ={
  body:{
    id, name,alias
  }
}