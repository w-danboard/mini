let express = require('express');
let jwt = require('jsonwebtoken');
let { User }  = require('../db');
let multer = require('multer');
let uploads = multer({dest: './public/uploads'});
// mergeParams: true 从父路由导入params对象（父路由是app）
let router = express.Router({ mergeParams: true });

let secret = 'danboard';


 // 注册
 router.post('/signup', (req, res) => {
     let user = req.body; // 请求体对象{username, password, email}
     // 查看当前数据库中的所有用户 便于判断当前注册用户名是否重复
     User.find({}, (err, doc) => {
       if (err) {
           res.send({
               code: 1,
               message: err
           })
       } else {
           if (doc) {
               // 查看数据库是否含有当前注册用户名
               let isHas = doc.some(item => item.username === user.username); 
               if (isHas) {
                   res.send({
                       code: 1,
                       message: '用户名已存在!'
                   })
               } else {
                   // 创建用户
                   User.create(user, (err, doc) => { // doc为成功后的请求体
                        if (!err) {
                            res.status(201); // 创建 新增 状态码为201
                            res.send({
                                code: 0, 
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
 router.post('/login', (req, res) => {
     let user = req.body;
     User.findOne(user, (err, doc) => {
         if (err) {
             res.send({
                 code: 1,
                 message: err
             })
         } else {
             if (doc) {
                 res.send({
                     code: 0,
                     message: '登录成功！',
                     token: jwt.sign({ username: user.username }, secret, { // 'danboard' 说是令牌反解啥的 没懂啊
                         expiresIn: 20  // 20ms失效
                     })
                 })
             } else {
                 res.send({
                     code: 1,
                     message: '用户名或密码错误，请重新登录！'
                 })
             }
         }
     });
 });

 // 验证用户是否登录过
 router.get('/validate', (req, res) => {
     let token = req.headers.authorization;
     jwt.verify(token, secret, (err, decode) => {
        if (err) {
            return res.send({
                code: 1,
                message: 'token失效, 请重新登录！'
            })
        } else {
            res.send({
                code: 0,
                username: decode.username,
                // 需要把token的失效延长 防止操作中token过期导致退出当前页面
                token: jwt.sign({ username: decode.username }, secret, { // secret = 'danboard' 说是令牌反解啥的 没懂啊
                    expiresIn: 20  // 20ms失效
                })
            })
        }
     })
 })

 // 上传
 router.post('/uploads', uploads.single('avatar'), (req, res) => {
     console.log(req, res)
 })

module.exports = router;