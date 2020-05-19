/** 
 * 判断类型 Object.prototype.toString.call();
 *  示例: type.isObject({})
 */
const types = ['Object', 'Function', 'Boolean', 'Number', 'Array', 'String'];
let type = {};
let _fnType = function(type) {
  return function(obj) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
  }
}
types.forEach(type => {
  type['is' + type] = _fnType(type);
})

export default {
  type
};
 