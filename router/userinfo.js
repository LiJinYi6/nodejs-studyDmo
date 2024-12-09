const express=require('express')
const expressJoi=require('@escook/express-joi')
const {update_user_schema, update_pwd_schema}=require('../schema/user')
const router=express.Router()
const userInfoH=require('../router_handler/userinfo')
router.get('/userinfo',userInfoH.getUserInfo)
router.post('/updateUser',expressJoi(update_user_schema),userInfoH.updateUser)
router.post('/updatePwd',expressJoi(update_pwd_schema),userInfoH.updatePwd)
module.exports=router