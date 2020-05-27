### 项目介绍

#### 浏览器兼容性

    Edge 12+   Firefox 55+    Chrome 60+    Safari 10+

#### 框架构成

    vue-cli3 + vue2 + vue-router3 + vuex3 + element-ui2

#### 图标字体

    iconfont (阿里图标库)

### 环境安装

 本项目依赖 node.js， 使用前先安装 node.js 和 cnpm（显著提升依赖包的下载速度）。

 1. 自行下载并安装 node.js: 
 
        https://nodejs.org/en/download/

 2. 然后安装 cnpm 命令(安装 cnpm 提高安装速度):

        npm install -g cnpm --registry=https://registry.npm.taobao.org
        
        或者:
        
        npm install --registry=http://registry.npm.taobao.org

 3. 安装依赖

        npm install 或者 cnpm install
        

 4. 启动前端服务

        npm start

 5. 启动后端服务及数据库mongoDB

        npm run server

 6. 数据库地址 (暂无用户名密码 后期可添加)

        mongodb://127.0.0.1/school

        - mac启动数据库: sudo mongod --config /usr/local/etc/mongod.conf

        - 查看端口被占用情况: lsof -i:[port] 

        - 杀死被占用的端口: kill -9 [PID]


### 目录结构

├── .vscode                     
├── ├── launch                  调试后端node代码
├── config                      webpack构建配置文件
├── git-hooks                   git提交钩子
├── logs                        mock的日志文件
├── mock                        mock的目录
│   └── charts-demo
├── src                         源码
│   ├── assets                  静态资源
│   │   ├── geojson             地图资源
│   │   │   └── provinces       中国省的地图资源
│   │   └── icons               图标资源
│   ├── components              组件目录
│   │   ├── charts              图表组件
│   │   └── commons             通用业务组件
│   ├── directive               vue 指令
│   ├── filters                 vue 过滤器
│   ├── mixins                  vue mixins
│   ├── plugin                  vue 插件
│   ├── router                  vue 路由
│   ├── socket.io               socket 插件
│   ├── store                   vue vuex(状态管理)
│   │   ├── modules             vuex模块
│   │   └── plugins             vuex持久化
│   ├── styles                  全局样式
│   ├── util                    工具方法
│   └── views                   页面
│        ├── layout             布局
│        └── demo               demo示例(图表、组件、表格、表单)
└── static                      (预留)


### TODO