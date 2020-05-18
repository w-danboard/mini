let express = require('express');
// 调用router方法 可以得到一个路由中间件实例
let router = express.Router();
// 当客户端通过get请求的方式 访问/路径的时候 会交由对应的函数来处理
router.get('/add', function(req, res) {
  res.send('添加')
});

module.exports = router;