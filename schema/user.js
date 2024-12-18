const joi=require('joi')


//用户表单验证规则
const username=joi
.string()
.alphanum()
.min(2).max(10).required()

const password=joi
.string()
.pattern(/^\S{6,12}$/)
.required()

const id=joi.number().integer().min(1).required()
const nickname=joi.string().required()
const email=joi.string().email().required()

//定义验证对象
exports.reg_login_schema={
    body:{
        username,
        password,
    }
}
exports.update_user_schema={
    body:{
        id,
        nickname,
        email
    }
}
exports.update_pwd_schema={
    body:{
        oldPwd:password,
        newPwd:joi.not(joi.ref('oldPwd')).concat(password)
    }
}
exports.update_avatar_schema={
    body:{
        avatar:joi.string().dataUri().required()
    }
}