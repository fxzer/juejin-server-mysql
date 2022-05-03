const Joi = require('joi')

const id = Joi.number().integer().min(1).required()
const title = Joi.string().min(2).max(30).required()
const  content = Joi.string().min(2)
 
exports.article_schema={
  body:{
    title,content
  }
}
exports.delete_article_schema={
  params:{
    id
  }
}
exports.update_article_schema={
  body:{
    id,title,content
  }
}