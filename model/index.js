let mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://127.0.0.1/school');

// 定义用户集合的骨架模型 规定了用户集合中文档的属性和类型
let userSchema = new mongoose.Schema({
    userName: String,
    passWord: String,
    email: String
});

// 定义用户模型
let user = mongoose.model('user', userSchema);

// 把用户模型挂载到导出对象上
module.exports.user = user;
