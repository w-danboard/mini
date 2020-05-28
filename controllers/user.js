let express = require('express');
let { User }  = require('../db');
// mergeParams: true 从父路由导入params对象（父路由是app）
let router = express.Router({ mergeParams: true });


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
               // 查看数据库是否含有当前注册用户名
               let isHas = doc.some(item => item.username === user.username); 
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

 // 登录
 router.post('/login', function(req, res) {
     let user = req.body;
     User.findOne(user, function(err, doc) {
         if (err) {
             res.send({
                 code: 0,
                 message: err
             })
         } else {
             if (doc) {
                 res.send({
                     code: 1,
                     message: '登录成功！'
                 })
             } else {
                 res.send({
                     code: 0,
                     message: '用户名或密码错误，请重新登录！'
                 })
             }
         }
     });
 });

module.exports = router;