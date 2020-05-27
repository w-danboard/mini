let express = require('express');
let { User }  = require('../model');
// mergeParams: true 从父路由导入params对象（父路由是app）
let router = express.Router({ mergeParams: true });

/**
 * 用户注册 /user/signup
 *  1. 绘制注册页面模版(username password email)
 *  2. 实现提交用户注册路由 post /user/signup
 *  3. 在路由中获得请求体 然后把此用户信息保存到数据库中
 *  4. 保存完毕后跳转登录页
 */

 // 注册
 router.post('/signup', function(req, res) {
     let user = req.body; // 请求体对象{username, password, email}
     // 查看当前数据库中的所有用户 便于判断当前注册用户名是否重复
     User.find({}, function(err, doc) {
       if (err) {
           res.send({
               code: 0,
               message: err
           })
       } else {
           if (doc) {
               let isHas = doc.some(item => item.username === user.username);  // 查看数据库是否含有当前注册用户名
               if (isHas) {
                   res.send({
                       code: 0,
                       message: '用户名已存在!'
                   })
               } else {
                   // 创建用户
                   User.create(user, function(err, doc) { // doc为成功后的请求体
                        if (!err) {
                            res.send({
                                code: 1, 
                                message: '注册成功!'
                            });
                        }
                   });
               }
           }
       }
    });
 });

module.exports = router;