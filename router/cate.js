const express = require('express')
const router = express.Router()
const { getCates,addCate,deleteCate ,deleteSoftCate,getCateById,updateCateById} = require('../router_handler/cate')
const { cate_schema ,delete_cate_schema,update_cate_schema} = require('../schema/cate')
const expressjoi = require('@escook/express-joi')
router.get('/cates',getCates)

router.post('/add-cate',expressjoi(cate_schema),addCate)

router.get('/delete-cate/:id',expressjoi(delete_cate_schema),deleteCate)

router.get('/del-soft-cate/:id',expressjoi(delete_cate_schema),deleteSoftCate)

router.get('/getcate/:id',expressjoi(delete_cate_schema),getCateById)

router.post('/update-cate',expressjoi(update_cate_schema),updateCateById)

module.exports = router