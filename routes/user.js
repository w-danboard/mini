let express = require('express');
let { User }  = require('../model');
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
     let user = req.body; // 请求体对象{username, password, email}
     console.log('=====>', User)
     User.create(user, function(err, doc) {
         if (err) {
             console.log('err', err);
         } else {
             console.log('doc', doc);
             res.send({code: 1, message: '注册成功!'});
         }
     });
 });

 // 登录
//  router.post(`${BASE_URL}/signin`, function(req, res) {
//      let user = req.body;

//  });

module.exports = router;