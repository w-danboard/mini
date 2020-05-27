// 自我理解 export-dirs包就是帮助在当前文件夹中 导入所有模块 并导出 {} 减少人工导入导出
module.exports = require('export-dirs')(__dirname);