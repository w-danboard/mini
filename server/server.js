let conf = require('./config/dev.env');
let bodyParser = require('body-parser');
let express = require('express');
let app = express();
let user = require('../routes/user.js');

// API
const API = {
  USER_URL: '/user'
};

let opt = {
  port: conf.port,
  proxy: conf.proxy.target
};

app.use(API.USER_URL, user);  // 用户API
// 解析客户端提交过来的请求提 并转成对象赋值给req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(opt.port);
console.log(`服务器已启动开始监听: localhost:${opt.port}`);
// let server = require('http').createServer(app);
// server.listen(18686);