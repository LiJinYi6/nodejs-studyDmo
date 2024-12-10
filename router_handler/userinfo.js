const { func } = require('joi')
const db=require('../db/index')
const bcryptjs=require('bcryptjs')



function getUserInfo(req,res){
    const sql='select id,username,nickname,email from users where id=?'
    db.query(sql,req.auth.id,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length!=1)return res.cc('获取用户信息事变')
        res.send({
            status:0,
            message:'获取成功',
            data:results[0]
        })
    })
   
}
const updateUser=(req,res)=>{
    const sql="update users set ? where id=?"
    db.query(sql,[req.body,req.body.id],(err,results)=>{
        if(err)return res.cc(err)
        if(results.affectedRows!==1) return res.cc('更新用户的基本信息失败')
        res.cc('更新用户信息成功',0)
    })

}
const updatePwd=(req,res)=>{
    const sql='select * from users where id=?'
    db.query(sql,req.auth.id,(err,results)=>{
        if(err)return res.cc(err)
        if(results.length!=1) return res.cc('用户不存在')
        if(bcryptjs.compareSync(req.body.oldPwd,results[0].password))
        {
            const sql2='update users set password=? where id=?'
            db.query(sql2,[bcryptjs.hashSync(req.body.newPwd,10),req.auth.id],(err,resultss)=>{
                if(err) return req.cc(err)
                    console.log(resultss)
                if(resultss.affectedRows<1) return res.cc('更新失败')
                res.cc('更新成功',0)
            })
        }
        else
        res.cc('旧密码错误')
    })
}
const updateAvatar=(req,res)=>{
    const sql="update users set avator=? where id=?"
    db.query(sql,[req.body.avatar,req.auth.id],(err,results)=>{
        if(err)return res.cc(err)
        if(results.affectedRows!=1)return res.cc('更换头像失败')
        // res.cc('更新成功',0)
    })

}

module.exports={
    getUserInfo,
    updateUser,
    updatePwd,
    updateAvatar,
}