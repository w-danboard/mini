let conf = require('./config/dev.env');
let bodyParser = require('body-parser');
let express = require('express');
let app = express();
// let add = require('../routes/add.js');

let opt = {
  port: conf.port,
  proxy: conf.proxy.target
};

// app.use(add);
// 解析客户端提交过来的请求提 并转成对象赋值给req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(opt.port);
console.log(`服务器已启动开始监听: localhost:${opt.port}`);
// let server = require('http').createServer(app);
// server.listen(18686);