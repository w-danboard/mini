let conf = require('./config/dev.env');
let express = require('express');
let app = express();
let add = require('../routes/add.js');

let opt = {
  port: conf.port,
  proxy: conf.proxy.target
};

app.use(add);
app.listen(opt.port);
console.log(`服务器已启动开始监听: localhost:${opt.port}`);
// let server = require('http').createServer(app);
// server.listen(18686);