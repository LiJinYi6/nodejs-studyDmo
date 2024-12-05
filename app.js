const express=require('express')
const cors=require('cors')
const app=express()
//配置跨域
app.use(cors())
//全局中间件
//用于解析格式为application/x-www-form-urlencoded数据
app.use(express.urlencoded({extended:false}))
//解析JSON格式数据
app.use(express.json())

//导入注册路由模块
const userRouter=require('./router/user')
app.use('/api',userRouter)




app.listen(80,()=>{
    console.log('sever running at http://127.0.0.1:80')
})