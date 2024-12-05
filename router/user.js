//用户路由对象
const express=require('express')
const userHandler=require('../router_handler/user')
//创建路由对象
const router=express.Router()

//注册新用户
router.post('/register',userHandler.register)

router.post('/login',userHandler.login)


module.exports=router