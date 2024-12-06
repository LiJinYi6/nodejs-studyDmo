const express=require('express')
const cors=require('cors')
const app=express()
const joi=require('joi')
//配置跨域
app.use(cors())
//全局中间件
//用于解析格式为application/x-www-form-urlencoded数据
app.use(express.urlencoded({extended:false}))

//解析JSON格式数据
app.use(express.json())





//对于send的封装中间件
app.use((req,res,next)=>{
    res.cc=function(err,status=1){
        res.send({
            status,
            message:err instanceof Error?err.message:err
        })
    }
    next()
})

const expressJwt=require('express-jwt')
//定义一个解析token的中间件
const config=require('./config')
app.use(
    expressJwt.expressjwt
    ({secret:config.jwtSecretKey,algorithms:['HS256']})
    .unless({path:[/^\/api/]})
)





//导入注册路由模块
const userRouter=require('./router/user')
app.use('/api',userRouter)






//定义错误级别的中间件
app.use((err,req,res,next)=>{
    //表单校验错误
    if(err instanceof joi.ValidationError){
        return res.cc(err)
    }
    //token认证错误
    if(err.name==='UnauthorizedError') 
        return res.cc('身份认证失败，请重新登陆')
    res.cc(err)
})


app.listen(80,()=>{
    console.log('sever running at http://127.0.0.1:80')
})