let express = require('express');
let { User}  = require('../model');
let router = express.Router();

/**
 * 用户注册 /user/signup
 *  1. 绘制注册页面模版(username password email)
 *  2. 实现提交用户注册路由 post /user/signup
 *  3. 在路由中获得请求体 然后把此用户信息保存到数据库中
 *  4. 保存完毕后跳转登录页
 */

 // 注册
 router.post('/signup', function(req, res) {
     let user = req.body;
     User.create(user, function(err, doc) {
        if(err) {
            cosnoel.log('注册失败了');
        } else {
            console.log('注册成功了');
        }
     });
 });

 // 登录
 router.post('/signin', function(req, res) {
     let user = req.body;

 });