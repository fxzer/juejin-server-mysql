const express = require('express')
const router = express.Router()
const { getArticles,addArticle,deleteArticle ,deleteSoftArticle,getArticleById,updateArticleById} = require('../router_handler/article')
const { article_schema,delete_article_schema,update_article_schema} = require('../schema/article')
const expressjoi = require('@escook/express-joi')
router.get('/articles',getArticles)

router.post('/add-article',expressjoi(article_schema),addArticle)

router.get('/delete-article/:id',expressjoi(delete_article_schema),deleteArticle)

router.get('/del-soft-article/:id',expressjoi(delete_article_schema),deleteSoftArticle)

router.get('/getarticle/:id',expressjoi(delete_article_schema),getArticleById)

router.post('/update-article',expressjoi(update_article_schema),updateArticleById)
 
module.exports = router