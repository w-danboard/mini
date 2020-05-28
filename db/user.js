let mongoose = require('mongoose');

// 定义用户集合的骨架模型 规定了用户集合中文档的属性
let UserSchema = new mongoose.Schema({
  createAt: {
    type: Date,
    default: Date.now
  },
  username: String,
  password: String,
  email: String
});

// 定义用户模型
let User = mongoose.model('User', UserSchema);

// 导出
module.exports = User;