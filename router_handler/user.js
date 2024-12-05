const db=require('../db/index')
const bcryptjs=require('bcryptjs')
exports.register=(req,res)=>{
    const userInfo=req.body
    if(!userInfo.username || !userInfo.password){
        return res.send({status:1,message:'用户名和密码不能为空'})
    }
    const sqlStr='select * from users where username=?'
    db.query(sqlStr,userInfo.username,(err,results)=>{
        if(err){
            return res.send({status:1,message:err.message})
        }
        if(results.length>0){
            return res.send({status:1,message:'用户名被占用，请更换！！！'})
        }
        userInfo.password=bcryptjs.hashSync(userInfo.password,10)
        const sql='insert into users set ?'
        db.query(sql,{username:userInfo.username,password:userInfo.password},(err,results)=>{
            if(err){
                return res.send({status:1,message:err.message})
            }
            if(results.affectedRows!==1)
                return res.send({status:1,message:'注册用户失败'})
            res.send({status:0,message:'注册成功'})
        })

    })
    // res.send('注册成功')
}
exports.login=(req,res)=>{
    res.send('登陆成功')
}