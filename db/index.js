// mongoose是一个ORM工具 就是对象模型 工具 可以让我们像操作对象一样操作数据库
let mongoose = require('mongoose');
// 数据库地址
let DB_URL = 'mongodb://127.0.0.1/school'; 

let User = require('./user'); // 用户模型

mongoose.connect(DB_URL);

// 连接成功
mongoose.connection.on('connected', function() {
  console.log('Mongoose connection open to' + DB_URL);
});

// 连接异常
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error' + err);
});

// 连接断开
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose connection disconnected');
});

module.exports = {
  User
}