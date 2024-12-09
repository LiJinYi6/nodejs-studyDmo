const db=require('../db/index')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const config=require('../config')

exports.register=(req,res)=>{
    const userInfo=req.body
    if(!userInfo.username || !userInfo.password){
        return res.cc('用户名和密码不能为空')
    }
    const sqlStr='select * from users where username=?'
    db.query(sqlStr,userInfo.username,(err,results)=>{
        if(err){
            return res.cc(err)
        }
        if(results.length>0){
            return res.cc('用户名被占用，请更换！！！')
        }
        //给密码加密
        userInfo.password=bcryptjs.hashSync(userInfo.password,10)
        const sql='insert into users set ?'
        db.query(sql,{username:userInfo.username,password:userInfo.password},(err,results)=>{
            if(err){
                return res.cc(err)
            }
            if(results.affectedRows!==1)
                return res.cc('注册用户失败')
            res.cc('注册成功',0)
           

        })

    })
    
}



exports.login=(req,res)=>{
    const userInfo=req.body
    const sql='select * from users where username=?'
    db.query(sql,userInfo.username,(err,results)=>{
        if(err)return res.cc(err)
        if(results.length<=0)return res.cc('登陆失败！！！用户名或密码有误')
        //检查密码是否一致    
        const cmpRes=bcryptjs.compareSync(userInfo.password,results[0].password)
        if(cmpRes){
            const user={...results[0],password:'',avator:''}
            //生成token
            const token=jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expiresIn})
            res.send({status:0,
                message:'登陆成功',
                token:'Bearer '+token
            })
        }else{
            res.cc('登陆失败,用户名或密码错误')
        }
    })
    
}