const db=require('../db/index')






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

}

module.exports={
    getUserInfo,
    updateUser
}