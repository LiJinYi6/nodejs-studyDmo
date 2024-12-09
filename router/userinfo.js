const express=require('express')
const expressJoi=require('@escook/express-joi')
const {update_user_schema}=require('../schema/user')
const router=express.Router()
const userInfoH=require('../router_handler/userinfo')
router.get('/userinfo',userInfoH.getUserInfo)
router.post('/updateUser',expressJoi(update_user_schema),userInfoH.updateUser)
module.exports=router