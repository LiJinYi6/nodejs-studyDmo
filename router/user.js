//用户路由对象
const express=require('express')
const userHandler=require('../router_handler/user')
//创建路由对象
const router=express.Router()
//表单校验
const expressjoi=require('@escook/express-joi')
//表单校验规则
const {reg_login_schema}=require('../schema/user')

//注册新用户
router.post('/register',expressjoi(reg_login_schema),userHandler.register)
//登陆
router.post('/login',expressjoi(reg_login_schema),userHandler.login)


module.exports=router