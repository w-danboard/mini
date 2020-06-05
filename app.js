let bodyParser = require('body-parser');
let express = require('express');
let app = express();
let { user } = require('./controllers');

// API
const API = {
  USER_URL: '/user'
};

app.use(bodyParser.json()); // 解析 application/json
// 解析客户端提交过来的请求提 并转成对象赋值给req.body  (要写在路由前面 不然不生效)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(API.USER_URL, user);  // 用户API
// app.listen(opt.port);
// console.log(`服务器已启动开始监听: localhost:${opt.port}`);
// let server = require('http').createServer(app);
// server.listen(18686);

console.log(process.env, '====')

module.exports = app;