// mongoose是一个ORM工具 就是对象模型 工具 可以让我们像操作对象一样操作数据库
let mongoose = require('mongoose');
let DB_URL = 'mongodb://127.0.0.1/school';  // 数据库地址

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

// 定义用户集合的骨架模型 规定了用户集合中文档的属性
let UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String
});

// 定义用户模型
let User = mongoose.model('User', UserSchema);

// 导出
exports.User = User;