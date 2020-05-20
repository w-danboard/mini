/** 
 * 判断类型 Object.prototype.toString.call();
 *  示例: type.isObject({})
 */
const types = ['Object', 'Function', 'Boolean', 'Number', 'Array', 'String'];
let isType = {};
let _fnType = function(type) {
  return function(obj) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
  }
}
types.forEach(type => {
  isType[type] = _fnType(type);
})

export {
  isType
};
 